import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import MessageOption from '../../components/AiAdvisoryComponents/messageOptions';
import LinearGradient from 'react-native-linear-gradient';
import ChatHistory from '../../components/AiAdvisoryComponents/chatHistory';
import  {VoiceChat}  from '../../components/AiAdvisoryComponents/VoiceBubble';
import ChatInputBar from '../../components/AiAdvisoryComponents/chatInputBar';
import CustomTopBar from '../../components/customTopBar';
import DualAnimatedRows from '../../components/animation';
import { useFocusEffect, useRoute } from '@react-navigation/native';


interface historyProps {
  type:string,
  answer?: string;
  prompt?: string;
  onPress?: () => void;
  onLike?: () => void;
  onDislike?: () => void;
  onRegenerate?: () => void;
  followUpPrompt?: string;
  id: string;
  duration?: string;
  questionVoice?: string;
  answerVoice?: string;
  answerText?: string;
};

const options = [
  'Where is nearest seed shop? 🌱',
  'How to get Kisan Card? 📄',
  'गेहूं की MSP क्या है?🌾',
  'Aaj ka mausam? ☀️',
  'ನಾನು ಯಾವ ಸರ್ಕಾರ ಯೋಜನೆಗೆ ಅರ್ಹನು? 🪪',
  'How to apply crop insurance? 🌾',
  'Which government scheme am I eligible for? 📃',
  'गोदाम कहाँ है? 🏠',
  'बोवनी महत्त्व? 💧',
];

// Mixed chat history: both voice and text
 
const AIChat = ({navigation}:any) => {
  const [history, setHistory] = useState<historyProps[]>([
  {
    id:'1',
    type: 'text',
    prompt: 'How to increase crop yield?',
    answer: `To boost your crop yield with modern techniques, try these steps:\n\n• Adopt High-Yield Varieties\n• Use Drip Irrigation\n• Soil Testing\n• Integrated Pest Management`,
    onPress: () => console.log('Edit crop yield'),
  },
  {
    type: 'voice',
    id: '2',
    duration: '0:11',
    questionVoice: 'question1.mp3',
    answerVoice: 'answer1.mp3',
    answerText: 'You can use the Kisan Suvidha app to locate nearby seed shops.',
  },
  {
    id:'3',
    type: 'text',
    prompt: 'What is MSP for wheat?',
    answer: `The MSP for wheat in 2024-25 is ₹2,275 per quintal.`,
    onPress: () => console.log('Edit MSP'),
  },
]);


const [inputText, setInputText] = useState('');
const handleSubmit = (paramInput?: string) => {
    let prmpt:string;
    // if (!inputText.trim()) return;
    if(paramInput){
        prmpt= paramInput.trim();
    }else{
        prmpt= inputText.trim();
    }
    
    const newItem: historyProps = {
      id: '4', // unique ID based on timestamp
      type: 'text',
      prompt: prmpt,
      answer: 'Default answer coming soon...Default answer coming soon...Default answer coming soon...Default answer coming soon...', // ⬅️ you can customize this
      onPress: () => console.log(`Edit prompt: ${inputText.trim()}`),
    };

    setHistory(prev => [ ...prev,newItem]); // add to top of list
    setInputText('');
  };
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: true });
  }, [history]);

const route = useRoute<any>();
useFocusEffect(
  useCallback(() => {
    const paramInput = route?.params?.inputText || route?.params?.item;

    if (paramInput) {
      setInputText(paramInput);
      handleSubmit(paramInput);

      // Optionally clear the param so it doesn't trigger again
      navigation.setParams({ inputText: undefined, item: undefined });
    }
  }, [route?.params])
);



return (

    <View style={{ flex: 1, alignItems: 'center', height:'100%', justifyContent: 'center' ,backgroundColor:'#fff' }}>
      {history.length === 0 ? (
        <></>
      ) : (
        <>
          <View style={{ width: '100%' }}>
            <CustomTopBar />
          </View>

          <ScrollView
            ref={scrollRef}
            contentContainerStyle={styles.optionsContainer}
            showsVerticalScrollIndicator={false}
          >
            {history.map((item, index) =>
              item.type === 'voice' ? (
                <VoiceChat key={index} item={item} />
              ) : (
                <ChatHistory
                    key={index}
                    prompt={item.prompt ?? ''}
                    answer={item.answer ?? ''}
                    onPress={item.onPress ?? (() => { })}
                    onLike={() => console.log('Liked:', item.prompt)}
                    onDislike={() => console.log('Disliked:', item.prompt)}
                    onRegenerate={() => console.log('Regenerate:', item.prompt)} 
                    id={item.id}                />
              )
            )}
          </ScrollView>
        </>
      )}

      <View style={{ marginBottom: -14, width: '100%' }}>
        <ChatInputBar
        navigation={navigation}
          value={inputText}
          onChangeText={(text) => {
            setInputText(text);
            console.log('Typed:', text);
          }}
          onSubmitEditing={handleSubmit}
          onMicPress={() => Alert.alert('Mic pressed')}
          onGalleryPress={() => Alert.alert('Gallery pressed')}
        />
      </View>
    </View>

);

};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    paddingHorizontal: 16,
    paddingTop: 60,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  logo: {
    width: 120,
    height: 90,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#5A2B8D',
  },
  subtitle: {
    fontSize: 16,
    color: '#444',
    marginVertical: 10,
    textAlign: 'center',
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap:'wrap',
    paddingBottom: 40,
  },
  inputWrapper: {
    position: 'absolute',
    bottom: 20,
    left: 4,
    right: 4,
  },
  gradientBorder: {
    padding: 2,
    borderRadius: 30,
  },
  inputBar: {
    backgroundColor: '#fff',
    borderRadius: 28,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#000',
    marginHorizontal: 12,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: '#fff',
  },
  iconImg: {
    width: 24,
    height: 24,
    tintColor: '#979C9E',
  },
});

export default AIChat;
