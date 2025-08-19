import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
// import Clipboard from '@react-native-clipboard/clipboard';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CopyIcon from '../../assets/images/Profile/copy.svg';


interface FarmerCardProps {
  name: string;
  role: string;
  location: string;
  id: string;
  onAddDetails: () => void;
}

const FarmerCard: React.FC<FarmerCardProps> = ({
  name,
  role,
  location,
  id,
  onAddDetails,
}) => {
  const copyToClipboard = () => {
    // Clipboard.setString(id);
    //Alert.alert('Copied', 'Farmer ID copied to clipboard.');
  };

  return (
    <View style={styles.card}>
  <View style={styles.header}>
    {/* Left Section */}
    <View style={styles.leftSection}>
      <View style={styles.imageWrapper}>
        <Image
          source={require('../../assets/images/Profile/dp.jpg')}
          style={styles.profileImage}
        />
      </View>
      <View>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.role}>{role}</Text>
      </View>
    </View>

    {/* Right Section */}
    <View style={styles.rightSection}>
      <View style={styles.locationRow}>
        <Icon name="map-marker-outline" size={16} color="#6E6E6E" />
        <Text style={styles.locationText}>{location}</Text>
      </View>
      <View style={styles.idRow}>
        <Text style={styles.idLabel}>Your ID: </Text>
        <Text style={styles.idValue}>{id}</Text>
        <TouchableOpacity onPress={copyToClipboard}>
          <CopyIcon width={16} height={16} />
        </TouchableOpacity>
      </View>
    </View>
  </View>

  <TouchableOpacity style={styles.button} onPress={onAddDetails}>
    <Text style={styles.buttonText}>Add missing details</Text>
  </TouchableOpacity>
</View>

  );
};

const styles = StyleSheet.create({
  card: {
  borderRadius: 12,
  backgroundColor: '#F8F8F8',     // light grey for card (not screen)
  borderWidth: 1,
  borderColor: '#C0C0C0',
  padding: 12,
  shadowColor: 'transparent',     // remove shadow if unwanted
  elevation: 0,                   // no Android elevation
},

  header: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 16,
  paddingHorizontal: 0, // remove side padding
},

leftSection: {
  flexDirection: 'row',
  alignItems: 'center',
  flex: 1,
  marginRight: 8, // space between left and right
},

imageWrapper: {
  marginRight: 8,
  marginLeft: 0, // reduce image's start space
},

profileImage: {
  width: 48,
  height: 48,
  borderRadius: 24,
},

rightSection: {
  alignItems: 'flex-end',
  justifyContent: 'center',
  maxWidth: '45%',
  paddingLeft: 4,
},

  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#1A1A1A',
  },
  role: {
    color: '#888',
    fontSize: 12,
    marginTop: 4,
  },
  locationRow: {
    flexDirection: 'row',
    fontSize: 12,
    alignItems: 'center',
  },
  locationText: {
    fontSize: 12,
    color: '#6E6E6E',
    marginLeft: 4,
  },
  idRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  idLabel: {
    fontSize: 10,
    color: '#6E6E6E',
  },
  idValue: {
    fontSize: 10,
    color: '#1A1A1A',
    fontWeight: '600',
    marginRight: 4,
  },
  button: {
    backgroundColor: '#6929C4',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 25,
    
    justifyContent: 'center',
    height: 48,
    
  },
  buttonText: {
    color: '#fff',
    fontWeight: '400',
    fontSize: 16,
  },
});

export default FarmerCard;
