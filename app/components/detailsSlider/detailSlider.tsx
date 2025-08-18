import React from 'react';
import { View, Text, ScrollView, StyleSheet, ImageBackground } from 'react-native';
import DetailCard from './detailCard';
import textStyles from '../../utils/constants/textStyles';

const AddDetailSlider = () => {
  const details = [
    {
      title: "Add Your Farm",
      subtitle: "Add farm details for advisory and schemes.",
      buttonLabel: "Add Farm",
      image: require('../../assets/images/farm.png'),
      onPress: () => console.log('Add Farm'),
    },
    {
      title: "Add Your Livestock",
      subtitle: "Manage livestock for insurance & health benefits.",
      buttonLabel: "Add Livestock",
      image: require('../../assets/images/liveStock.png'),
      onPress: () => console.log('Add Livestock'),
    },
  ];

  const isFirst = 0;
  const isLast = details.length - 1;

  return (
    <View>
      <ImageBackground 
        source={require('../../assets/images/Union.png')} 
        style={styles.container}
      >
        <View style ={styles.title}>
          <Text style={textStyles.title}>Add your details</Text>
        </View>
      
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.cardRow}
        >
          {details.map((item, index) => (
            <View
              key={index}
              style={[
                styles.cardWrapper,
                index === isFirst && styles.isFirstCard,
                index === isLast && styles.isLastCard
              ]}
            >
              <DetailCard
                title={item.title}
                subtitle={item.subtitle}
                buttonLabel={item.buttonLabel}
                image={item.image}
                onPress={item.onPress}
              />
            </View>
          ))}
        </ScrollView>
      </ImageBackground>
    </View>  
  );
};

const styles = StyleSheet.create({
  title:{
    paddingLeft:16,
  },
  container: {
    flex: 1,
    paddingTop: 24,

    paddingBottom:48
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 6, 
  },
  cardWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  isFirstCard: {
    paddingLeft: 16,
  },
  isLastCard: {
    paddingRight: 16,
  },
});

export default AddDetailSlider;
