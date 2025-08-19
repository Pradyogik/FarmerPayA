import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';


interface ChatHistoryProps {
  id:string;
  answer?: string;
  prompt?: string;
  onPress?: () => void;
  onLike?: () => void;
  onDislike?: () => void;
  onRegenerate?: () => void;
  followUpPrompt?: string;
}

const ChatHistory: React.FC<ChatHistoryProps> = ({
  id,
  answer,
  prompt,
  onPress,
  onLike,
  onDislike,
  onRegenerate,
  followUpPrompt,
}) => {
  const handleCopy = () => {
 
    Alert.alert('Copied to clipboard!');
  };

  return (
    <View style={styles.container}>
      {/* PROMPT BUBBLE */}
      <View style={styles.promptRow}>
        <View style={styles.promptBubble}>
          <Text style={styles.promptText}>{prompt}</Text>
        </View>
        <View style={styles.iconRow}>
          <TouchableOpacity onPress={handleCopy}>
            <Image
              source={require('../../assets/images/copy.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={onPress}>
            <Image
              source={require('../../assets/images/edit.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* ANSWER TEXT */}
      <View style={styles.answerBox}>
        <Text style={styles.answerText}>{answer}</Text>
      </View>

      {/* REACTION ICONS */}
      <View style={styles.reactions}>
     <TouchableOpacity>
      <Image source={require('../../assets/images/copy.png')} style={styles.iconSmall} />
    </TouchableOpacity>
    <TouchableOpacity>
      <Image source={require('../../assets/images/like.png')} style={styles.iconSmall} />
    </TouchableOpacity>
    <TouchableOpacity>
      <Image source={require('../../assets/images/dislike.png')} style={styles.iconSmall} />
    </TouchableOpacity>
    <TouchableOpacity>
      <Image source={require('../../assets/images/speaker.png')} style={styles.iconSmall} />
    </TouchableOpacity>
    <TouchableOpacity>
      <Image source={require('../../assets/images/regenerate.png')} style={styles.iconSmall} />
    </TouchableOpacity> 
      </View>

      {/* FOLLOW-UP PROMPT */}
      {followUpPrompt && (
        <View style={styles.followUpBubble}>
          <Text style={styles.followUpText}>{followUpPrompt}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
    paddingHorizontal: 16,
  },
  promptRow: {
    alignSelf:'flex-end',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 6,
  },
  promptBubble: {

    backgroundColor:'#4506A01A',
    padding: 12,
    borderRadius: 16,
    maxWidth: '80%',
  },
  promptText: {
    fontSize: 14,
    color: '#1F077A',
  },
  iconRow: {
    flexDirection: 'row',
    marginLeft: 8,
    marginTop:8,
    gap: 4,
  },
  icon: {
    width: 18,
    height: 18,

    marginLeft: 6,
  },
  answerBox: {
    marginTop: 8,
  },
  answerText: {
    fontSize: 14,
    color: '#111',
    lineHeight: 22,
  },
  reactions: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 14,
    marginBottom: 10,
  },
  reactionIcon: {
    width: 20,
    height: 20,
    tintColor: '#6929C4',
  },
  followUpBubble: {
    backgroundColor: '#F3F0FA',
    padding: 10,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  followUpText: {
    fontSize: 14,
    color: '#4B3C8C',
  },
  iconSmall: {
    width: 18,
    height: 18,
    tintColor: '#555',
  },
});

export default ChatHistory;
