// drawerComponent.tsx or DrawerContent.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DrawerContentComponentProps } from '@react-navigation/drawer';

const DrawerContent: React.FC<DrawerContentComponentProps> = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>🔧 Drawer Content Here</Text>

      {/* Example: Use props.navigation to close drawer */}
      <Text
        onPress={() => props.navigation.closeDrawer()}
        style={[styles.text, { color: 'blue', marginTop: 20 }]}
      >
        🔙 Close Drawer
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 16,
  },
});

export default DrawerContent;
