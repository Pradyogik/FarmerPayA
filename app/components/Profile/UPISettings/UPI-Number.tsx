import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import colors from '../../../assets/colors.tsx';
import { useNavigation } from '@react-navigation/native';

export default function upiNumber() {
  const navigation = useNavigation();
  

  return (
    <View style={styles.card}>
      <Text style={styles.title}>@ybl</Text>
        
          <View style={styles.textWrapper}>
          <Text style ={[styles.body, { flex: 1, marginRight: 0 }]}>
            Change Your Name, Photo, Mobile Number, Role (Farmer/Agent)
          </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#C0C0C0',
    padding: 16,
    marginVertical: 10,
    marginHorizontal: 20,
  },
  
  titleWrapper: {
    gap : 12,
    marginBottom:12,
  },
  title: {
    fontWeight: '500',
    fontSize: 20,
    color: colors.neutral[700],
    lineHeight:20,
    fontFamily: 'Inter-Medium',
    marginBottom:12,
  },
  
  body:{
    fontFamily:'Inter-Medium',
    fontSize:14,
    fontWeight:'500',
    lineHeight:21,
    color : colors.neutral[800],
    paddingRight:0,
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E5E5',
    marginTop: 12,
    marginBottom:10,
  },
  textWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },

});
