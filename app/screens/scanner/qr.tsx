import React from 'react';
import { Dimensions, Text, View } from 'react-native';

import BackArrowIcon from '../../assets/images/scanner/backArrow.svg';
import DownloadIcon from '../../assets/images/scanner/downloadIcon.svg';
import ThreeDotIcon from '../../assets/images/scanner/threeDotIcon.svg';
import QrImage from '../../assets/images/scanner/qrImage.svg';
import CopyIcon from '../../assets/images/scanner/copy.svg';
import SpeakerIcon from '../../assets/images/scanner/speakerIcon.svg';
import SbiIcon from '../../assets/images/scanner/sbiIcon.svg';
import QrScannerIcon from '../../assets/images/scanner/qrScanner.svg';
import ShareIcon from '../../assets/images/scanner/shareIcon.svg';
import LinearGradient from 'react-native-linear-gradient';
import BhimIcon from '../../assets/images/scanner/bhim-square.svg';
import PhonePeIcon from '../../assets/images/scanner/phonepe-square.svg';
import GooglePayIcon from '../../assets/images/scanner/googlepay-square.svg';
import PaytmIcon from '../../assets/images/scanner/paytm-square.svg';
const{height,width}=Dimensions.get('window');
const QrScreen=()=>{
    return (<>
        <View style={{flexDirection:'column',padding:16,backgroundColor:"#3F1976" , height:height*0.9}}>

         <View style={{flexDirection:'row', justifyContent:'space-between'}}>   
            <View style={{flexDirection:'row',alignSelf:'flex-start'}}>
            <BackArrowIcon/>
            </View>
            <View style={{flexDirection:'row' , alignSelf:'flex-end'}}><DownloadIcon/><ThreeDotIcon/></View>
         </View>
         
         <View style={{justifyContent:'center',  flexDirection:'row'}}>
         <LinearGradient
            colors={['rgba(51,51,51,0.35)', 'rgba(0,0,0,0.2)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={{  width:'auto' ,borderRadius:16 ,paddingHorizontal:16,paddingVertical:16   }}
            >              
            <Text style={{fontFamily:'Inter' , fontSize:14 , color:'#fff'}}>Abhishek Agrahari</Text>
        </LinearGradient> 
        </View>
        <View style={{flexDirection:'row', justifyContent:'center'}}>  <QrImage height={300}/></View>
        <View style={{flexDirection:'row', justifyContent:'center'}}>  <SpeakerIcon/></View>
        <View style={{flexDirection:'row', justifyContent:'center', marginTop:12}}>  <Text style={{fontFamily:'Inter' , fontSize:12 , color:'#fff'}}>Scan to pay with any UPI App</Text></View>
        <View style={{flexDirection:'row', justifyContent:'center', marginTop:16, alignItems:'center'}}> <SbiIcon/> <Text style={{fontFamily:'Inter' , fontSize:10 , color:'#fff'}}>  State Bank of India - 1000</Text></View>
       
        <View style={{justifyContent:'center',  flexDirection:'row'}}>
          <LinearGradient
            colors={['rgba(51,51,51,0.35)', 'rgba(0,0,0,0.2)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={{  width:'auto' ,borderRadius:16 ,flexDirection:'row',paddingHorizontal:16,paddingVertical:16 , marginTop:16 }}
            >              
            <Text style={{fontFamily:'Inter' , fontSize:14 ,fontWeight:600, color:'#fff'}}>UPI ID: abhishek@ybl   </Text><CopyIcon/>
          </LinearGradient> 
        </View>
 
        
         <View style={{flexDirection:'row', justifyContent:'space-between'}}>   
            <LinearGradient
                colors={[
                    'rgba(239, 239, 239, 0.12)', 
                    'rgba(255, 255, 255, 0.016)'
                ]}
                start={{ x: 0.25, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{width:'auto',height:53 ,borderRadius:16 ,flexDirection:'row',paddingHorizontal:16,paddingVertical:16 , marginTop:12}}
                >
              <QrScannerIcon/><Text style={{fontFamily:'Inter' , fontSize:12 , color:'#fff'}}>Open Scanner</Text>
            </LinearGradient>
                        <LinearGradient
                colors={[
                    'rgba(239, 239, 239, 0.12)', 
                    'rgba(255, 255, 255, 0.016)'
                ]}
                start={{ x: 0.25, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{width:'auto' ,borderRadius:16 ,height:53,flexDirection:'row',paddingHorizontal:16,paddingVertical:16 , marginTop:12}}
                >
              <ShareIcon/><Text style={{fontFamily:'Inter' , fontSize:12 , color:'#fff'}}>Share QR</Text>
            </LinearGradient>
            
         </View>



        </View>
         <View style={{height:height*0.1,width:width, backgroundColor:'#fff',alignItems:'center', justifyContent:'center', flexDirection:'column',alignSelf:'flex-end'}}>
            <View style={{flexDirection:'row', gap:8,justifyContent:'space-between'}}><Text style={{color:'#252525', fontSize:12}}>Scannable on these apps: </Text><PhonePeIcon/><GooglePayIcon/><PaytmIcon/><BhimIcon/></View>
            <View style={{height:4, width:width*0.4, marginTop:32, backgroundColor:'#000'}}/>
        </View> 
         </>  
    );
}

export default QrScreen;