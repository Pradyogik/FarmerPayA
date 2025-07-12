import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

export default function NotificationScreen() {
  const navigation = useNavigation();
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={24} color="#54219D" />
      </TouchableOpacity>

      {/* Image or Loader */}
      {!imageLoaded && <Text style={styles.loadingText}>No Notifications</Text>}

      <Image
        source={require('../../assets/images/selection/no-notifications.png')}
        style={styles.image}
        resizeMode="contain"
        onLoadEnd={() => setImageLoaded(true)}
      />

      {/* Subtitle only after image load */}
      {imageLoaded && (
        <Text style={styles.subtitle}>You have no alerts</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 24,
    paddingTop: 48,
  },
  backButton: {
    position: 'absolute',
    top: 48,
    left: 24,
    zIndex: 10,
  },
  image: {
    width: '100%',
    height: 300,
    alignSelf: 'center',
    marginTop: 100,
  },
  subtitle: {
    fontSize: 14,
    color: '#999999',
    textAlign: 'center',
    marginTop: 20,
  },
  loadingText: {
    fontSize: 18,
    color: '#4B320D',
    textAlign: 'center',
    marginTop: 150,
  },
});
