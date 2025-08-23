import React from 'react';
import { Dimensions, FlatList, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const { height, width } = Dimensions.get('window');
import BackArrow from '../../assets/images/Profile/backArrow.svg';
import InfoIcon from '../../assets/images/Profile/infoIcon.svg';
import CustomText from '../../utils/customs/customText';
import MicStar from '../../assets/images/Loans/starMic';
import KisanCreditCardIcon from '../../assets/images/Loans/kisanCreditCard.svg';
import AgriStartUpCardIcon from '../../assets/images/Loans/agriStartup.svg';
import FasalBimaYojnaCardIcon from '../../assets/images/Loans/fasalBimaYojna.svg';
import NationalAgriculturalCardIcon from '../../assets/images/Loans/nationalAgriculturalMarket.svg';
import PanchayatiRajCardIcon from '../../assets/images/Loans/panchayatiRajInstitutions.svg';
import PradhanMantriKisanCardIcon from '../../assets/images/Loans/pradhanMantriKisanSammanNidhi.svg';
import RuralInfrastructureCardIcon from '../../assets/images/Loans/ruralInfrastructureDevelopmentFund.svg';
import SoilHealthCardIcon from '../../assets/images/Loans/soilHealthCard.svg';
import { SvgProps } from 'react-native-svg';
const creditCards: creditCardProps[] = [
  {
    Icon: KisanCreditCardIcon,
    text: 'Kisan Credit Card',
  },
  {
    Icon: PradhanMantriKisanCardIcon,
    text: 'Pradhan Mantri Kisan Samman Nidhi',
  },
  { Icon: SoilHealthCardIcon, text: 'Soil Health Card' },
  { Icon: FasalBimaYojnaCardIcon, text: 'Fasal Bima Yojana' },
  { Icon: NationalAgriculturalCardIcon, text: 'National Agricultural Market' },
  {
    Icon: RuralInfrastructureCardIcon,
    text: 'Rural Infrastructure Development Fund',
  },
  { Icon: AgriStartUpCardIcon, text: 'Agri-Startup Scheme' },
  { Icon: PanchayatiRajCardIcon, text: 'Panchayati Raj Institutions' },
];
interface creditCardProps {
  Icon: React.FC<SvgProps>;
  text: string;
}
const CreditCardItem: React.FC<creditCardProps> = ({ Icon, text }) => {
  return (
    <TouchableOpacity style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
      <Icon />
      <CustomText
        weight={500}
        color="#252525"
        size={14}
        lineHeight={21}
        style={{ width: width - 90 }}
      >
        {text}
      </CustomText>
    </TouchableOpacity>
  );
};
const loanScreen1 = () => {
  return (
    <LinearGradient
      colors={['#4506A0', '#6929C4']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={{ flex: 1 }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 16,
          alignItems: 'center',
          elevation: 4,
          shadowColor: '#fff',
          height: height * 0.08,
        }}
      >
        <View style={{ flexDirection: 'row', gap: 12 }}>
          <BackArrow />
          <CustomText color="#fff">Loans</CustomText>
        </View>
        <InfoIcon />
      </View>
      <View
        style={{
          flex: 1,
          borderTopStartRadius: 32,
          borderTopEndRadius: 32,
          backgroundColor: '#fff',
          paddingHorizontal: 16,
          paddingVertical: 24,
        }}
      >
        <View style={{ gap: 16 }}>
          <View
            style={{
              paddingHorizontal: 12,
              paddingVertical: 6,
              backgroundColor: '#F2F2F2',
              borderColor: '#C0C0C0',
              borderWidth: 1,
              borderRadius: 12,
              flexDirection: 'row',
              gap: 12,
              alignItems: 'center',
            }}
          >
            <MicStar />
            <CustomText color="#A2A2A2" size={12} lineHeight={18}>
              Search according to your need
            </CustomText>
          </View>
          <CustomText color="#797979">All Loans</CustomText>

          <View>
            <FlatList
              contentContainerStyle={{
                gap: 12,
                marginTop: 4,
                paddingBottom: 200,
              }}
              showsVerticalScrollIndicator={false}
              data={creditCards}
              keyExtractor={(_, index) => index.toString()} // or better: use a stable id
              renderItem={({ item }) => (
                <CreditCardItem Icon={item.Icon} text={item.text} />
              )}
            />
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

export default loanScreen1;
