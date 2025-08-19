import React ,{useState}from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StatusBar
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import CopyIcon from '../../assets/images/Profile/copy.svg';
import BackArrow from '../../assets/images/back-arrow.svg';
import Info from '../../assets/images/Profile/info.svg';
import SBIIcon from '../../assets/images/Profile/sbi.png';
import Clipboard from '@react-native-clipboard/clipboard';
import Modal from 'react-native-modal';
import PhonePeIcon from '../../assets/images/Profile/phonepe.svg';
import GPayIcon from '../../assets/images/Profile/gpay.svg';
import BHIMIcon from '../../assets/images/Profile/bhim.svg';
import PaytmIcon from '../../assets/images/Profile/paytm.svg';
import LargeButton from '../../utils/customs/LargeButton';
import colors from '../../assets/colors.tsx';

const { height } = Dimensions.get('window');

const PaymentsSettings = () => {
  const navigation = useNavigation();
  const [isVisible, setIsVisible] = useState(false);
  const [isActivate, setIsActivate] = useState(false);

  const toggleMenu = () => setIsVisible(!isVisible);
  const toggleActivate = () => setIsActivate(!isActivate);

  const handleActivate = () => {

  };

  const copyToClipboard = () => {
    Clipboard.setString('123');
    //Alert.alert('Copied', 'Farmer ID copied to clipboard.');
  };

  return (
    <LinearGradient
      colors={['#4506A0', '#6929C4']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={{ flex: 1 ,paddingTop: StatusBar.currentHeight || 40, }}
    >
      {/* Gradient Header */}
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
            <BackArrow color="#fff" width={30} height={30} />
          </TouchableOpacity>
          <Text style={styles.headerText}>Payments Settings</Text>
        </View>
        <TouchableOpacity onPress={toggleMenu}>
          <Icon name="dots-vertical" size={24} color="#fff" />
        </TouchableOpacity>
        
      </View>

      {/* Curved Content Section */}
      <View style={styles.contentContainer}>
        <ScrollView contentContainerStyle={styles.scrollContent}>

          {/*Card 1 */}
          <View style={styles.card}>
                <View style={styles.idRow}>
                  <View style={styles.rowLeft}>
                    <Text style={styles.idLabel}>UPI ID:</Text>
                    <Text style={styles.idValue}>{1234}</Text>
            
                    <TouchableOpacity onPress={copyToClipboard}>
                        <CopyIcon width={16} height={16} />
                    </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.divider} />
                <View style={styles.idRow}>
                    <View style={styles.rowLeft}>
                        <Info width={18} height={18} />
                    
                        <Text style={styles.idLabel}>UPI Number:</Text>
                        <Text style={styles.idValue}>{9578641230}</Text>
                    </View>
                    <TouchableOpacity onPress={toggleActivate}>
                        <Text style={styles.activateText}>Activate</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.divider} />
                <View style={styles.idRow}>
                    <View style={styles.rowLeft}>
                      <Info width={18} height={18} />
                      <Text style={styles.idLabel}>UPI Lite:</Text>
                      <Text style={styles.idValue}>{'Not Set'}</Text>
                    </View>
                    <TouchableOpacity onPress={toggleActivate}>
                        <Text style={styles.activateText}>Activate</Text>
                    </TouchableOpacity>
                </View>
          </View>

          {/*Card 2 */}
          <View style={styles.card}>
            <Text style={styles.Header}>Bank Accounts</Text>

            <View style={styles.divider} />

            <View style={styles.bankRow}>

              <View style={styles.bankIconCircle}>
                <Image source={SBIIcon} style={styles.bankIcon} resizeMode="contain" />
              </View>

              <View style={styles.textColumn}>
                <Text style={styles.bankName}>{'xxxx 1050'}</Text>
                <Text style={styles.accountType}>{'State Bank of India'}</Text>
              </View>

              <TouchableOpacity style={styles.manageBtn} >
                <Text style={styles.manageText}>Primary</Text>
              </TouchableOpacity>

            </View>

            <View style={styles.divider} />

            <View style={styles.bankRow}>
              <View style={styles.addIconContainer}>
                <Icon name="plus" size={20}  />
              </View>
              <View style={styles.addBank}>
                <Text style={styles.idLabel}>Add Bank Account</Text>
              </View>
            </View>
          </View>

          {/*Card 3 */}
          <View style={styles.card}>
            <Text style={styles.Header}>Add Cards</Text>

            <View style={styles.divider} />

            <View style={styles.bankRow}>
            <View style={styles.addIconContainer}>
              <Icon name="plus" size={20}  />
            </View>
            <View style={styles.addBank}>
              <Text style={styles.idLabel}>Add Card</Text>
            </View>
            </View>
          </View>

        </ScrollView>
        
        <Modal
          isVisible={isActivate}
          onBackdropPress={toggleActivate}
          style={styles.modal}
          backdropOpacity={0.3}

        >
          <View style={styles.sheet}>
            <View style={styles.dragHandle} />
            <View style={styles.divider} />

            <View style={styles.logoRow}>
              <PhonePeIcon width={32} height={32} />
              <GPayIcon  width={32} height={32} />
              <BHIMIcon  width={32} height={32} />
              <PaytmIcon  width={32} height={32} />
            </View>

            <Text style={styles.instructionText}>
              To receive money on farmerpay from any UPI app , link your mobile number
            </Text>


            <View style={styles.upiRow}>
              <Text style={styles.upiLabel}>Current UPI ID: </Text>
            <Text style={styles.upiValue}>animesh@ybl</Text>
          </View>

          
          <LinearGradient
            colors={['#326CF9', '#97EAD2', 'rgba(30, 49, 202, 0)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientLine}
          />
          <View style={styles.activateButton}>
            <LargeButton title="Activate Now"  onPress={handleActivate}/>
            </View>
          
          
        </View>              
        </Modal>

        <Modal
          isVisible={isVisible}
          onBackdropPress={toggleMenu}
          style={styles.modal}
          backdropOpacity={0.3}

        >
          <View style={styles.sheet}>
            <View style={styles.dragHandle} />
            <View style={styles.divider} />

              <TouchableOpacity style={styles.menuItem} onPress={() => {
                toggleMenu();
              }}>
                <Text style={styles.menuText}>View Spam List</Text>
              </TouchableOpacity>

              <View style={styles.divider} />
              <TouchableOpacity style={styles.menuItem} onPress={() => {
                toggleMenu();
              //  handle Unregister
              }}>
                <Text style={styles.menuText}>Unregister UPI Account</Text>
              </TouchableOpacity>
          </View>
        </Modal>
        
      </View>
    </LinearGradient>
  );
};

export default PaymentsSettings;


// Layout math
const screenWidth = Dimensions.get('window').width;
const gridPadding = 16;
const spacing = 12;
const columns = 4;
const tileWidth = (screenWidth - 2 * gridPadding - spacing * (columns - 1)) / columns;

const styles = StyleSheet.create({
    Header:{
        fontSize:14,
        color:'#656565',
        fontWeight:'700',
    },
  card: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#C0C0C0',
    padding: 16,
    marginVertical: 10,
    marginHorizontal: 20,
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopStartRadius: 32,
    borderTopEndRadius: 32,
    paddingTop: 16,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 5,
    paddingBottom: 40,
  },
   idRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    justifyContent: 'space-between',
  },
  idLabel: {
    fontSize: 14,
    color: '#1A1A1A',
    fontWeight: '600',
    marginLeft: 4,
    marginRight: 4,
  },
  idValue: {
    fontSize: 14,
    color: '#6E6E6E',
    marginRight: 4,
    
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E5E5',
    marginTop: 12,
    marginBottom:12,
  },
  activateText:{
    fontSize: 12,
    color :'#6929C4',
    alignItems:'flex-end',
  },
  rowLeft: {
  flexDirection: 'row',
  alignItems: 'center',
  flexShrink: 1,
  flexWrap: 'wrap',
},
bankRow: {
    paddingTop:12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  bankIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 18,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  bankIcon: {
    width: 36,
    height: 36,
  },
  bankName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  accountType: {
    fontSize: 12,
    color: '#777',
  },
  textColumn: {
    flex: 1,
    justifyContent: 'center',
  },
  manageBtn: {
  width: 54,
  height: 20,
  borderRadius: 20,
  backgroundColor: '#54219D',
  alignItems: 'center',         // centers horizontally
  justifyContent: 'center',     // centers vertically 
},

  manageText: {
  color: '#fff',
  fontSize: 10,
  fontWeight: '600',
  textAlign: 'center',
},
addBank:{
  paddingTop:12,
  paddingBottom:20,
  marginLeft: 12,
},
 addIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F0EAF9',
    justifyContent: 'center',
    alignItems: 'center',
  },
 modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  sheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingVertical: 16,
    paddingHorizontal:16,
  },
  dragHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#D9D9D9',
    alignSelf: 'center',
    marginBottom: 12,
  },
  menuItem: {
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor: '#F9F9F9',
    marginHorizontal: 16,
    borderRadius: 8,
  },
  menuText: {
    fontSize: 14,
    color: '#656F77',
    fontWeight: '500',
  },
  logoRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 16,
  },
  logo: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
  instructionText: {
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
    color: '#2B1580',
    marginBottom: 20,
    paddingHorizontal: 12,
  },
  upiRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  upiLabel: {
    fontSize: 14,
    color:colors.neutral[700],
    fontWeight: '400',
    fontFamily: 'Inter-Regular',
  },
  upiValue: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Inter-Regular',
    color: colors.neutral[800],
  },
  gradientLine: {
    height: 4,
    width: '90%',
    borderRadius: 4,
    marginBottom: 24,
  },
  activateButton: {
    
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  
});
