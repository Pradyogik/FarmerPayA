import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { SvgProps } from 'react-native-svg';
const { width, height } = Dimensions.get('window');
import LoanIcon from '../assets/Services/loans.png';
// import LoanIcon from '../assets/images/components/services/LoansIcon.svg';
import InsuranceIcon from '../assets/images/components/services/InsuranceIcon.svg';
import SchemeIcon from '../assets/images/components/services/Schemes.svg';
import ScoreIcon from '../assets/images/components/services/ScoreIcon.svg';
import textStyles from '../utils/constants/textStyles';


const ServiceCard = ({
  title,
  icon,
  Icon,
}: {
  title: string;
  icon?: any;
  Icon?: React.FC<SvgProps>;
}) => (
  <TouchableOpacity style={styles.card}>
    <View style={{ width: '54%', paddingTop: 16, paddingLeft: 16 }}>
      <Text style={styles.label}>{title}</Text>
    </View>
    <View style={{ width: '45%', padding: 3 }}>
      {icon ? (
        <Image source={icon} style={styles.icon} />
      ) : Icon ? (
        <Icon />
      ) : null}
    </View>
  </TouchableOpacity>
);

const Services = () => {
  return (
    <View style={{ width: width * 0.96, aspectRatio: 1.26 }}>
      <Text style={[textStyles.title, { paddingHorizontal: 16 }]}>
        Services
      </Text>
      <View style={styles.servicesGrid}>
        <View style={{ width: '48.8%' }}>
          <ServiceCard title="Loans" icon={LoanIcon} />
          <ServiceCard title="Insurance" Icon={InsuranceIcon} />
          <ServiceCard title="Schemes" Icon={SchemeIcon} />
        </View>
        <View style={{ width: '48.8%', marginLeft: 6 }}>
          <View style={{ height: '62.255%', marginBottom: 3 }}>
            <TouchableOpacity style={styles.card2}>
              <Text
                style={[
                  {
                    fontFamily: 'Inter-SemiBold', // Use correct weight/style
                    fontSize: 16,
                    letterSpacing: -0.88, // -4% of 22px
                    color: '#4506A0',
                  },
                ]}
              >
                {'AI Advisory'}
              </Text>
              <Image
                source={require('../assets/images/ai.png')}
                style={[styles.icon, { alignSelf: 'flex-end', marginTop: 4 }]}
              />
            </TouchableOpacity>
          </View>
          <View style={{ height: '20%', marginTop: 6 }}>
            <ServiceCard title="My Score" Icon={ScoreIcon} />
          </View>
        </View>
      </View>
    </View>
  );
};
export default Services;

const styles = StyleSheet.create({
  card: {
    width: '102%',
    aspectRatio: 2.3508,
    backgroundColor: '#4506A00D',
    borderRadius: 12,
    paddingBottom: 12,
    margin: 3,
    flexDirection: 'row',
    borderWidth: 1.5,
    borderColor: '#4506A026',
    justifyContent: 'space-between',
  },
  card2: {
    width: '102%',
    aspectRatio: 1.14522,
    borderWidth: 1.5,
    backgroundColor: '#4506A00D',
    borderColor: '#4506A026',
    borderRadius: 12,
    padding: 12,
    margin: 3,
  },
  icon: {
    width: '80%',
    aspectRatio: 1,
    marginBottom: 8,
    resizeMode: 'contain',
  },
  label: {
    fontFamily: 'Inter-SemiBold', // Use correct weight/style
    fontSize: 16,
    lineHeight: 18, // 100% of font size
    letterSpacing: -0.88, // -4% of 22px
    color: '#4506A0',
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 16,
    marginVertical: 8,
    color: '#1F077A',
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    verticalAlign: 'auto',
    paddingHorizontal: 10,
    marginLeft: 6,
  },
});
