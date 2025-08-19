// AIAdvisory.js
import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import DualAnimatedRows from './animation';
import { InView } from 'react-native-intersection-observer';
import textStyles from '../utils/constants/textStyles';
const { width, height } = Dimensions.get('window');

interface AIAdvisoryProps {
  inView: boolean;
  navigation: any;
}
const AIAdvisory: React.FC<AIAdvisoryProps> = ({ inView, navigation }) => {
  return (
    <ImageBackground
      style={{
        width: width + 16,
        alignSelf: 'center',
        height: 'auto',
        minHeight: width,
        marginBottom: 24,
      }}
      resizeMode="contain"
      source={require('../assets/images/aiAdvisoryImage.png')}
    >
      <View style={styles.container}>
        <Text style={[textStyles.title, { marginHorizontal: 10 }]}>
          AI Advisory
        </Text>
        <DualAnimatedRows inView={inView} navigation={navigation} />
      </View>
    </ImageBackground>
  );
};

export default AIAdvisory;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    marginTop: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 10,
    color: '#1F077A',
    fontFamily: 'Inter-Regular', // Make sure Inter is linked properly
    lineHeight: 22, // 100% of 22px
    marginTop: 12,
  },
  pillContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  gradientBorder: {
    padding: 1,
    borderRadius: 20,
    margin: 4,
  },
  pill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#fff',
  },
  pillText: {
    fontSize: 10,
    color: '#3C1C78',
  },
});
