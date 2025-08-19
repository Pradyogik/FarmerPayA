// app/screens/AIChat/ChatScreen.tsx
import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Share,
  TextInput,
  Alert,
  Platform,
  Animated,
  Easing,
  PermissionsAndroid,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import LinearGradient from 'react-native-linear-gradient';
import Markdown from 'react-native-markdown-display';
import RNFS from 'react-native-fs';
import AudioRecord from 'react-native-audio-record';

import { GalleryIcon } from '../../assets/AI/gallery';
import { SendIcon } from '../../assets/AI/send';
import { LockIcon } from '../../assets/AI/mic';
import CopyIcon from '../../assets/AI/copy';
import ShareIcon from '../../assets/AI/share';
import LikeIcon from '../../assets/AI/like';
import DislikeIcon from '../../assets/AI/dislike';

type Role = 'user' | 'assistant';
type Msg = {
  id: string;
  role: Role;
  text: string;
  createdAt: number;
  reaction?: 'like' | 'dislike' | null;
};

// ====== CONFIG (store secrets securely e.g. react-native-config) ======
const OPENAI_API_KEY =
  '';
const API_URL = 'https://api.openai.com/v1/chat/completions';
const MODEL = 'gpt-4o-mini';

const BHASHINI_URL =
  'https://dhruva-api.bhashini.gov.in/services/inference/pipeline';
const BHASHINI_AUTH =
  ''; // from your cURL
const BHASHINI_LANG = 'hi'; // change dynamically if you want

// ====== SYSTEM PROMPT (Farmerpay AI) ======
const SYSTEM_PROMPT = `
You are "Farmerpay AI" (internally specialized like KrishiGPT), an Indian agriculture expert for small and medium farmers.
If a user asks your name or who you are, say "Farmerpay AI".
Goals:
- Give practical, locally-appropriate guidance across crops, animal husbandry, fishery, horticulture, and floriculture.
- If user intent is ambiguous, ask short follow-up questions (location/district & state, season/month, irrigated vs rainfed, land size, budget).
- When relevant, include Indian varieties, sowing windows, spacing, inputs, IPM/INM steps, and market tips.
- Be concise, stepwise, and actionable. Offer 2–3 options when helpful.
- For weather-based advice, request location and timeframe if missing.
- Use plain, friendly language; add short Hindi keywords when helpful for clarity.
`;

type Props = { route: any; navigation: any };

