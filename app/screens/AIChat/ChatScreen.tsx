// app/screens/AIChat/ChatScreen.tsx
import React, { use, useEffect, useMemo, useRef, useState } from 'react';
import axios from 'axios';
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
  Image,
} from 'react-native';
import { pick, types } from '@react-native-documents/picker';
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
const MIC_COLOR = '#865DFF';
const MIC_RING = 'rgba(68, 7, 249, 0.9)';

const PulsingMic = ({
  onPress,
  size = 48,
}: {
  onPress: () => void;
  size?: number;
}) => {
  const pulse = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(pulse, {
        toValue: 1,
        duration: 1300,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
    ).start();
  }, [pulse]);

  // ring grows & fades
  const ringScale = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.35],
  });
  const ringOpacity = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [0.5, 0],
  });

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={[
        styles.micWrap,
        { width: size, height: size, borderRadius: size / 2 },
      ]}
    >
      {/* pulsating ring */}
      <Animated.View
        pointerEvents="none"
        style={[
          styles.micRing,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            transform: [{ scale: ringScale }],
            opacity: ringOpacity,
            backgroundColor: MIC_RING,
          },
        ]}
      />
      {/* solid circle */}
      <View
        style={[
          styles.micCore,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: MIC_COLOR,
          },
        ]}
      >
        {/* your mic icon centered */}
        {typeof LockIcon === 'function' ? <LockIcon color="white" /> : null}
      </View>
    </TouchableOpacity>
  );
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
  const mic: string | undefined = route?.params?.mic;
  const gallery: string | undefined = route?.params?.gallery;
  const [messages, setMessages] = useState<Msg[]>([]);
  // console.log('messages',messages);
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

  //soilhealth file
  const [file, setFile] = useState<any>(null);
  const [fileInfo, setFileInfo] = useState<{
    id: string;
    name: string;
    type: any;
  } | null>(null);
  const [fileState ,setFileState]=useState<string>("File selected");
  const [soilContext, setSoilContext] = useState<any>({});
  let soilContext1="";
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
    if (mic) {
      startRecording();
    }
    if (gallery) {
      pickFile();
    }
  }, [initialText, mic, gallery]);

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
    const SoilHealth = soilContext ? JSON.stringify(soilContext) : '';
    return [
      {
        role: 'system',
        content: `${SYSTEM_PROMPT}\n\nSoil health card context: ${SoilHealth}`,
      },
      ...mapped,
    ];
  }, [messages, soilContext]);

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
      console.log('json', json);
      const reply = json?.choices?.[0]?.message?.content?.trim();
      console.log('reply', reply);
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

  // 1. Function to pick a file
  const pickFile = async () => {
    try {
      const [res] = await pick({ type: [types.allFiles] });

      setFile(res);
      // await uploadFile(res);
      // simulateUpload(res.size ?? 100 * 1024, setProgress1, setUploadSpeed1, setIsUploading1);
    } catch (err: any) {
      if (err.name !== 'Cancel') {
        console.warn('Picker error:', err);
      }
    }
  };
  // 2. Function to upload picked file to API
  const uploadFile = async (file: any) => {
    try {
      if (!file) {
        Alert.alert('Error', 'No file selected');
        return;
      }
      setFileState("Uploading...");
      const formData = new FormData();
      formData.append('purpose', 'user_data'); // required by OpenAI
      formData.append('file', {
        uri: file.uri,
        type: file.type,
        name: file.name || 'soil_health_card.pdf',
      });

      const response = await axios.post(
        'https://api.openai.com/v1/files',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${OPENAI_API_KEY}`,
          },
        },
      );

      console.log('Upload success:', response.data);
      setFileState("Uploaded");
      // Save file_id and name
      setFileInfo({
        id: response.data.id,
        name: response.data.filename,
        type: file.type,
      });
      
      await saveContextSoilHealth(
        response.data.id,
        response.data.filename,
        file.type,
      );
      setFile(null);
      setFileState("File Selected");
     
      
    } catch (err: any) {
      console.error('Upload error:', err);
      Alert.alert('Error', 'Upload failed. Please try again.');
    }
  };

  const saveContextSoilHealth = async (
    id: string,
    name: string,
    type: string | undefined,
  ) => {
    try {
      setFileState("Extracting....");
      const isPdf = type === 'application/pdf'; // use passed `type`, not undefined `file`
      const fileType = isPdf ? 'input_file' : 'input_image';

      const body = {
        model: 'gpt-4o-mini',
        input: [
          {
            role: 'user',
            content: [
              {
                type: 'input_text',
                text: 'Extract all fields from this Soil Health Card into JSON exactly as schema defines. Do not paraphrase. Preserve units. If value missing, set it to null.',
              },
              {
                type: fileType,
                file_id: id,
              },
            ],
          },
        ],
        text: {
          format: {
            type: 'json_schema',
            name: 'Soil_health_card',
            strict: true,
            schema: {
              type: 'object',
              properties: {
                center: {
                  type: 'object',
                  properties: {
                    name: { type: 'string' },
                    address: { type: 'string' },
                  },
                  required: ['name', 'address'],
                  additionalProperties: false,
                },
                test: {
                  type: 'object',
                  properties: {
                    id: { type: 'string' },
                    testing_date: { type: 'string' },
                    validity: { type: 'string' },
                  },
                  required: ['id', 'testing_date', 'validity'],
                  additionalProperties: false,
                },
                sample_info: {
                  type: 'object',
                  properties: {
                    survey_no: { type: 'string' },
                    plot_address: { type: 'string' },
                    sampling_date: { type: 'string' },
                    gps: { type: 'string' },
                  },
                  required: [
                    'survey_no',
                    'plot_address',
                    'sampling_date',
                    'gps',
                  ],
                  additionalProperties: false,
                },
                farmer: {
                  type: 'object',
                  properties: {
                    name: { type: 'string' },
                    phone: { type: 'string' },
                    address: { type: 'string' },
                  },
                  required: ['name', 'phone', 'address'],
                  additionalProperties: false,
                },
                crop: { type: 'string' },
                plot: {
                  type: 'object',
                  properties: {
                    size_hectare: { type: 'string' },
                    soil_type: { type: 'string' },
                  },
                  required: ['size_hectare', 'soil_type'],
                  additionalProperties: false,
                },
                nutrients: {
                  type: 'object',
                  properties: {
                    nitrogen: { type: 'string' },
                    phosphorus: { type: 'string' },
                    potassium: { type: 'string' },
                    ph: { type: 'string' },
                    ec: { type: 'string' },
                    organic_carbon: { type: 'string' },
                    sulphur: { type: 'string' },
                    zinc: { type: 'string' },
                    boron: { type: 'string' },
                    iron: { type: 'string' },
                    manganese: { type: 'string' },
                    copper: { type: 'string' },
                  },
                  required: [
                    'nitrogen',
                    'phosphorus',
                    'potassium',
                    'ph',
                    'ec',
                    'organic_carbon',
                    'sulphur',
                    'zinc',
                    'boron',
                    'iron',
                    'manganese',
                    'copper',
                  ],
                  additionalProperties: false,
                },
                recommendations: {
                  type: 'object',
                  properties: {
                    crop: { type: 'string' },
                    soil_conditioner: { type: ['string', 'null'] },
                    fertilizer_combination_1: { type: 'string' },
                    fertilizer_combination_2: { type: 'string' },
                  },
                  required: [
                    'crop',
                    'soil_conditioner',
                    'fertilizer_combination_1',
                    'fertilizer_combination_2',
                  ],
                  additionalProperties: false,
                },
                disclaimer: { type: ['string', 'null'] },
              },
              required: [
                'center',
                'test',
                'sample_info',
                'farmer',
                'crop',
                'plot',
                'nutrients',
                'recommendations',
                'disclaimer',
              ],
              additionalProperties: false,
            },
          },
        },
      };

      const response = await axios.post(
        'https://api.openai.com/v1/responses',
        body,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${OPENAI_API_KEY}`,
          },
        },
      );
      setFileState("Extracted Soil data!");

      console.log('received Soil data:', response.data.output?.[0]?.content?.[0]?.text );
      await setSoilContext(response.data.output?.[0]?.content?.[0]?.text);
      console.log('context', soilContext);
      setFileState("Soil Context Saved");
      console.log('context Saved ✅');
    } catch (err: any) {
      console.error(
        'Error fetching soil data:',
        err,
      );
    }
  };
