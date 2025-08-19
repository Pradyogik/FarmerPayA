// components/VoiceInputErrorModal.tsx
import React from 'react';
import { Modal, View, Text, Pressable, StyleSheet, Image } from 'react-native';

const VoiceInputErrorModal = ({
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
          <Image
            source={require('../assets/images/mic_error.png')} // replace with your red wave icon
            style={{ width: '80%',aspectRatio:4.9, marginBottom: 16 }}
          />
          <Text style={styles.title}>Voice Input Not Recognized</Text>
          <Text style={styles.subtitle}>
            Could not recognize your voice. Please try again or use manual input.
          </Text>
          <View style={{height:1,width:'100%', backgroundColor:'#000' ,alignSelf:'center'}}/>
          <Pressable style={styles.button} onPress={onTryAgain}>
            <Text style={styles.buttonText}>Try Again</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default VoiceInputErrorModal;

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
    padding: 24,
    width: '80%',
    alignItems: 'center',
    elevation: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: '#3F1976',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 12,
    color: '#4B5768',
    textAlign: 'center',
    marginBottom: 16,
  },
  button: {
    backgroundColor: 'transparent',
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 24,
  },
  buttonText: {
    color: '#000',
    fontWeight: '500',
    fontSize: 16,
  },
});
