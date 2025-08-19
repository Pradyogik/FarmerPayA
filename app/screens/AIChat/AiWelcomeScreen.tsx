import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  Alert,
  Animated,
  Dimensions,
  TouchableOpacity,
  Easing,
  TextInput,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
// If you have a mic icon component, import it here:
import { LockIcon } from '../../assets/AI/mic.tsx'; // app/assets/AI/mic.tsx
import { GalleryIcon } from '../../assets/AI/gallery.tsx';
import { SendIcon } from '../../assets/AI/send';

const { width: screenWidth } = Dimensions.get('window');

const BORDER = 1; // use 0.7 or StyleSheet.hairlineWidth for ultra-thin
const OUTER_R = 40;
const MIC_COLOR = '#865DFF';
const MIC_RING = 'rgba(68, 7, 249, 0.9)'; // 80% opacity ring

// ---------- Pulsing Mic Button ----------
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

// ---------- Reusable Marquee Row ----------
const MarqueeRow = ({
  questions,
  direction = 'left',
  speed = 60,
  onPress,
}: {
  questions: string[];
  direction?: 'left' | 'right';
  speed?: number;
  onPress: (q: string) => void;
}) => {
  const anim = useRef(new Animated.Value(0)).current;
  const [contentWidth, setContentWidth] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);

  const run = useCallback(() => {
    if (!contentWidth || !containerWidth) return;
    const distance = contentWidth; // we render 2 copies; sliding 1 width loops seamlessly
    const duration = (distance / speed) * 1000;

    if (direction === 'left') {
      anim.setValue(0);
      Animated.timing(anim, {
        toValue: -distance,
        duration,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(({ finished }) => finished && run());
    } else {
      anim.setValue(-distance);
      Animated.timing(anim, {
        toValue: 0,
        duration,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(({ finished }) => finished && run());
    }
  }, [anim, contentWidth, containerWidth, direction, speed]);

  useEffect(() => {
    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentWidth, containerWidth, direction, speed]);

  const Tile = ({ q, i }: { q: string; i: number }) => (
    <TouchableOpacity
      key={`${q}-${i}`}
      onPress={() => onPress(q)}
      activeOpacity={0.8}
      style={styles.tileTouchable}
    >
      <LinearGradient
        colors={['rgba(255,0,0,0.8)', 'rgba(255,165,0,0.8)']} // red → orange @ 80%
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.tileGradient}
      >
        <View style={styles.tileInner}>
          <Text style={styles.questionText}>{q}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <View
      style={styles.marqueeRow}
      onLayout={e => setContainerWidth(e.nativeEvent.layout.width)}
    >
      <Animated.View
        style={[styles.marqueeContainer, { transform: [{ translateX: anim }] }]}
      >
        <View
          style={styles.marqueeContent}
          onLayout={e => setContentWidth(e.nativeEvent.layout.width)}
        >
          {questions.map((q, i) => (
            <Tile q={q} i={i} />
          ))}
        </View>
        <View style={styles.marqueeContent}>
          {questions.map((q, i) => (
            <Tile q={q} i={i} />
          ))}
        </View>
      </Animated.View>
    </View>
  );
};

// ---------- Screen ----------
const AiWelcomeScreen = ({ navigation }: any) => {
  const [inputText, setInputText] = useState('');
  const isFocused = useIsFocused();
  const handleSend = () => {
    const text = inputText.trim();
    if (!text) return;
    navigation.navigate('ChatScreen', { initialText: text });
    setInputText('');
  };

  const questionsRow1 = [
    'Where is nearest seed shop? 🌱',
    'How to get KCC? 📔',
    'गेहू की MSP क्या है? 🌾',
  ];
  const questionsRow2 = [
    'ಮೈ ಯಾವ ಸರ್ಕಾರಿ ಯೋಜನೆಗೆ ಅರ್ಹನು? 📚',
    'How to get KCC? 📔',
    'बोरवेल गहराई? 💧',
    'गेहू की MSP क्या है? 🌾',
  ];
  const questionsRow3 = [
    'Which government scheme am I eligible for? 📔',
    'गेहू की MSP क्या है? 🌾',
    'Aaj ka mausam? 🌤️',
    'How to get KCC? 📔',
  ];
  const questionsRow4 = [
    'How to get KCC? 📔',
    'बोरवेल गहराई? 💧',
    'ಮೈ ಯಾವ ಸರ್ಕಾರಿ ಯೋಜನೆಗೆ ಅರ್ಹನು? 📚',
    'गेहू की MSP क्या है? 🌾',
  ];

  const handleQuestionPress = (question: string) => {
    setInputText(question.replace(/[🌱📔🌾📚💧🌤️]/g, '').trim());
    Alert.alert('Question Selected', question);
  };

  const handleMicPress = () => Alert.alert('Mic pressed');

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Logo */}
        <Image
          source={require('../../assets/AI/Logo.png')}
          style={styles.logo}
        />

        {/* Main Question Text */}
        <Text style={styles.mainQuestionText}>
          What farming help do you{'\n'}need today?
        </Text>

        {/* Marquee Rows */}
        <View style={styles.marqueeSection}>
          <MarqueeRow
            questions={questionsRow1}
            direction="left"
            speed={60}
            onPress={handleQuestionPress}
          />
          <MarqueeRow
            questions={questionsRow2}
            direction="right"
            speed={65}
            onPress={handleQuestionPress}
          />
          <MarqueeRow
            questions={questionsRow3}
            direction="left"
            speed={70}
            onPress={handleQuestionPress}
          />
          <MarqueeRow
            questions={questionsRow4}
            direction="right"
            speed={75}
            onPress={handleQuestionPress}
          />
        </View>
      </View>

      {/* Bottom composer: input (gradient border like tiles) + pulsing mic on right */}
      <View style={styles.composerWrap}>
        <LinearGradient
          colors={['rgba(255,0,0,0.8)', 'rgba(255,165,0,0.8)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.inputGradient}
        >
          <View style={styles.inputInner}>
            <TextInput
              style={styles.textInput}
              placeholder="Type a message..."
              placeholderTextColor="rgba(0,0,0,0.35)"
              value={inputText}
              onChangeText={setInputText}
              returnKeyType="send"
              onSubmitEditing={handleSend}
            />
            {/* Gallery */}
            <TouchableOpacity
              style={{ marginRight: 8 }}
              onPress={() => {
                /* open picker */
              }}
            >
              <GalleryIcon size={32} color="#8A8A8A" />
            </TouchableOpacity>

            {/* Send button (small gradient circle) */}
            <TouchableOpacity onPress={handleSend} activeOpacity={0.9}>
              <View style={styles.sendBtnSolid}>
                <SendIcon size={20} color="#fff" />
              </View>
            </TouchableOpacity>
          </View>
        </LinearGradient>

        <PulsingMic onPress={handleMicPress} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: 'white' },
  container: { flex: 1, alignItems: 'center', paddingTop: 80 },
  logo: { width: 120, height: 120, resizeMode: 'contain' },
  mainQuestionText: {
    position: 'absolute',
    width: 400,
    height: 100,
    top: 200,
    fontFamily: 'Inter-SemiBold',
    fontWeight: '600',
    fontSize: 22,
    lineHeight: 27,
    textAlign: 'center',
    letterSpacing: -0.04,
    color: 'rgba(31, 7, 122, 0.8)',
  },

  // --- Marquee layout ---
  marqueeSection: {
    position: 'absolute',
    top: 300,
    width: '100%',
    height: 300,
    justifyContent: 'space-around',
  },
  marqueeRow: { height: 60, overflow: 'hidden' },
  marqueeContainer: { flexDirection: 'row', alignItems: 'center' },
  marqueeContent: { flexDirection: 'row', alignItems: 'center' },

  // --- Tile like before ---
  tileTouchable: { marginHorizontal: 10, height: 46 },
  tileGradient: {
    borderRadius: OUTER_R,
    padding: BORDER,
    minWidth: 187,
    height: 46,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  tileInner: {
    backgroundColor: 'white',
    borderRadius: OUTER_R - BORDER,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 19,
  },
  questionText: {
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: 18,
    lineHeight: 22,
    letterSpacing: -0.04,
    color: '#1F077A',
    textAlign: 'center',
  },

  // --- Bottom composer ---
  composerWrap: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 16,
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 5,
  },
  inputGradient: {
    flex: 1,
    padding: 1, // border thickness
    borderRadius: 40,
    height: 56,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  inputInner: {
    backgroundColor: 'white',
    borderRadius: 40 - 1,
    height: '100%',
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#1F077A',
  },

  sendBtn: {
    marginLeft: 8,
  },
  sendBtnSolid: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#6929C4',
    justifyContent: 'center',
    alignItems: 'center',
    // optional shadow:
    shadowColor: '#6929C4',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },

  // mic styles
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
    shadowColor: MIC_COLOR,
    shadowOpacity: 0.55,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
});

export default AiWelcomeScreen;
