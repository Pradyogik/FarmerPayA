import React from 'react';
import {
  View,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  useWindowDimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MicIcon from '../../assets/images/MicIcon.svg'
import { Text } from 'react-native';
import ArrowIcon from "../../assets/images/Profile/ArrowButton.svg";

interface ChatInputBarProps {
  value: string;
  onChangeText?: (text: string) => void;
  onMicPress?: () => void;
  onGalleryPress?: () => void;
  navigation: any;
  onSubmitEditing?: () => void;
}

const ChatInputBar: React.FC<ChatInputBarProps> = ({
  value,
  onChangeText,
  onMicPress,
  onGalleryPress,
  navigation,
  onSubmitEditing,
}) => {
   const {height, width} = useWindowDimensions();
   const handleSubmit=()=>{
      if(onSubmitEditing) {onSubmitEditing(); return;}
      navigation.navigate('AiChat',{inputText:value});
   }
  return (
    <View style={styles.inputWrapper}>
      <LinearGradient
        colors={['#FF0000', '#FFA500']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.gradientBorder,{width:width*0.75}]}
      >
        <View style={styles.inputBar}>
          <TouchableOpacity onPress={onGalleryPress}>
            <Image
              source={require('../../assets/images/gallery-add.png')}
              style={styles.iconImg}
            />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            placeholderTextColor="#888"
            value={value}
            onChangeText={onChangeText}
            multiline={true}
            onSubmitEditing={handleSubmit}
          />          


          {value && (
                    <TouchableOpacity onPress={handleSubmit}>
             <View style={{ justifyContent:'center', alignItems:'center', borderRadius:48,paddingHorizontal:12,paddingVertical:12}}><ArrowIcon /></View>
          </TouchableOpacity>  
          )}

        </View>
      </LinearGradient>
                <TouchableOpacity onPress={onMicPress}>
            <View style={{marginHorizontal:8}}>

              <MicIcon height={70} width={70} />

            </View>

          </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection:'row',
    bottom: 20,
    marginHorizontal:8,
    
    alignItems:'center'
  },
  gradientBorder: {
    minHeight:58,
    justifyContent:'center',
    alignItems:'center',
    padding:2,
    borderRadius: 30,
    
  },
  inputBar: {
    backgroundColor: '#fff',
    borderRadius: 28,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 7,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    flex: 1,
    fontSize: 14,
    width:100,
    color: '#72777A',
    marginHorizontal: 12,
    alignSelf:'center',
    paddingTop:8
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: '#fff',
  },
  iconImg: {
    width: 30,
    height: 30,
    tintColor: '#979C9E',
    marginHorizontal: 12,
  },
});

export default ChatInputBar;
