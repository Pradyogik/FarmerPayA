import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  Animated,
} from 'react-native';
import { pick, types } from '@react-native-documents/picker';
import ArrowBack from '../../../assets/images/ArrowBack.svg';
import DeleteIcon from '../../../assets/images/agentSignUp/DeleteIcon.svg';
import RefreshIcon from '../../../assets/images/agentSignUp/refreshIcon.svg';
import Upload from '../../../assets/images/Button.svg';
import * as Progress from 'react-native-progress';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import { BASE_URL } from '../../../utils/api';
import LargeButton from '../../../utils/customs/LargeButton';

const { width,height } = Dimensions.get('window');

const UploadDocumentsScreen = ({ navigation }: any) => {
  const route = useRoute<any>();
  const {
      user_id,
      mobile,
    } = route.params;

  const [file1, setFile1] = useState<any>(null);
  const [file2, setFile2] = useState<any>(null);

  const [progress1, setProgress1] = useState(0);
  const [uploadSpeed1, setUploadSpeed1] = useState('');
  const [isUploading1, setIsUploading1] = useState(false);

  const [progress2, setProgress2] = useState(0);
  const [uploadSpeed2, setUploadSpeed2] = useState('');
  const [isUploading2, setIsUploading2] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');

  const simulateUpload = (
    fileSize: number,
    setProgressFn: (val: number) => void,
    setSpeedFn: (val: string) => void,
    setUploadingFn: (val: boolean) => void
  ) => {
    setUploadingFn(true);
    setProgressFn(0);
    setSpeedFn('');
    const start = Date.now();
    let uploaded = 0;
    const chunk = 50 * 1024;

    const timer = setInterval(() => {
      if (uploaded >= fileSize) {
        clearInterval(timer);
        setProgressFn(1);
        setSpeedFn('Upload complete!');
        setUploadingFn(false);
        return;
      }
      uploaded += chunk;
      const pct = uploaded / fileSize;
      setProgressFn(pct > 1 ? 1 : pct);

      const elapsed = (Date.now() - start) / 1000;
      const speed = ((uploaded / 1024) / elapsed).toFixed(2);
      setSpeedFn(`${speed} KB/s`);
    }, 500);
  };
  const isValidFile = (file: any) => {
  const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg'];
  const allowedExtensions = ['.pdf', '.jpg', '.jpeg'];

  const fileType = file.type?.toLowerCase() || '';
  const fileName = file.name?.toLowerCase() || '';

  return (
    allowedTypes.includes(fileType) ||
    allowedExtensions.some(ext => fileName.endsWith(ext))
  );
};

  const pickAndSimulateUpload1 = async () => {
    try {
      const [res] = await pick({ type: [types.allFiles] });
      if (!isValidFile(res)) {
        setErrorMessage('Only JPG, JPEG, or PDF files are allowed.');
        return;
      }
      setErrorMessage('');
      setFile1(res);
      simulateUpload(res.size ?? 100 * 1024, setProgress1, setUploadSpeed1, setIsUploading1);
    } catch (err: any) {
      if (err.name !== 'Cancel') {
        console.warn('Picker error:', err);
      }
    }
  };

  const pickAndSimulateUpload2 = async () => {
    try {
      const [res] = await pick({ type: [types.allFiles] });
      if (!isValidFile(res)) {
        setErrorMessage('Only JPG, JPEG, or PDF files are allowed.');
        return;
      }
      setErrorMessage('');
      setFile2(res);
      simulateUpload(res.size ?? 100 * 1024, setProgress2, setUploadSpeed2, setIsUploading2);
    } catch (err: any) {
      if (err.name !== 'Cancel') {
        console.warn('Picker error:', err);
      }
    }
  };
  

  const screenWidth = Dimensions.get('window').width;
  const translateX1 = useRef(new Animated.Value(-screenWidth)).current;
  const translateX2 = useRef(new Animated.Value(-screenWidth)).current;

  useEffect(() => {
    if (file1 && !isUploading1) {
      translateX1.setValue(-screenWidth); // reset before animating
      Animated.timing(translateX1, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [file1, isUploading1]);

  useEffect(() => {
    if (file2 && !isUploading2) {
      translateX2.setValue(-screenWidth); // reset before animating
      Animated.timing(translateX2, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [file2, isUploading2]);

  const handleSubmit = async () => {
  if (!file1 || !file2) {
    setErrorMessage('Please upload both documents.');
    return;
  }

  const formData = new FormData();
  formData.append('user_id', user_id);
  formData.append('govt_id_proof', {
    uri: file1.uri,
    type: file1.type,
    name: file1.name || 'govt_id.pdf',
  });
  formData.append('employee_id_card', {
    uri: file2.uri,
    type: file2.type,
    name: file2.name || 'employee_id.pdf',
  });

  try {
    const response = await axios.post(`${BASE_URL}/agent/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('Upload success:', response.data);
    navigation.navigate('AgentSignUp4',{user_id});
  } catch (error) {
    console.error('Upload error:', error);
    setErrorMessage('Upload failed. Please try again.');
  }
};


  return (

    <View style={styles.container}>
      {/* Top bar */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ArrowBack />
        </TouchableOpacity>
        <Text style={styles.title}>
          Upload your documents <Text style={{ color: 'red' }}>*</Text>
        </Text>
        <Text style={styles.info}>Accept JPG/PDF ≤ 5 MB</Text>
      </View>
      {errorMessage ? <Text style={{ color: 'red', textAlign: 'left' }}>{errorMessage}</Text> : null}

      <ScrollView showsVerticalScrollIndicator={false} style={{marginBottom:100}}>

        <View style={{height:height*0.35 ,backgroundColor:'#fff', elevation:2 }}>
        {/* Upload 1 */}
       
        <Text style={styles.label}>Working ID proof (Govt ID, employer card, etc.)</Text>
        {file1 && 
        <View style={styles.pillBox}>
        <View style={styles.pill}>
          <Text style={styles.pillText}>Uploaded documents</Text>
        </View></View>}
         {!file1 &&(<View>
        <TouchableOpacity style={styles.uploadBox} onPress={pickAndSimulateUpload1}>
          <Upload width={130} height={100} />
        </TouchableOpacity></View>) }

        {isUploading1 && (
          <View style={styles.progressContainer}>
            <Progress.Bar
              progress={progress1}
              width={width * 0.8}
              height={10}
              color="green"
              borderRadius={5}
              borderWidth={0}
              unfilledColor="#e0e0e0"
            />
            <Text style={styles.speedText}>{uploadSpeed1}</Text>
          </View>
        )}

        {file1 && !isUploading1 && (
          <Animated.View style={{ transform: [{ translateX:translateX1 }] }}> 
          <View style={[styles.fileCard]}>
            
            <Image source={{ uri: file1.uri }} style={styles.preview} resizeMode="cover" />
            <View style={{ flex: 1, backgroundColor:'#fff',marginLeft: 12 }}>
              <View style={{flexDirection:'row' ,alignItems:'center',justifyContent:'space-between'}}>
                <Text style={styles.fileName}>Government ID card</Text>  
                <View style={{flexDirection:'row', alignItems:'center',gap:4}}>
                 <TouchableOpacity onPress={pickAndSimulateUpload1}>
                <RefreshIcon height={20}/>      
                </TouchableOpacity>     
                <TouchableOpacity onPress={() => setFile1(null)} style={styles.crossIcon}>
                  <DeleteIcon/>
                </TouchableOpacity>
               

                </View>
              </View>
              <Text style={styles.sizeText}>Size - {(file1.size / (1024 * 1024)).toFixed(2)}MB</Text>
              <Text style={styles.successText}>Successful</Text>
            </View>
            

          </View>
          </Animated.View> 
        )}</View>

        {/* Upload 2 */}
         <View style={{height:height*0.35 ,backgroundColor:'#fff', elevation:2 }}>
      
        <Text style={styles.label}>Employee ID proof</Text> 
        {file2 && <View style={styles.pillBox}>
        <View style={styles.pill}>
          <Text style={styles.pillText}>Uploaded documents</Text>
        </View></View>} 
        {!file2 &&(<View>
        <TouchableOpacity style={styles.uploadBox} onPress={pickAndSimulateUpload2}>
          <Upload width={130} height={100} />

        </TouchableOpacity></View>)}

        {isUploading2 && (
          <View style={styles.progressContainer}>
            <Progress.Bar
              progress={progress2}
              width={width * 0.8}
              height={10}
              color="green"
              borderRadius={5}
              borderWidth={0}
              unfilledColor="#e0e0e0"
            />
            <Text style={styles.speedText}>{uploadSpeed2}</Text>
          </View>
        )}

        {file2 && !isUploading2 && (
          <Animated.View style={{ transform: [{ translateX:translateX2 }] }}> 
          <View style={styles.fileCard}>
            <Image source={{ uri: file2.uri }} style={styles.preview} resizeMode="cover" />
            <View style={{ flex: 1, backgroundColor:'#fff',marginLeft: 12 }}>
              <View style={{flexDirection:'row' ,alignItems:'center',justifyContent:'space-between'}}>
                <Text style={styles.fileName}>Employee ID card</Text>  
                <View style={{flexDirection:'row', alignItems:'center',gap:4}}>
                <TouchableOpacity onPress={pickAndSimulateUpload2}>
                <RefreshIcon height={20}/> </TouchableOpacity>         
                <TouchableOpacity onPress={() => setFile2(null)} style={styles.crossIcon}>
                 <DeleteIcon/>
                </TouchableOpacity>
                
             
                </View>
              </View>
              <Text style={styles.sizeText}>Size - {(file2.size / (1024 * 1024)).toFixed(2)}MB</Text>
              <Text style={styles.successText}>Successful</Text>
            </View>
          </View>
          </Animated.View>
        )}

       </View>
      </ScrollView>

      {/* Save button */}
      <TouchableOpacity
        style={styles.saveButton}
        onPress={handleSubmit}
        disabled={isUploading1 || isUploading2}
      >
        <Text style={styles.saveText}>
          {(isUploading1 || isUploading2) ? 'Uploading...' : 'Save'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default UploadDocumentsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFDFD',
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  header: {
    marginBottom: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#3F1976',
  },
  info: {
    fontSize: 10,
    color: '#4B5768',
    marginTop: 4,
  },
  pillBox:{    
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#54219D',
    borderRadius: 4,
    marginBottom: 16,
    backgroundColor:'#FFFFFF'},
  pill: {
    alignSelf: 'center',
    borderWidth: 1,
    backgroundColor:'#54219D',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginVertical: 16,
  },
  pillText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
  },
  label: {
    fontSize: 12,
    color: '#656F77',
    marginBottom: 8,
    marginTop: 12,
  },
  uploadBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#E4E4E4',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
  },
  orDropText: {
    marginLeft: 12,
    fontSize: 14,
    color: '#656F77',
  },
  progressContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  speedText: {
    fontSize: 12,
    marginTop: 6,
  },
  fileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  preview: {
    width: 60,
    height: 60,
    borderRadius: 6,
    backgroundColor: '#eee',
  },
  fileName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  sizeText: {
    fontSize: 12,
    color: '#656F77',
  },
  successText: {
    fontSize: 12,
    color: 'green',
    fontWeight: '600',
    marginTop: 4,
  },
  crossIcon: {
    padding: 4,
  },
  saveButton: {
    position: 'absolute',
    bottom: 32,
    left: 16,
    right: 16,
    height: 60,
    backgroundColor: '#6929C4',
    borderRadius: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});
