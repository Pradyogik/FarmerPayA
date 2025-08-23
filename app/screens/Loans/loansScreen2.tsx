import {
  Dimensions,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CustomText from '../../utils/customs/customText';
import ArrowCircleBackIcon from '../../utils/customs/IconsCompo/backArrowCompo';
import KccIcon from '../../assets/images/Loans/loanMainScr/kcc.svg';
import ContractFarmingIcon from '../../assets/images/Loans/loanMainScr/ContractFarming.svg';
import CropInsuranceIcon from '../../assets/images/Loans/loanMainScr/CropInsurance.svg';
import PostHarvestIcon from '../../assets/images/Loans/loanMainScr/PostHarvest.svg';
import PreHarvestIcon from '../../assets/images/Loans/loanMainScr/PreHarvest.svg';
import SeasonalCropIcon from '../../assets/images/Loans/loanMainScr/Seasonalcrop.svg';
import OrganicFarmingIcon from '../../assets/images/Loans/loanMainScr/organicFarming.svg';

//Mechaniztion Icons
import TractorIcon from '../../assets/images/Loans/Mechanization/tractor.svg';
import PowerTillerIcon from '../../assets/images/Loans/Mechanization/PowerTiller.svg';
import CustomHiringEquipmentIcon from '../../assets/images/Loans/Mechanization/customHiringEquipment.svg';
import MultiPurposeFarmIcon from '../../assets/images/Loans/Mechanization/multiPurposeFarm.svg';
import SecondHandEquipmentIcon from '../../assets/images/Loans/Mechanization/secondHandEquip.svg';
import ThresherIcon from '../../assets/images/Loans/Mechanization/thresher.svg';

//LiveStock,Dairy & Poultry Icons
import DairyFarmIcon from '../../assets/images/Loans/LivestockDairy/DairyFarm.svg';
import CattlePurchaseIcon from '../../assets/images/Loans/LivestockDairy/CattlePurchase.svg';
import FeedFodderIcon from '../../assets/images/Loans/LivestockDairy/FeedFodder.svg';
import GoatIcon from '../../assets/images/Loans/LivestockDairy/Goat.svg';
import LiveStockIcon from '../../assets/images/Loans/LivestockDairy/Livestock.svg';
import MilkColletionIcon from '../../assets/images/Loans/LivestockDairy/MilkCollection.svg';
import PigFarmingIcon from '../../assets/images/Loans/LivestockDairy/PigFarming.svg';
import PoultryFarmIcon from '../../assets/images/Loans/LivestockDairy/PoultryFarm.svg';
import VeterinaryIcon from '../../assets/images/Loans/LivestockDairy/veterinaryEquipment.svg';

import { SvgProps } from 'react-native-svg';
const { height, width } = Dimensions.get('window');
interface headingProps {
  text: string;
}
interface optionsProps {
  Icon: React.FC<SvgProps>;
  text: string;
  onPress?: () => void;
  navigation?: any;
}
const LoansHeading: React.FC<headingProps> = ({ text }) => {
  return (
    <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
      <CustomText
        size={18.36}
        weight={500}
        letterSpacing={-0.8}
        color="#3F1976"
      >
        {text}
      </CustomText>
      <View style={{ height: 1, flex: 1, backgroundColor: '#DFDFDF' }} />
    </View>
  );
};

const LoanOptions: React.FC<optionsProps> = ({
  Icon,
  text,
  navigation,
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ width: 109, alignItems: 'center', justifyContent: 'center' }}
    >
      <View
        style={{
          backgroundColor: '#F8F2FF',
          width: 57,
          height: 57,
          padding: 6,
          borderRadius: 54,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon />
      </View>
      <CustomText
        weight={500}
        size={12}
        letterSpacing={-0.56}
        color={'#4506A0'}
        numberOfLines={2}
        ellipsizeMode="tail"
        style={{ textAlign: 'center' }}
      >
        {text}
      </CustomText>
    </TouchableOpacity>
  );
};
const loansScreen2 = ({ navigation }: any) => {
  return (
    <View style={{ padding: 16, flex: 1, backgroundColor: '#ffffff',paddingTop:StatusBar.currentHeight || 40 }}>
      <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
        <ArrowCircleBackIcon />
        <CustomText
          size={26}
          weight={500}
          letterSpacing={-1.04}
          color="#3F1976"
        >
          Loans
        </CustomText>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: 16, paddingTop: 16, paddingBottom: 100 }}
      >
        <View>
          <LoansHeading text={'Crop Loans'} />
          <View
            style={{
              flexDirection: 'row',
              width: width - 32,
              flexWrap: 'wrap',
              gap: 16,
              paddingTop: 16,
            }}
          >
            <LoanOptions
              Icon={KccIcon}
              text={'Kisan Credit Card (kcc)'}
              onPress={() => {
                navigation.navigate('CropLoans');
              }}
              navigation={navigation}
            />
            <LoanOptions
              Icon={SeasonalCropIcon}
              text={'Seasonal Crop Production Loan'}
            />
            <LoanOptions
              Icon={PreHarvestIcon}
              text={'Pre-Harvest  Capital Loan'}
            />
            <LoanOptions
              Icon={PostHarvestIcon}
              text={'Post-Harvest Marketing Loan'}
            />
            <LoanOptions
              Icon={CropInsuranceIcon}
              text={'Crop Insurance-Linked Loan'}
            />
            <LoanOptions
              Icon={ContractFarmingIcon}
              text={'Contract Farming Loan'}
            />
            <LoanOptions
              Icon={OrganicFarmingIcon}
              text={'Organic Farming Loan'}
            />
          </View>
        </View>
        <View>
          <LoansHeading text="Mechanization & Equipment" />
          <View
            style={{
              flexDirection: 'row',
              width: width - 32,
              flexWrap: 'wrap',
              gap: 16,
              paddingTop: 16,
            }}
          >
            <LoanOptions Icon={TractorIcon} text={'Tractor Loans'} />
            <LoanOptions Icon={PowerTillerIcon} text={'Power Tiller Loans'} />
            <LoanOptions
              Icon={ThresherIcon}
              text={'Thresher & Harvester Loans'}
            />
            <LoanOptions
              Icon={MultiPurposeFarmIcon}
              text={'Multi-purpose Farm Equipment'}
            />
            <LoanOptions
              Icon={CustomHiringEquipmentIcon}
              text={'Custom Hiring Equipment'}
            />
            <LoanOptions
              Icon={SecondHandEquipmentIcon}
              text={'Second-hand Equipment Loan'}
            />
          </View>
        </View>
        <View>
          <LoansHeading text="Livestock, Dairy & Poultry" />
          <View
            style={{
              flexDirection: 'row',
              width: width - 32,
              flexWrap: 'wrap',
              gap: 16,
              paddingTop: 16,
            }}
          >
            <LoanOptions Icon={DairyFarmIcon} text={'Dairy Farm Loans'} />
            <LoanOptions
              Icon={CattlePurchaseIcon}
              text={'Cattle Purchase Loans'}
            />
            <LoanOptions Icon={PoultryFarmIcon} text={'Poultry Farm Setup'} />
            <LoanOptions Icon={GoatIcon} text={'Goat & Sheep Rearing'} />
            <LoanOptions Icon={PigFarmingIcon} text={'Pig Farming Loans'} />
            <LoanOptions
              Icon={LiveStockIcon}
              text={'Livestock Insurance Linked'}
            />
            <LoanOptions Icon={FeedFodderIcon} text={'Feed & Fodder Loans'} />
            <LoanOptions Icon={VeterinaryIcon} text={'Veterinary Equipment'} />
            <LoanOptions
              Icon={MilkColletionIcon}
              text={'Milk Collection Centers'}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default loansScreen2;
