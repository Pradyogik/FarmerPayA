import { FlatList, StatusBar, View } from 'react-native';
import ArrowCircleBackIcon from '../../utils/customs/IconsCompo/backArrowCompo';
import CustomText from '../../utils/customs/customText';
import CentralKishan from '../../assets/images/Loans/CropLoansScrIcons/CentralKishan.svg';
import Kcc from '../../assets/images/Loans/CropLoansScrIcons/kcc.svg';
import Bob from '../../assets/images/Loans/CropLoansScrIcons/bob.svg';
import Sbi from '../../assets/images/Loans/CropLoansScrIcons/sbi.svg';
import { SvgProps } from 'react-native-svg';
interface bankItemProps {
  bankName: string;
  loanSchemeName: string;
  amount?: string;
  tenure?: string;
  SchemeIcon: React.FC<SvgProps>;
}
const loans: bankItemProps[] = [
  {
    bankName: 'Bank Of Baroda',
    loanSchemeName: 'Kishan Credit Card',
    amount: '5000',
    tenure: '30',
    SchemeIcon: Kcc,
  },
  {
    bankName: 'Mannapuram Gold',
    loanSchemeName: 'Central Kishan Cr..',
    amount: '5000',
    tenure: '30',
    SchemeIcon: CentralKishan,
  },
  {
    bankName: 'Bank Of baroda',
    loanSchemeName: 'BOB KCC',
    amount: '5000',
    tenure: '30',
    SchemeIcon: Bob,
  },
  {
    bankName: 'State Bank Of India',
    loanSchemeName: 'SBI Kishan Credit..',
    amount: '5000',
    tenure: '30',
    SchemeIcon: Sbi,
  },
  {
    bankName: 'Bank Of baroda',
    loanSchemeName: 'Kishan Credit Card',
    amount: '5000',
    tenure: '30',
    SchemeIcon:Kcc,
  },
];
const BankCreditCards: React.FC<bankItemProps> = ({
  bankName,
  loanSchemeName,
  amount = '5000',
  tenure = '30',
  SchemeIcon,
}) => {
  return (
    <View
      style={{
        borderColor: '#865DFF33',
        borderRadius: 12,
        borderWidth: 1,
        padding: 16,
        gap: 8,
      }}
    >
      <View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <CustomText weight={600} letterSpacing={-0.72} color={'#4506A0'}>
            {loanSchemeName}
          </CustomText>
          <CustomText
            color="#54219D"
            size={12}
            weight={500}
            letterSpacing={-0.48}
          >
            Quick Loan - Salaried
          </CustomText>
        </View>
        <CustomText
          color="#54219D"
          weight={500}
          size={12}
          letterSpacing={-0.48}
        >
          {bankName}
        </CustomText>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <View>
          <View style={{ flexDirection: 'row', gap: 6, alignItems: 'center' }}>
            <CustomText weight={500} size={11.35} letterSpacing={-0.48}>
              Up To
            </CustomText>
            <CustomText
              color="#FFA500"
              size={22.44}
              weight={600}
              letterSpacing={-0.96}
            >
              ₹ {amount}/-
            </CustomText>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <CustomText
              weight={600}
              size={13.74}
              letterSpacing={-0.56}
              color="#865DFF"
            >
              Apply Now {'>'}
            </CustomText>
            <CustomText weight={500} size={11.32} letterSpacing={-0.48}>
              Tenure up to {tenure} Days
            </CustomText>
          </View>
        </View>
        <SchemeIcon />
      </View>
    </View>
  );
};
const CropLoans = () => {
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
      <FlatList
        data={loans}
        contentContainerStyle={{ paddingVertical: 16, gap: 12 }}
        showsVerticalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        renderItem={item => {
          return (
            <BankCreditCards
              loanSchemeName={item.item.loanSchemeName}
              bankName={item.item.bankName}
              amount={item.item.amount}
              tenure={item.item.tenure}
              SchemeIcon={item.item.SchemeIcon}
            />
          );
        }}
      />
    </View>
  );
};

export default CropLoans;
