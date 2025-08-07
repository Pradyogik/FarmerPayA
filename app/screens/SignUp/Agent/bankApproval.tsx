import React from "react";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import BankApprovalIcon from "../../../assets/images/agentSignUp/BankApproval.svg"
import { Image } from "react-native";
import LargeButton from '../../../utils/customs/LargeButton';

const{width , height} = Dimensions.get('window');
const BankApproval=({navigation}:any)=>{
  return (
    <View>
        <View 
            style={
                {borderColor:'#000' ,
                height:height*0.9,
                flexDirection:'column', 
                justifyContent:'center', 
                alignItems:'center',
                paddingBottom:24
            }}> 
            <BankApprovalIcon/>
        <Text style={{marginTop:16}}>Bank Approval in 24 h</Text>
        </View>
        <View >
        <LargeButton title="Start Assissting Farmers" onPress={()=>{navigation.navigate('Main')}} />
    </View>
    </View>
  );
}

export default BankApproval;