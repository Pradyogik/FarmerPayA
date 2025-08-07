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
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

import BackArrow from '../../assets/images/back-arrow.svg';

const { height } = Dimensions.get('window');

const AddNewQuery = () => {
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
          height: height * 0.08,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <BackArrow color="#fff" width={30} height={30} />
          </TouchableOpacity>
          <Text style={styles.headerText}>Add New Query</Text>
        </View>
        <TouchableOpacity>
          <Icon name="dots-vertical" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Curved Content Section */}
      <View style={styles.contentContainer}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.formContainer}>
            <Text style={styles.label}>Explain your issue</Text>

            <TextInput
              style={styles.textArea}
              placeholder="Type your message here"
              placeholderTextColor="#888"
              multiline
              numberOfLines={4}
            />

            <Text style={styles.helperText}>
              Your message will be copied to the support team.
            </Text>

            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.cancelButton}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.saveButton}>
                <Text style={styles.saveText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </LinearGradient>
  );
};

export default AddNewQuery;


// Layout math
const screenWidth = Dimensions.get('window').width;
const gridPadding = 16;
const spacing = 12;
const columns = 4;
const tileWidth = (screenWidth - 2 * gridPadding - spacing * (columns - 1)) / columns;

const styles = StyleSheet.create({
  headerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopStartRadius: 32,
    borderTopEndRadius: 32,
    paddingTop: 24,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  formContainer: {
    marginTop: 8,
  },
  label: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 6,
    color: '#000',
  },
  textArea: {
    borderWidth: 1.2,
    borderColor: '#5F25B0',
    borderRadius: 12,
    padding: 10,
    textAlignVertical: 'top',
    minHeight: 120,
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
  },
  helperText: {
    marginTop: 6,
    fontSize: 12,
    color: '#777',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  cancelButton: {
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: '#5F25B0',
    minWidth: 100,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelText: {
    color: '#5F25B0',
    fontWeight: '600',
    textAlign: 'center',
  },
  saveButton: {
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 24,
    backgroundColor: '#5F25B0',
    minWidth: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveText: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
  },
});
