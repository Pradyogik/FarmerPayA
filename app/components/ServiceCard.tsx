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
  style,
}: {
  title: string;
  icon?: any;
  Icon?: React.FC<SvgProps>;
  style?: any;
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
    <View style={{ width: width * 0.96, aspectRatio: 1.26, alignSelf: 'center'  ,paddingHorizontal: '2%' }}>
      <Text style={[textStyles.title,]}>
        Services
      </Text>
      <View style={styles.servicesGrid}>
        <View style={styles.leftColumn}>
          <ServiceCard title="Loans" Icon={LoanIcon} style={{ flex: 89 }} /> {/*(87/95)*/}
          <ServiceCard title="Insurance" Icon={InsuranceIcon} style={{ flex: 95 }}/> {/*95 baseline*/}
          <ServiceCard title="Schemes" Icon={SchemeIcon} style={{ flex: 95 }}/>
        </View>
        <View style={styles.rightColumn}>
          
            <TouchableOpacity style={[styles.card2]}> {/*(190/95)*/}
              <Text style={styles.label}>{'AI Advisory'}</Text>
              <Image
                source={require('../assets/images/ai.png')}
                style={[styles.icon, { alignSelf: 'flex-end', marginTop: 4 }]}
              />
            </TouchableOpacity>
            <ServiceCard title="My Score" Icon={ScoreIcon} style={{ flex: 95}} />
        </View>
      </View>
    </View>
  );
};
export default Services;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#6929C41A', 
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D1BDED',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card2: {
    backgroundColor: '#6929C41A',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D1BDED',
    padding: 12,
  },
  icon: {
    width: '80%',
    aspectRatio: 1,
    resizeMode: 'contain',
  },
  label: {
    fontFamily: 'Inter-Medium',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 14,
    letterSpacing: 0,
    color: '#4506A0',
  },
  servicesGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
    alignItems: 'stretch',
    gap: 6,
    flex: 1,
  },
  leftColumn: {
    flex: 1,
    gap: 6,
  },
  rightColumn: {
    flex: 1,
    gap: 6,
  },
});