const handleSendFileText = async () => {
  if(file){
    setFileState("File Sellected");
    await uploadFile(file);
    console.log("inputText",inputText);
      if(inputText.trim().length>0){
       pushMessage('user', "Thank you for uploading the File."+inputText.trim()); 
       askAssistant(inputText.trim());
    }
      if(inputText.trim().length==0){ pushMessage('user', "Thank you for uploading Soil health card. let me give you all details");
        setTimeout(()=>{askAssistant("Give detail of my soil health card .");},2000);}
  }

}
  // ====== UI ======
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>AI advisory</Text>
      </View>

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
        {file && (
          <View style={{ marginBottom: 8}}>
            {file.type?.startsWith('image/') ? (
              <View style={{ position: 'relative',flexDirection:'row',  height: 90 }}>
                <Image
                  source={{ uri: file.uri }}
                  style={{ width: 90, height: '100%', borderRadius: 8 }}
                  resizeMode="cover"
                />

                <TouchableOpacity
                  onPress={() => setFile(null)}
                  style={{
                    position: 'absolute',
                    top: -8,
                    left:70,
                    backgroundColor: 'rgba(0,0,0,0.6)',
                    borderRadius: 12,
                    paddingHorizontal: 8,
                    padding: 4,
                  }}
                >
                  <Text
                    style={{ color: '#fff', fontWeight: 'bold', fontSize: 12 }}
                  >
                    X
                  </Text>
                </TouchableOpacity>
                <Text style={{marginLeft:12}}>{fileState}</Text>
              </View>
            ) : (
              <View
                style={{
                  height: 50,
                  borderRadius: 8,
                  backgroundColor: '#f0f0f0',
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 12,
                }}
              ><View style={{gap:8,flexDirection:'row',alignItems:'center'}}>
                <Text
                  style={{ fontSize: 12, color: '#555', textAlign: 'center' }}
                >
                  {file.name || 'File selected'}
                </Text>
                <TouchableOpacity onPress={() => setFile(null) }                  
                 style={{
                    backgroundColor: '#d0d0d0',
                    borderRadius: 12,
                    paddingHorizontal: 8,
                    padding: 4,
                  }}>
                  <Text style={{fontSize:12}}>X</Text>
                </TouchableOpacity></View>
                <Text>{fileState}</Text>
              </View>
            )}
          </View>
        )}

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
              {file ? (
                <TouchableOpacity onPress={handleSendFileText} activeOpacity={0.9}>
                  <View style={[styles.sendBtnSolid, { marginRight: 8 }]}>
                    <SendIcon size={20} color="#fff" />
                  </View>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => pickFile()}
                  style={{ marginRight: 8 }}
                  hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
                >
                  <GalleryIcon size={32} color="#8A8A8A" />
                </TouchableOpacity>
              )}
              {/* Right-side: Mic OR Send */}
              {inputText.trim().length > 0 ? (
                <>
                  {!file && (
                    <TouchableOpacity onPress={handleSend} activeOpacity={0.9}>
                      <View style={styles.sendBtnSolid}>
                        <SendIcon size={20} color="#fff" />
                      </View>
                    </TouchableOpacity>
                  )}
                </>
              ) : (
                <TouchableOpacity onPress={startRecording} activeOpacity={0.9}>
                  {/* <View style={styles.micBtnSolid}>
                    <LockIcon color="#fff" />
                  </View> */}
                  <PulsingMic onPress={startRecording} />
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
    width: 39,
    height: 39,
    borderRadius: 50,
    paddingVertical: 4,
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
  micWrap: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  micRing: {
    position: 'absolute',
  },
  micCore: {
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#865DFF',
    shadowOpacity: 0.55,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
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
