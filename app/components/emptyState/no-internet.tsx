import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import BackArrow from '../../assets/images/back-arrow.svg';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

export default function NoInternetScreen() {
  const navigation = useNavigation();
  const [isRetrying, setIsRetrying] = useState(false);

  const handleRetry = () => {
    setIsRetrying(true);
    setTimeout(() => {
      setIsRetrying(false);
      // Check internet connectivity and possibly navigate or alert
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <View style={{ width: '100%', alignItems: 'flex-start', marginBottom: 32 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackArrow color="#54219D" />
        </TouchableOpacity>
      </View>

      <View style={styles.image}>
        <Image
          source={require('../../assets/images/empty-state/check-internet.png')}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <Text style={styles.subtitle}>Please check your internet connection!</Text>

      <TouchableOpacity
        style={[styles.retryButton, isRetrying && styles.retrying]}
        onPress={handleRetry}
        disabled={isRetrying}
      >
        {isRetrying ? (
          <ActivityIndicator color="#000" />
        ) : (
          <Text style={styles.retryText}>Try Again</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 24,
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#54219D',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E0E0E0',
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 14,
    color: '#888',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#F2F2F2',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#eee',
  },
  retrying: {
    backgroundColor: '#E0E0E0',
    borderColor: '#CCCCCC',
  },
  retryText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
});