const ChatScreen: React.FC<Props> = ({ route }) => {
  const initialText: string | undefined = route?.params?.initialText;

  const [messages, setMessages] = useState<Msg[]>([]);
  console.log('messages',messages);
  const [inputText, setInputText] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  // Recording state
  const [isRecording, setIsRecording] = useState(false);
  const [recordSecs, setRecordSecs] = useState(0);
  const recordTimerRef = useRef<NodeJS.Timer | null>(null);

  // toast state + anim
  const [toast, setToast] = useState<string | null>(null);
  const toastOpacity = useRef(new Animated.Value(0)).current;
  const toastY = useRef(new Animated.Value(10)).current;

  // voice bars animation
  const bars = new Array(5).fill(0);
  const barValues = useRef(bars.map(() => new Animated.Value(0.3))).current;

  const showToast = (message: string) => {
    setToast(message);
    toastOpacity.setValue(0);
    toastY.setValue(10);
    Animated.parallel([
      Animated.timing(toastOpacity, {
        toValue: 1,
        duration: 180,
        useNativeDriver: true,
      }),
      Animated.timing(toastY, {
        toValue: 0,
        duration: 180,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setTimeout(() => {
        Animated.parallel([
          Animated.timing(toastOpacity, {
            toValue: 0,
            duration: 180,
            useNativeDriver: true,
          }),
          Animated.timing(toastY, {
            toValue: 10,
            duration: 180,
            useNativeDriver: true,
          }),
        ]).start(() => setToast(null));
      }, 1100);
    });
  };

  useEffect(() => {
    if (initialText) {
      pushMessage('user', initialText);
      askAssistant(initialText);
    }
  }, [initialText]);

  // ====== Chat helpers ======
  const pushMessage = (role: Role, text: string) => {
    setMessages(prev => [
      ...prev,
      {
        id: `${Date.now()}-${Math.random()}`,
        role,
        text,
        createdAt: Date.now(),
        reaction: null,
      },
    ]);
  };
  const formatTime = (ts: number) =>
    new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const chatHistoryForAPI = useMemo(() => {
    const mapped = messages.map(m => ({ role: m.role, content: m.text }));
    return [{ role: 'system', content: SYSTEM_PROMPT }, ...mapped];
  }, [messages]);

  // ====== OpenAI call ======
  const askAssistant = async (userText: string) => {
    try {
      setIsThinking(true);
      const body = {
        model: MODEL,
        messages: [...chatHistoryForAPI, { role: 'user', content: userText }],
        temperature: 0.4,
        max_tokens: 800,
      };

      const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error(await res.text());
      const json = await res.json();
      console.log('json',json);
      const reply  = json?.choices?.[0]?.message?.content?.trim();
      console.log('reply',reply);
      pushMessage('assistant', reply || "Sorry, I couldn't generate a reply.");
    } catch (e) {
      console.error(e);
      pushMessage(
        'assistant',
        '❗ There was an error fetching the response. Please try again.',
      );
    } finally {
      setIsThinking(false);
    }
  };

  // ====== Send typed text ======
  const handleSend = () => {
    const text = inputText.trim();
    if (!text) return;
    pushMessage('user', text);
    setInputText('');
    askAssistant(text);
  };

  // ====== Recording ======
  const requestMicPermission = async () => {
    if (Platform.OS === 'android') {
      const res = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      ]);
      const granted =
        res[PermissionsAndroid.PERMISSIONS.RECORD_AUDIO] ===
        PermissionsAndroid.RESULTS.GRANTED;
      if (!granted) throw new Error('Mic permission denied');
    }
    // iOS handled by Info.plist prompt
  };

  const startBars = () => {
    barValues.forEach((v, i) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(v, {
            toValue: 1,
            duration: 300 + i * 50,
            easing: Easing.inOut(Easing.quad),
            useNativeDriver: false,
          }),
          Animated.timing(v, {
            toValue: 0.3,
            duration: 300 + i * 50,
            easing: Easing.inOut(Easing.quad),
            useNativeDriver: false,
          }),
        ]),
      ).start();
    });
  };
  const stopBars = () => barValues.forEach(v => v.stopAnimation());

  const startRecording = async () => {
    try {
      await requestMicPermission();
      AudioRecord.init({
        sampleRate: 16000,
        channels: 1,
        bitsPerSample: 16,
        wavFile: 'farmerpay_record.wav',
      });
      setIsRecording(true);
      setRecordSecs(0);
      startBars();
      AudioRecord.start();
      // if (recordTimerRef.current) clearInterval(recordTimerRef.current);
      recordTimerRef.current = setInterval(() => {
        setRecordSecs(prev => prev + 1);
      }, 1000);
    } catch (err) {
      console.error(err);
      Alert.alert('Microphone', 'Permission denied or recorder error.');
    }
  };

  const stopRecording = async () => {
    try {
      const audioFilePath = await AudioRecord.stop();
      setIsRecording(false);
      // if (recordTimerRef.current) clearInterval(recordTimerRef.current);
      stopBars();

      // read base64
      const base64Audio = await RNFS.readFile(audioFilePath, 'base64');

      // call Bhashini ASR
      const transcript = await transcribeWithBhashini(base64Audio);
      if (!transcript) {
        showToast('Could not transcribe audio');
        return;
      }

      pushMessage('user', transcript);
      askAssistant(transcript);
    } catch (err) {
      console.error(err);
      setIsRecording(false);
      // if (recordTimerRef.current) clearInterval(recordTimerRef.current);
      stopBars();
      Alert.alert('Recording', 'Failed to stop or process audio.');
    }
  };

  const transcribeWithBhashini = async (base64Audio: string) => {
    try {
      const payload = {
        pipelineTasks: [
          {
            taskType: 'asr',
            config: {
              language: { sourceLanguage: BHASHINI_LANG }, // 'hi', 'en', etc.
              serviceId: '',
              audioFormat: 'wav',
              samplingRate: 16000,
            },
          },
        ],
        inputData: {
          audio: [{ audioContent: base64Audio }],
        },
      };

      const res = await fetch(BHASHINI_URL, {
        method: 'POST',
        headers: {
          Accept: '*/*',
          Authorization: BHASHINI_AUTH,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(await res.text());
      const json = await res.json();

      // Try to extract transcript from common shapes
      const asr =
        json?.pipelineResponse?.find?.(
          (t: any) => t?.taskType?.toLowerCase() === 'asr',
        ) || json?.pipelineResponse?.[0];

      const out = asr?.output?.[0];
      const transcript =
        out?.source ||
        out?.transcript ||
        out?.text ||
        json?.output?.[0]?.source ||
        '';

      return (transcript || '').toString().trim();
    } catch (err) {
      console.error('Bhashini error:', err);
      return '';
    }
  };

  // ====== Assistant actions (with bounce + toasts) ======
  const handleCopy = (text: string) => {
    Clipboard.setString(text);
    showToast('Copied to clipboard');
  };
  const handleShare = async (text: string) => {
    try {
      await Share.share({ message: text });
    } catch {}
  };
  const handleReaction = (id: string, reaction: 'like' | 'dislike') => {
    setMessages(prev =>
      prev.map(m =>
        m.id === id
          ? { ...m, reaction: m.reaction === reaction ? null : reaction }
          : m,
      ),
    );
    showToast(
      reaction === 'like' ? 'Thanks for the feedback!' : 'We’ll improve this',
    );
  };

  const AssistantActions = ({
    text,
    reaction,
    onCopy,
    onSharePress,
    onLike,
    onDislike,
  }: {
    text: string;
    reaction: 'like' | 'dislike' | null | undefined;
    onCopy: () => void;
    onSharePress: () => void;
    onLike: () => void;
    onDislike: () => void;
  }) => {
    const likeScale = useRef(new Animated.Value(1)).current;
    const dislikeScale = useRef(new Animated.Value(1)).current;
    const copyScale = useRef(new Animated.Value(1)).current;

    const bump = (v: Animated.Value) =>
      Animated.sequence([
        Animated.timing(v, {
          toValue: 1.2,
          duration: 120,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.spring(v, { toValue: 1, useNativeDriver: true, friction: 4 }),
      ]).start();

    return (
      <View style={styles.actions}>
        <TouchableOpacity
          onPress={() => {
            onCopy();
            bump(copyScale);
          }}
          style={styles.actionBtn}
          hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
        >
          <Animated.View style={{ transform: [{ scale: copyScale }] }}>
            <CopyIcon size={18} color="#7A7A7A" strokeWidth={1.8} />
          </Animated.View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onSharePress}
          style={styles.actionBtn}
          hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
        >
          <ShareIcon size={18} color="#7A7A7A" strokeWidth={1.8} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            onLike();
            bump(likeScale);
          }}
          style={styles.actionBtn}
          hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
        >
          <Animated.View style={{ transform: [{ scale: likeScale }] }}>
            <LikeIcon
              size={18}
              color={reaction === 'like' ? '#4CAF50' : '#7A7A7A'}
              strokeWidth={1.6}
            />
          </Animated.View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            onDislike();
            bump(dislikeScale);
          }}
          style={styles.actionBtn}
          hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
        >
          <Animated.View style={{ transform: [{ scale: dislikeScale }] }}>
            <DislikeIcon
              size={18}
              color={reaction === 'dislike' ? '#E53935' : '#7A7A7A'}
              strokeWidth={1.6}
            />
          </Animated.View>
        </TouchableOpacity>
      </View>
    );
  };

  // ====== Bubbles ======
  const renderItem = ({ item }: { item: Msg }) => {
    const isUser = item.role === 'user';

    return (
      <View style={[styles.bubble, isUser ? styles.user : styles.assistant]}>
        {isUser ? (
          <Text style={styles.textUser}>{item.text}</Text>
        ) : (
          <Markdown style={markdownStyles}>{item.text}</Markdown>
        )}

        <View
          style={[styles.metaRow, isUser && { justifyContent: 'flex-end' }]}
        >
          <Text style={styles.metaTime}>{formatTime(item.createdAt)}</Text>
          {!isUser && (
            <AssistantActions
              text={item.text}
              reaction={item.reaction}
              onCopy={() => handleCopy(item.text)}
              onSharePress={() => handleShare(item.text)}
              onLike={() => handleReaction(item.id, 'like')}
              onDislike={() => handleReaction(item.id, 'dislike')}
            />
          )}
        </View>
      </View>
    );
  };

  // mm:ss
  const fmtTimer = (s: number) => {
    const m = Math.floor(s / 60);
    const ss = s % 60;
    return `${m.toString().padStart(2, '0')}:${ss.toString().padStart(2, '0')}`;
  };

  // ====== UI ======
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>AI advisory</Text>
      </View>

      {/* <Text>this is a text</Text> */}

      <FlatList
        contentContainerStyle={{ padding: 16, paddingBottom: 96 }}
        data={messages}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListFooterComponent={
          isThinking ? (
            <View style={[styles.bubble, styles.assistant]}>
              <View style={styles.thinkingRow}>
                <View style={styles.dot} />
                <View style={[styles.dot, { marginLeft: 6 }]} />
                <View style={[styles.dot, { marginLeft: 6 }]} />
              </View>
              <Text style={styles.metaTime}>thinking…</Text>
            </View>
          ) : null
        }
      />

      {/* Toast */}
      {toast ? (
        <Animated.View
          pointerEvents="none"
          style={[
            styles.toast,
            { opacity: toastOpacity, transform: [{ translateY: toastY }] },
          ]}
        >
          <Text style={styles.toastText}>{toast}</Text>
        </Animated.View>
      ) : null}

      {/* Bottom composer */}
      <View style={styles.composerWrap}>
        <LinearGradient
          colors={['rgba(255,0,0,0.8)', 'rgba(255,165,0,0.8)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.inputGradient}
        >
          {!isRecording ? (
            <View style={styles.inputInner}>
              <TextInput
                style={styles.textInput}
                placeholder="Ask anything about farming…"
                placeholderTextColor="rgba(0,0,0,0.35)"
                value={inputText}
                onChangeText={setInputText}
                returnKeyType="send"
                onSubmitEditing={handleSend}
                multiline
              />

              <TouchableOpacity
                onPress={() => Alert.alert('Gallery', 'Open image picker here')}
                style={{ marginRight: 8 }}
                hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
              >
                <GalleryIcon size={22} color="#8A8A8A" />
              </TouchableOpacity>

              {/* Right-side: Mic OR Send */}
              {inputText.trim().length > 0 ? (
                <TouchableOpacity onPress={handleSend} activeOpacity={0.9}>
                  <View style={styles.sendBtnSolid}>
                    <SendIcon size={20} color="#fff" />
                  </View>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={startRecording} activeOpacity={0.9}>
                  <View style={styles.micBtnSolid}>
                    <LockIcon color="#fff" />
                  </View>
                </TouchableOpacity>
              )}
            </View>
          ) : (
            // Recording overlay (replaces input field)
            <View style={styles.recordingWrap}>
              <View style={styles.voiceWave}>
                {barValues.map((v, i) => (
                  <Animated.View
                    key={i}
                    style={[
                      styles.voiceBar,
                      {
                        height: v.interpolate({
                          inputRange: [0, 1],
                          outputRange: [8, 28],
                        }),
                      },
                    ]}
                  />
                ))}
              </View>

              <Text style={styles.timerText}>{fmtTimer(recordSecs)}</Text>

              <TouchableOpacity onPress={stopRecording} activeOpacity={0.9}>
                <View style={styles.stopBtn}>
                  <View style={styles.stopSquare} />
                </View>
              </TouchableOpacity>
            </View>
          )}
        </LinearGradient>
      </View>
    </SafeAreaView>
  );
};

