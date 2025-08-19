import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions, Animated, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/HomeScreen';
import AiWelcomeScreen from '../screens/AIChat/AiWelcomeScreen.tsx';
import Language_unavailableScreen from '../components/emptyState/Language-unavailable';
import QrScreen from '../screens/scanner/qr.tsx';
import ProfileScreen from '../screens/Profile/Profile.tsx';

// ✅ Your TSX icon components (adjust paths if yours are under /assets/Navbar)
import HomeIcon from '../assets/Navbar/home';
import AiIcon from '../assets/Navbar/ai';
import RupeeIcon from '../assets/Navbar/rupee';
import ProfileIcon from '../assets/Navbar/profile';

// If you also have a TSX scanner icon, import it and replace the SVG below
import ScanIcon from '../assets/images/nav/scan.svg';

const { width } = Dimensions.get('window');
const Tab = createBottomTabNavigator();

const PRIMARY = '#54219D';
const INACTIVE = '#656565';

function AnimatedIcon({
  focused,
  children,
}: {
  focused: boolean;
  children: React.ReactNode;
}) {
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.spring(scale, {
      toValue: focused ? 1.1 : 1,
      friction: 7,
      tension: 120,
      useNativeDriver: true,
    }).start();
  }, [focused, scale]);

  return <Animated.View style={{ transform: [{ scale }] }}>{children}</Animated.View>;
}

const AppNavigator = ({ navigation }: any) => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarShowLabel: false,
      tabBarHideOnKeyboard: true,
      tabBarStyle: {
        backgroundColor: '#FFFFFF',
        borderTopWidth: 0,
        elevation: 8,
        height: 70,
        paddingTop: 6,
      },
      tabBarItemStyle: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      tabBarIcon: ({ focused }) => {
        const isScanner = route.name === 'Scanner';
        const color = focused ? PRIMARY : INACTIVE;
        const size = 26;
        const stroke = 2;

        let iconNode: React.ReactNode = null;

        switch (route.name) {
          case 'Home':
            iconNode = <HomeIcon size={size} color={color} strokeWidth={stroke} />;
            break;
          case 'Chat':
            iconNode = <AiIcon size={size} color={color} strokeWidth={stroke} />;
            break;
          case 'Weather': // (this is your UPI tab)
            iconNode = <RupeeIcon size={size} color={color} strokeWidth={stroke} />;
            break;
          case 'Profile':
            iconNode = <ProfileIcon size={size} color={color} strokeWidth={1.8} />;
            break;
          case 'Scanner':
            iconNode = <ScanIcon width={32} height={32} />;
            break;
          default:
            iconNode = <HomeIcon size={size} color={color} strokeWidth={stroke} />;
        }

        if (isScanner) {
          return (
            <View style={styles.scannerIconContainer}>
              {iconNode}
            </View>
          );
        }

        return (
          <View style={styles.iconWrapper}>
            <AnimatedIcon focused={focused}>{iconNode}</AnimatedIcon>
          </View>
        );
      },
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Chat" component={AiWelcomeScreen} />

    <Tab.Screen
      name="Scanner"
      component={QrScreen}
      options={{
        tabBarButton: (props) => (
          <TouchableOpacity
            {...props}
            activeOpacity={0.85}
            onPress={() => navigation.navigate('QrScreen')}
            style={styles.scannerButtonWrapper}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            accessibilityLabel="Open QR Scanner"
            accessibilityRole="button"
          >
            {props.children}
          </TouchableOpacity>
        ),
      }}
    />

    {/* Rename this route to "UPI" later if you like; using your RupeeIcon now */}
    <Tab.Screen name="Weather" component={Language_unavailableScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

const styles = StyleSheet.create({
  iconWrapper: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 8,
  },
  activeUnderline: {
    position: 'absolute',
    bottom: 8,
    width: 16,
    height: 3,
    borderRadius: 2,
    backgroundColor: PRIMARY,
  },

  // Center FAB
  scannerButtonWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  scannerIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
    ...Platform.select({
      android: { elevation: 8 },
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
      },
    }),
  },
});

export default AppNavigator;
