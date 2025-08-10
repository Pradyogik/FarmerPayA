// components/VoiceInputErrorModal.tsx
import React from 'react';
import { Modal, View, Text, Pressable, StyleSheet, Image, Dimensions } from 'react-native';
import FingerPrint from '../../assets/images/Icons/fingerPrint.svg';
const {width}=Dimensions.get('window');
const FingerPrintPopUp = ({
  visible,
  onTryAgain,
}: {
  visible: boolean;
  onTryAgain: () => void;
}) => {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalBox}>
<View style={{borderRadius:84, elevation:6, backgroundColor:'#fff', padding:16}}><FingerPrint/></View>
          <Text style={styles.title}>Keep You Safe</Text>
          <Text style={styles.subtitle}>
            Biometric data is stored securely on your device and never shared.
          </Text>
          <Pressable style={styles.button} onPress={onTryAgain}>
            <Text style={styles.buttonText}>GET SECURITY</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default FingerPrintPopUp;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
  
    backgroundColor: 'rgba(0,0,0,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    backgroundColor: '#F2F2F2',
    borderRadius: 20,
    padding: 25,
      width:width-32,
    alignItems: 'center',
    elevation: 10,
    gap:24
  },
  title:{
    fontFamily: 'Inter',         // Load/link Inter font first
    fontWeight: '700',           // Bold = 700 weight
    fontStyle: 'normal',         // RN only supports 'normal' or 'italic'
    fontSize: 25,
    lineHeight: 32,
    letterSpacing: -0.5,         // -2% of 25px → 25 * -0.02 = -0.5
    // leading-trim not supported — adjust margin/padding instead
  },
  subtitle: {
    fontFamily: 'Inter',         // Ensure Inter is linked/loaded
    fontWeight: '400',           // 400 = Regular
    fontStyle: 'normal',         // RN uses 'normal' or 'italic' only
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0,
    textAlign: 'center',         // Same as CSS
    // leading-trim not supported
  },
  button: {
    backgroundColor: 'transparent',
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 50,
    borderWidth:2,
    borderColor:'#000'
  },
  buttonText: {
    fontFamily: 'Inter',         // Ensure Inter is loaded & linked
    fontWeight: '700',           // Bold weight
    fontStyle: 'normal',         // RN only has 'normal' or 'italic'
    fontSize: 13,
    lineHeight: 13,               // 100% of 13px = 13
    letterSpacing: 1.08,          // In RN, this is in dp, same as given
    textAlign: 'center',
    textTransform: 'uppercase',
    // leading-trim not supported
  },
});