export default ChatScreen;

// ====== STYLES ======
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },

  // Header
  header: {
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#EEE',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#1F077A' },

  bubble: {
    maxWidth: '85%',
    padding: 12,

    borderRadius: 14,
    marginBottom: 10,
  },
  user: { alignSelf: 'flex-end', backgroundColor: '#E9EDFF' },
  assistant: { alignSelf: 'flex-start', backgroundColor: '#F6F6F7' },
  textUser: { color: '#1F077A', fontSize: 16, lineHeight: 22 },

  metaRow: {
    marginTop: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  metaTime: { fontSize: 12, color: '#7A7A7A' },
  actions: { flexDirection: 'row', alignItems: 'center', marginLeft: 12 },
  actionBtn: { paddingHorizontal: 6, paddingVertical: 2 },

  // Thinking
  thinkingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 3,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#999',
    marginRight: 6,
  },

  // Composer
  composerWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 4,
  },
  inputGradient: {
    flex: 1,
    padding: 1,
    borderRadius: 40,
    minHeight: 56,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  inputInner: {
    backgroundColor: 'white',
    borderRadius: 39,
    minHeight: 56,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: { flex: 1, fontSize: 16, color: '#1F077A', paddingVertical: 8 },
  sendBtnSolid: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#6929C4',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 6,
    shadowColor: '#6929C4',
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  micBtnSolid: {
    width: 32,
    height: 32,
    borderRadius: 50,
    backgroundColor: '#6929C4',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 6,
    shadowColor: '#6929C4',
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },

  // Recording overlay
  recordingWrap: {
    backgroundColor: 'white',
    borderRadius: 39,
    minHeight: 56,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  voiceWave: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 30,
    gap: 3,
    flex: 1,
    marginRight: 12,
  },
  voiceBar: {
    width: 4,
    backgroundColor: '#6929C4',
    borderRadius: 2,
  },
  timerText: {
    fontSize: 14,
    color: '#1F077A',
    marginRight: 12,
    fontWeight: '600',
  },
  stopBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E53935',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stopSquare: {
    width: 14,
    height: 14,
    backgroundColor: 'white',
    borderRadius: 3,
  },

  // Toast
  toast: {
    position: 'absolute',
    bottom: 96,
    alignSelf: 'center',
    backgroundColor: '#1F077A',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  toastText: { color: 'white', fontSize: 13, fontWeight: '600' },
});

// Markdown styles (assistant messages)
const markdownStyles = {
  body: { color: '#171717', fontSize: 16, lineHeight: 22 },
  strong: { fontWeight: '700', color: '#171717' },
  bullet_list: { marginTop: 6, marginBottom: 6 },
  ordered_list: { marginTop: 6, marginBottom: 6 },
  list_item: { marginBottom: 4 },
  paragraph: { marginTop: 4, marginBottom: 6 },
  heading1: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 6,
    color: '#171717',
  },
  heading2: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 6,
    color: '#171717',
  },
  heading3: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6,
    color: '#171717',
  },
  code_block: {
    backgroundColor: '#F1F3F5',
    padding: 8,
    borderRadius: 8,
    fontFamily: Platform.select({ ios: 'Menlo', android: 'monospace' }),
  },
} as const;
