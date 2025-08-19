import React, { useRef } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Platform, Text } from 'react-native';
import {
  Waveform,
  type IWaveformRef,
} from '@simform_solutions/react-native-audio-waveform';

const AudioWaveScreen = () => {
  const ref = useRef<IWaveformRef>(null);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <Text style={{color:"red"}}>this is the Audio Chat Screen</Text>
      <Waveform
        ref={ref}
        mode="static"          // draw a static waveform from a file
        path="sample.wav"      // since we bundled it with react-native-asset
        height={120}           // adjust as needed
        candleWidth={3}
        candleSpace={2}
        scrubColor="#00000020" // optional
        onPlayerStateChange={(s) => console.log('player state:', s)}
        onPanStateChange={(moving) => console.log('isMoving:', moving)}
        style={{ marginHorizontal: 16, marginTop: 24 }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});

export default AudioWaveScreen;
