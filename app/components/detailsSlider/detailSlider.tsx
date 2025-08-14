import React from 'react';
import { View, Text, ScrollView, StyleSheet, ImageBackground } from 'react-native';
import DetailCard from './detailCard';
import textStyles from '../../utils/constants/textStyles';

const AddDetailSlider = () => {
  return (
    <View >
      <ImageBackground source={require('../../assets/images/Union.png')} style={styles.container}>
      <Text style={[textStyles.title,{letterSpacing:-0.8 , paddingLeft:16}]}>Add your details</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{paddingHorizontal:16}}>
        <DetailCard
          title="Add Your Farm"
          subtitle="Add farm details for advisory and schemes."
          buttonLabel="Add Farm"
          image={require('../../assets/images/farm.png')}
          onPress={() => console.log('Add Farm')}
        />
        <DetailCard
          title="Add Your Livestock"
          subtitle="Manage livestock for insurance & health benefits."
          buttonLabel="Add Livestock"
          image={require('../../assets/images/liveStock.png')}
          onPress={() => console.log('Add Livestock')}
        />
      
      </ScrollView></ImageBackground>
    </View>  
  );
};

const styles = StyleSheet.create({
  container: {

    flex: 1,
    paddingTop: 24,

    paddingBottom:48
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F077A',
    marginBottom: 14,
  },
});

export default AddDetailSlider;
