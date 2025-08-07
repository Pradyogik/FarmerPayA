import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from '@react-navigation/native';
import Avatar from "../../assets/images/Profile/Avatar.svg"
import QuestionIcon from "../../assets/images/Profile/questionIcon.svg"
import UpiIcon from "../../assets/images/Profile/upiIcon.svg"
import SecurityIcon from "../../assets/images/Profile/securityIcon.svg"
import LockIcon from "../../assets/images/Profile/lockIcon.svg"
import PrivacyIcon from "../../assets/images/Profile/privacyIcon.svg"

const SettingsCompo=()=>{
    const navigation = useNavigation();
    return(
        <View style={{flexDirection:'column',gap:12}}>
             <Text style={{color:'#252525' , fontSize:16, fontWeight:600}}>Settings</Text>
             <View style={{flexDirection:'row',gap:12, alignItems:'center' }}><TouchableOpacity><Avatar/></TouchableOpacity><Text style={{fontSize:14 , color:'#252525', fontWeight:500, lineHeight:28}}>Your Account</Text></View>
              <View style={{flexDirection:'row',gap:12, alignItems:'center' }}><TouchableOpacity onPress={() => navigation.navigate('HelpAndSupport')} ><QuestionIcon/></TouchableOpacity><Text style={{fontSize:14 , color:'#252525', fontWeight:500, lineHeight:28}}>Help and Support</Text></View>
              <View style={{flexDirection:'row',gap:12, alignItems:'center' }}><TouchableOpacity><UpiIcon/></TouchableOpacity><Text style={{fontSize:14 , color:'#252525', fontWeight:500, lineHeight:28}}>UPI Settings</Text></View>
              <View style={{flexDirection:'row',gap:12, alignItems:'center' }}><TouchableOpacity><SecurityIcon/></TouchableOpacity><Text style={{fontSize:14 , color:'#252525', fontWeight:500, lineHeight:28}}>Security</Text></View>
              <View style={{flexDirection:'row',gap:12, alignItems:'center' }}><TouchableOpacity><LockIcon/></TouchableOpacity><Text style={{fontSize:14 , color:'#252525', fontWeight:500, lineHeight:28}}>Report Fraud</Text></View>  
             
        </View>
    );
}

export default SettingsCompo;