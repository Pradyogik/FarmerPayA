import React, { useRef, useEffect, useState } from 'react';
import {
  Animated,
  View,
  Text,
  StyleSheet,
  Dimensions,
  Easing,
  ScrollView,
  FlatList,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

interface AnimatedRowProps {
  direction: 'left' | 'right';
  items: string[];
  onDone: () => void;
}

const AnimatedRow: React.FC<AnimatedRowProps> = ({
  direction,
  items,
  onDone,
}) => {
  const translateX = useRef(
    new Animated.Value(direction === 'left' ? -width : width),
  ).current;
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    translateX.setValue(direction === 'left' ? -width : width);
    scale.setValue(1);

    Animated.sequence([
      Animated.timing(translateX, {
        toValue: 0,
        duration: 1000,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1.1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(onDone);
  }, []);

  return (
    <Animated.View
      style={[
        styles.row,
        {
          transform: [{ translateX }, { scale }],
        },
      ]}
    >
      {items.map((item, index) => (
        <LinearGradient
          key={index}
          colors={['#FF0000', '#FFA500']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientBorder}
        >
          <View style={styles.pill}>
            <Text
              style={styles.pillText}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {item}
            </Text>
          </View>
        </LinearGradient>
      ))}
    </Animated.View>
  );
};

interface DualAnimatedRowsProps {
  inView: boolean;
  navigation: any;
}

const DualAnimatedRows: React.FC<DualAnimatedRowsProps> = ({
  inView,
  navigation,
}) => {
  const [showColumn, setShowColumn] = useState(false);
  const [row1Done, setRow1Done] = useState(false);
  const [row2Done, setRow2Done] = useState(false);
  const [cycleId, setCycleId] = useState(0); // unique key per cycle to force re-mount

  useEffect(() => {
    if (inView) {
      // restart animation cycle
      setRow1Done(false);
      setRow2Done(false);
      setShowColumn(false);
      setCycleId(prev => prev + 1); // force rerender to reset AnimatedRow
    }
  }, [inView]);

  useEffect(() => {
    if (row1Done && row2Done) {
      setTimeout(() => setShowColumn(true), 500);
    }
  }, [row1Done, row2Done]);

  const QUESTIONS1 = [
    'Where is nearest seed shop? 🌱',
    'गेहूँ की MSP क्या है?” 🌾',
    'Aaj ka mausam? ☀️',
    'ಮೇಯುವ ಸರ್ಕಾರ ಯೋಜನೆಗೆ ಅರ್ಹನು? 📚',
    'Which government scheme am I eligible for? 📄',
    'How to get Kisan Card? 📄',
    'बोरवेल गहराई? 💧',
    'गेहूँ की MSP क्या है?” 🌾',
    'Aaj ka mausam? ☀️',
  ];

  const QUESTIONS2 = [...QUESTIONS1];

  return (
    <>
      {showColumn ? (
        <View style={{ maxHeight: 300 }}>
          <FlatList
            data={[...QUESTIONS1, ...QUESTIONS2]}
            keyExtractor={(item, index) => `${item}-${index}`}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('AiChat');
                }}
              >
                <LinearGradient
                  colors={['#FF0000', '#FFA500']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.gradientBorder}
                >
                  <View style={styles.pill}>
                    {typeof item === 'string' ? (
                      <Text
                        style={styles.pillText}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                      >
                        {item}
                      </Text>
                    ) : null}
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            )}
            horizontal={true}
            contentContainerStyle={[
              styles.columnContainer,
              { paddingBottom: 30 },
            ]}
            showsVerticalScrollIndicator={true}
            bounces={true}
          />
        </View>
      ) : (
        <>
          <AnimatedRow
            key={`left-${cycleId}`}
            direction="left"
            items={QUESTIONS1}
            onDone={() => setRow1Done(true)}
          />
          <AnimatedRow
            key={`right-${cycleId}`}
            direction="right"
            items={QUESTIONS2}
            onDone={() => setRow2Done(true)}
          />
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  row: {
    width: width,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 12,
  },
  pill: {
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    justifyContent: 'center',
    gap: 8,
    height: 45,
    backgroundColor: '#fff',
    borderRadius: 40,
  },
  pillText: {
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 22,
    letterSpacing: -0.04,
    color: '#1F077A',
  },
  columnContainer: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    paddingVertical: 16,
    paddingHorizontal: 10,
  },
  gradientBorder: {
    padding: 1,
    borderRadius: 40,
    margin: 4,
  },
});

export default DualAnimatedRows;
