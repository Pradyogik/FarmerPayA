import React from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/HomeScreen';
import AiWelcomeScreen from '../screens/AiWelcomeScreen.tsx';
import Language_unavailableScreen from '../components/emptyState/Language-unavailable';

// Icons (SVGs)
import HomeActive from '../assets/images/nav/active-home.svg';
import HomeInactive from '../assets/images/nav/home.svg';
import AiActive from '../assets/images/nav/active-ai.svg';
import AiInactive from '../assets/images/nav/ai.svg';
import ScanIcon from '../assets/images/nav/scan.svg';
import UpiIcon from '../assets/images/nav/upi.svg';
import UpiActiveIcon from '../assets/images/nav/active-upi.svg';
import ProfileActive from '../assets/images/nav/active-profile.svg';
import ProfileInactive from '../assets/images/nav/profile.svg';

const { width, height } = Dimensions.get('window');
const Tab = createBottomTabNavigator();

const AppNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarShowLabel: false,
      headerShown: false,
      tabBarIcon: ({ focused }) => {
        let IconComponent;
        switch (route.name) {
          case 'Home':
            IconComponent = focused ? HomeActive : HomeInactive;
            break;
          case 'Chat':
            IconComponent = focused ? AiActive : AiInactive;
            break;
          case 'Scanner':
            IconComponent = ScanIcon;
            break;
          case 'Weather':
            IconComponent = focused ? UpiActiveIcon : UpiIcon;
            break;
          case 'Profile':
            IconComponent = focused ? ProfileActive : ProfileInactive;
            break;
          default:
            IconComponent = HomeInactive;
        }

        const isScanner = route.name === 'Scanner';
        return (
          <View style={isScanner ? styles.scannerIconContainer : styles.iconWrapper}>
            <IconComponent width={isScanner ? 56 : 56} height={isScanner ? 56 : 56}/>
          </View>
        );
      },

      tabBarStyle: {
        backgroundColor: '#fff',
        borderTopWidth: 0,
        elevation: 5,
        height: 70,
        paddingBottom: 0,
        paddingTop: 6,
      },
      tabBarItemStyle: {
        justifyContent: 'center',
        alignItems: 'center',
      },
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Chat" component={AiWelcomeScreen} />
    <Tab.Screen
      name="Scanner"
      component={HomeScreen}
      options={{
        tabBarButton: (props) => (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => console.log('Scanner pressed')}
            style={styles.scannerButtonWrapper}
          >
            {props.children}
          </TouchableOpacity>
        ),
      }}
    />
    <Tab.Screen name="Weather" component={Language_unavailableScreen} />
    <Tab.Screen name="Profile" component={HomeScreen} />
  </Tab.Navigator>
);

const styles = StyleSheet.create({
  iconWrapper: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  svgIcon: {
    width: 24,
    height: 24,
    alignSelf: 'center',
  },
  scannerButtonWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  scannerIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#6929C4',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 18,
    alignSelf: 'center',
    padding: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    zIndex: 10,
  },
});

export default AppNavigator;
