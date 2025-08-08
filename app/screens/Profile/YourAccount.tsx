import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import BackArrow from '../../assets/images/back-arrow.svg';
import SearchMic from '../../assets/images/Profile/searchmic.svg';

const { height, width } = Dimensions.get('window');
const gridPadding = 16;
const spacing = 12;
const columns = 4;
const tileWidth = (width - 2 * gridPadding - spacing * (columns - 1)) / columns;


const YourAccount = () => {
  const navigation = useNavigation();

  return (
    <LinearGradient
      colors={['#4506A0', '#6929C4']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={{ flex: 1 }}
    >
    
      {/* Gradient Header */}
      <View
        style={{
            flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 16,
          alignItems: 'center',
          elevation: 4,
          shadowColor: '#fff',
          height: height * 0.08,
        }}
        >
        <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <BackArrow color="#fff" width={28} height={28} />
          </TouchableOpacity>
          <Text style={{ fontSize: 16, color: '#fff' }}>Your Account</Text>
        </View>
        <TouchableOpacity>
          <Icon name="dots-vertical" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Curved White Content */}
      <View style={styles.contentContainer}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>Select a Category</Text>
          </View>

          {/* Search Bar */}
          <View style={styles.searchWrapper}>
            <SearchMic width={20} height={20} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search category"
              placeholderTextColor="#999"
            />
          </View>

         
        </ScrollView>
      </View>
    </LinearGradient>
  );
};

export default YourAccount;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopStartRadius: 32,
    borderTopEndRadius: 32,
    paddingTop: 16,
  },
  scrollContent: {
    paddingBottom: 16,
  },
  titleWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingBottom: 8,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  title: {
    fontWeight: '500',
    fontSize: 14,
    color: '#656565',
    marginBottom: 12,
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#C0C0C0',
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginBottom: 20,
    marginHorizontal: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
  },
  gridContainer: {
    paddingHorizontal: gridPadding,
  },
  gridRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 20,
    flexWrap: 'wrap',
  },
  gridItemWrapper: {
    width: tileWidth,
    alignItems: 'center',
  },
  iconBox: {
    width: 60,
    height: 60,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#D1BDED',
    backgroundColor: '#F0EAF9',
  },
  greyTile: {
    backgroundColor: '#FAF9F6',
    borderWidth: 1,
    borderColor: '#C0C0C0',
  },
  gridDivider: {
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    marginTop: 12,
    marginBottom: 4,
    width: '100%',
  },
  tileLabel: {
    marginTop: 8,
    fontSize: 12,
    textAlign: 'center',
    color: '#4506A0',
  },
});
