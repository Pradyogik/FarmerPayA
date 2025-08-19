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
import { useNavigation } from '@react-navigation/native';

export default function BackOnlineScreen() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const handleTryAgain = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/empty-state/back-online.png')}
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.title}>You are online!</Text>
      <Text style={styles.subtitle}>Let's go back to services</Text>

      {/*Centered circular grey arrow button */}
      <TouchableOpacity  onPress={() => navigation.goBack()} style={{ marginBottom: 32 }}>
        <BackArrow color="#54219D" />
      </TouchableOpacity>

      {loading && <ActivityIndicator size="small" color="#6929C4" />}
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
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#4B320D',
    marginBottom: 12,
    marginTop: -20,
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
  circularBackButton: {
    backgroundColor: '#E0E0E0', // Light grey
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
