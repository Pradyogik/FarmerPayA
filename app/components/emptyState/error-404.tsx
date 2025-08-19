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

export default function Error_404Screen() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const handleTryAgain = () => {
    setLoading(true);
    // Simulate check (replace with real internet check logic)
    setTimeout(() => {
      setLoading(false);
      // Possibly navigate or update state based on connectivity
    }, 1500);
  };

  return (
    <View style={styles.container}>
       {/* Back Button */}
      <View style={{ width: '100%', alignItems: 'flex-start', marginBottom: 32 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackArrow color="#54219D" />
        </TouchableOpacity>
      </View>

      <Image
        source={require('../../assets/images/empty-state/error404.png')} // Replace with actual path
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.subtitle}>Something went wrong.</Text>

      <TouchableOpacity style={styles.retryButton} onPress={handleTryAgain}>
        {loading ? (
          <ActivityIndicator color="#000" />
        ) : (
          <Text style={styles.retryText}>Tap to retry</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    padding: 24,
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
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#4B320D',
    marginBottom: 24,
    marginTop: -40,
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
    paddingVertical: 10,
    paddingHorizontal: 28,
    borderRadius: 20,
  },
  retryText: {
    fontSize: 16,
    color: '#000',
  },
});
