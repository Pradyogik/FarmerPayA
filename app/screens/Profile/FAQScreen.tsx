import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  findNodeHandle,
  Dimensions,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useNavigation, useRoute } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import BackArrow from '../../assets/images/back-arrow.svg';

const { height } = Dimensions.get('window');

const faqData = [
  {
    category: 'Money Transfer',
    questions: ['Lorem ipsum dolor sit ame', 'Lorem ipsum dolor sit ame'],
  },
  {
    category: 'My Account & KYC',
    questions: ['Lorem ipsum dolor sit ame', 'Lorem ipsum dolor sit ame'],
  },
  {
    category: 'UPI',
    questions: ['Lorem ipsum dolor sit ame', 'Lorem ipsum dolor sit ame'],
  },
];

const answerText =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.';

const FAQScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const scrollRef = useRef<ScrollView>(null);
  const sectionRefs = useRef<{ [key: string]: View }>({});
  const { category } = route.params || {};
  const [openSection, setOpenSection] = useState({});

  const toggleQuestion = (catIndex: number, qIndex: number) => {
    const key = `${catIndex}-${qIndex}`;
    setOpenSection((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  useEffect(() => {
    if (category && sectionRefs.current[category]) {
      const handle = findNodeHandle(sectionRefs.current[category]);
      if (handle) {
        sectionRefs.current[category].measureLayout(
          findNodeHandle(scrollRef.current!) as number,
          (x, y) => {
            scrollRef.current?.scrollTo({ y, animated: true });
          },
          () => {}
        );
      }
    }
  }, [category]);

  return (
    <LinearGradient
      colors={['#4506A0', '#6929C4']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={{ flex: 1 ,paddingTop: StatusBar.currentHeight || 40,}}
    >
      {/* Header */}
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
            <BackArrow width={28} height={28} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Help and Support</Text>
        </View>
        <TouchableOpacity>
          <Icon name="dots-vertical" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Curved FAQ Content */}
      <View style={styles.contentContainer}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          ref={scrollRef}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.faqTitle}>Frequently Asked Questions</Text>

          {faqData.map((section, catIndex) => (
            <View
              key={catIndex}
              ref={(ref) => {
                if (ref) sectionRefs.current[section.category] = ref;
              }}
              style={styles.section}
            >
              <Text style={styles.sectionTitle}>{section.category}</Text>

              {section.questions.map((q, qIndex) => {
                const isOpen = openSection[`${catIndex}-${qIndex}`];
                return (
                  <View key={qIndex} style={styles.questionBlock}>
                    <TouchableOpacity
                      style={styles.questionRow}
                      onPress={() => toggleQuestion(catIndex, qIndex)}
                    >
                      <Text style={styles.questionText}>{q}</Text>
                      <FeatherIcon
                        name={isOpen ? 'minus' : 'plus'}
                        size={20}
                        color="#5F25B0"
                      />
                    </TouchableOpacity>
                    {isOpen && <Text style={styles.answerText}>{answerText}</Text>}
                    <View style={styles.divider} />
                    </View>
                );
              })}
            </View>
          ))}
        </ScrollView>
      </View>
    </LinearGradient>
  );
};

export default FAQScreen;

const styles = StyleSheet.create({
  headerText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopStartRadius: 32,
    borderTopEndRadius: 32,
    paddingTop: 20,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  faqTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 24,
  },
  section: {
    marginBottom: 28,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#888',
    marginBottom: 12,
  },
  questionBlock: {
    marginBottom: 12,
  },
  questionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  questionText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
    paddingRight: 12,
  },
  answerText: {
    fontSize: 14,
    color: '#777',
    marginTop: 6,
    paddingRight: 30,
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E5E5',
    marginTop: 12,
  },
});
