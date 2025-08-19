import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface VoiceItem {
  id?: string;
  duration?: string;
  questionVoice?: string;
  answerVoice?: string;
  answerText?: string;
};

const VoiceBubble = ({ uri, duration, dark }: { uri: string; duration: string; dark?: boolean }) => {
  const gradientColors = dark ? ['#2a007a', '#4805a8'] : ['#a755f5', '#c174f8'];

  return (
    <LinearGradient colors={gradientColors} style={styles.bubble}>
      <TouchableOpacity style={styles.playButton}>
        <Image source={require('../../assets/images/playButton.png')} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconWaveform}>
        <Image source={require('../../assets/images/Waveform.png')} style={styles.iconWaveform} />
      </TouchableOpacity>
      <Text style={styles.duration}>{duration}</Text>
      <Image source={require('../../assets/images/voiceSpeaker.png')} style={styles.iconSpeaker} />
    </LinearGradient>
  );
};

const ActionButtons = () => (
  <View style={styles.actions}>
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
);

export const VoiceChat = ({ item }: { item: VoiceItem }) => (
  <View style={styles.container}>
    {/* Question aligned to right */}
    <View style={[styles.row, { justifyContent: 'flex-end' }]}>
      <VoiceBubble uri={item.questionVoice || ''} duration={item.duration || '0:10'} dark />
    </View>

    {/* Answer aligned to left */}
    <View style={[styles.row, { justifyContent: 'flex-start' }]}>
      <VoiceBubble uri={item.answerVoice || ''} duration={item.duration || '0:00'} />
    </View>

    {/* Answer Text + Controls */}
    <View style={styles.answerBlock}>
      <Text style={styles.answerText}>{item.answerText}</Text>
      <ActionButtons />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 24,
    paddingHorizontal: 16
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 8,
    width: '100%',
  },
  bubble: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-evenly',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 24,
    maxWidth: '70%',
  },
  playButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#9c55f9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  duration: {
    color: '#fff',
    fontWeight: '500',
    flex: 1,
  },
  answerBlock: {
    marginTop: 4,
    backgroundColor: '#f4f4f4',
    borderRadius: 12,
    padding: 12,
    alignSelf: 'flex-start',
  },
  answerText: {
    color: '#222',
    marginBottom: 8,
  },
  actions: {
    flexDirection: 'row',
    columnGap: 16,
  },
  icon: {
    width: 30,
    height: 30,
  },
  iconSpeaker: {
    width: 20,
    height: 20,
  },
  iconWaveform:{
    width:90,
    height: 20,
    marginRight: 5,
  },
  iconSmall: {
    width: 18,
    height: 18,
    tintColor: '#555',
  },
});
