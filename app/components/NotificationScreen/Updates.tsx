import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const updatesData = [
  {
    id: '1',
    date: 'TODAY',
    image: require('../../assets/images/notifications/promo1.png'),
    title:
      'Complete your profile and unlock loans up to ₹10,000—no paperwork, instant approval',
    time: '11:00 AM',
  },
  {
    id: '2',
    date: 'YESTERDAY',
    image: require('../../assets/images/notifications/promo2..png'),
    title:
      'Update your details to receive personalized advice and higher credit offers!',
    time: '11:00 AM',
  },
];

export default function Updates() {
  const groupedData = {
    TODAY: updatesData.filter((item) => item.date === 'TODAY'),
    YESTERDAY: updatesData.filter((item) => item.date === 'YESTERDAY'),
  };

  const renderItem = ({ item }: any) => {
    return (
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <View style={styles.imageContainer}>
            <Image
              source={item.image}
              style={StyleSheet.absoluteFillObject}
              resizeMode="cover"
            />
          </View>
          <View style={styles.contentRight}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <View style={styles.timeRow}>
              <Icon name="clock" size={12} color="#999" />
              <Text style={styles.timeText}>{item.time}</Text>
            </View>
            <TouchableOpacity style={styles.ctaButton}>
              <Text style={styles.ctaText}>Hurry Up! Apply Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      {Object.entries(groupedData).map(([label, items]) => (
        <View key={label}>
          <Text style={styles.sectionLabel}>{label}</Text>
          <FlatList
            data={items}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  sectionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#999999',
    marginBottom: 8,
    marginTop: 20,
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 8,
    gap: 2,

  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  imageContainer: {
    width: 100,
    flex: 1,
    borderRadius: 8,
    overflow: 'hidden',
    marginRight: 16,
    position: 'relative',
  },
  contentRight: {
    flex: 3,
    justifyContent: 'space-between',
    paddingVertical: 2,
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: '500',
    color: '#333333',
    marginBottom: 8,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 12,
    color: '#999',
    marginLeft: 6,
  },
  ctaButton: {
    alignSelf: 'flex-start',
    borderColor: '#54219D',
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 16,
    marginTop: 8,
  },
  ctaText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#54219D',
  },
});
