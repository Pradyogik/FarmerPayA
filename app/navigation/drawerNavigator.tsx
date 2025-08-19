import React from 'react';
import { createDrawerNavigator} from '@react-navigation/drawer';

import DrawerContent from './drawerComponent.tsx';
import MyNewScreen from '../screens/AIChat/AiWelcomeScreen'


const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{
        drawerPosition: 'right',
        headerShown: false,
        drawerType: 'slide',
      }}
    >
      <Drawer.Screen name="Main" component={MyNewScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;