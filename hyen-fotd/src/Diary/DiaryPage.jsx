import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { launchImageLibrary } from 'react-native-image-picker';
import * as Permissions from 'expo-permissions';
import ContentTab from '../Navigations/ContentTap';

const DiaryPage = () => {
  const [selectedDate, setSelectedDate] = useState('');
   const [selectedEmoticonMood, setSelectedEmoticonMood] = useState('');
  const [selectedEmoticonFood, setSelectedEmoticonFood] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [diaryContent, setDiaryContent] = useState('');
  const [savedEntries, setSavedEntries] = useState([]);

 const handleEmoticonSelect = (emoticon, category) => {
    if (category === 'mood') {
      setSelectedEmoticonMood(emoticon);
    } else if (category === 'food') {
      setSelectedEmoticonFood(emoticon);
    }
  };
  const moodEmoticons = ['😃', '😐', '😢', '😠'];
const foodEmoticons = ['🍚', '🍜', '🍔', '🍰', '🍞', '🥤'];


useEffect(() => {
  requestPermissions();
}, []);

const requestPermissions = async () => {
  const { status } = await Permissions.askAsync(
    Permissions.CAMERA,
    Permissions.MEDIA_LIBRARY
  );

  if (status !== 'granted') {
    console.error('Permission denied');
  }
};

const handleImageSelect = async () => {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync(); // 권한 요청 방식 변경

  if (status !== 'granted') {
    console.error('Permission denied');
    return;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (!result.cancelled) {
    setSelectedImage(result.uri);
  }
};


  const handleSave = () => {
    const newEntry = {
      selectedDate,
      selectedEmoticonMood,
      selectedEmoticonFood,
      selectedImage,
      diaryContent,
    };
    setSavedEntries([...savedEntries, newEntry]);

    setSelectedDate('');
    setSelectedEmoticonMood('');
    setSelectedEmoticonFood('');
    setSelectedImage(null);
    setDiaryContent('');
  };

  const [selectedEntry, setSelectedEntry] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false); // 모달의 표시 여부 상태

  const handleOpenModal = (entry) => {
    setSelectedEntry(entry); // 선택한 일기 정보 저장
    setIsModalVisible(true); // 모달 열기
  };

  const handleCloseModal = () => {
    setSelectedEntry(null); // 선택한 일기 정보 초기화
    setIsModalVisible(false); // 모달 닫기
  };
  return (
    <View style={styles.container}>
      <ScrollView style={styles.diaryContainer}>

        <View style={styles.chatContainer}>
          <TextInput
            placeholder="날짜를 입력하세요"
            style={styles.chatInput}
            value={selectedDate}
            onChangeText={setSelectedDate}
          />
        </View>

          
        <View style={styles.photoContainer}>
          <View style={styles.selectedImageContainer}>
            {selectedImage ? (
              <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
            ) : null}
          </View>
          <TouchableOpacity style={styles.selectImageButton} onPress={handleImageSelect}>
            <Text style={styles.selectImageText} >사진 선택</Text>
          </TouchableOpacity>
        </View>
        
        

         
       <View style={styles.emoticonCategory}>
  <Text style={styles.emoticonCategoryTitle}>기분</Text>
  <View style={styles.emoticonRow}>
    {moodEmoticons.map((emoticon) => (
      <TouchableOpacity
        key={emoticon}
        style={[
          styles.emoticonButton,
          selectedEmoticonMood === emoticon && styles.selectedEmoticonButton,
        ]}
        onPress={() => handleEmoticonSelect(emoticon, 'mood')}
      >
        <Text style={styles.emoticonButtonText}>{emoticon}</Text>
      </TouchableOpacity>
    ))}
  </View>
</View>

<View style={styles.emoticonCategory}>
  <Text style={styles.emoticonCategoryTitle}>음식</Text>
  <View style={styles.emoticonRow}>
    {foodEmoticons.map((emoticon) => (
      <TouchableOpacity
        key={emoticon}
        style={[
          styles.emoticonButton,
          selectedEmoticonFood === emoticon && styles.selectedEmoticonButton,
        ]}
        onPress={() => handleEmoticonSelect(emoticon, 'food')}
      >
        <Text style={styles.emoticonButtonText}>{emoticon}</Text>
      </TouchableOpacity>
    ))}
  </View>
</View>


        {/* 일기 내용 창 */}
        <View style={styles.diaryContentContainer}>
          <TextInput
            placeholder="내용을 작성해주세요."
            multiline
            style={styles.diaryContentInput}
            value={diaryContent}
            onChangeText={setDiaryContent}
          />
        </View>
        
       {/* 저장하기 버튼 */}
       <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>저장하기</Text>
        </TouchableOpacity>

     
      {/* 저장된 일기 출력 */}
      {savedEntries.map((entry, index) => (
          <View key={index} style={[styles.savedEntryContainer, styles.whiteBox]}>
            <TouchableOpacity onPress={() => handleOpenModal(entry)}>
              {/* 모달 열기 버튼 */}
              <Text style={styles.savedDateText}>날짜: {entry.selectedDate}</Text>
            </TouchableOpacity>
          </View>
        ))}


           {/* 모달 */}
        <Modal visible={isModalVisible} transparent={true} animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {selectedEntry && (
                <>
                  <Text style={styles.modalDateText}>날짜: {selectedEntry.selectedDate}</Text>
                  {/* 모달에 선택한 일기 정보 출력 */}
                  <View style={styles.modalImageContainer}>
                    {selectedEntry.selectedImage ? (
                      <Image source={{ uri: selectedEntry.selectedImage }} style={styles.modalImage} />
                    ) : null}
                  </View>
                  <Text style={styles.modalEmoticons}>
                    기분: {selectedEntry.selectedEmoticonMood}, 음식: {selectedEntry.selectedEmoticonFood}
                  </Text>
                  <Text style={styles.modalDiaryContent}>{selectedEntry.diaryContent}</Text>
                  <TouchableOpacity style={styles.closeModalButton} onPress={handleCloseModal}>
                    <Text style={styles.closeModalButtonText}>닫기</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
        </Modal>
        <ContentTab />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF3EB',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  diaryContainer: {
    flex: 1,
     marginTop: 20,
  },
   chatContainer: {
    backgroundColor: 'white', // 날짜 창 배경색
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    marginBottom: 10,
  },
  chatInput: {
    color: '#CB5B0F',
  },
  photoContainer: {
    backgroundColor: '#FFF3EB', 
    alignSelf: 'flex-end',
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 20,
  },
  selectedImageContainer: {
    backgroundColor: '#FFF3EB',
    width: 200,
    height: 170,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectImageText: {
    color: 'white', 
  },
  selectedImage: {
    width: 200,
    height: 150,
    borderRadius: 30,
  },
  selectImageButton: {
    backgroundColor: '#F97316',
    borderRadius: 10,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 30,
  },
  emoticonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  
  emoticonCategory: {
    flex: 1,
  },
  emoticonCategoryTitle: {
    color: '#CB5B0F',
    marginBottom: 5,
  },
  // 이모티콘 창 스타일
emoticonCategory: {
    maxWidth: '100%',
     maxHeight: '30%'
  // 이모티콘 창의 최대 너비를 50%로 설정
},

  emoticonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  emoticonButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#CB5B0F',
    borderRadius: 10,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedEmoticonButton: {
    backgroundColor: '#CB5B0F',
  },
  emoticonButtonText: {
    fontSize: 20,
  },
 diaryContentContainer: {
    backgroundColor: 'white', // 일기 작성 창 배경색
    borderRadius: 10,
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
    marginTop: 20,
  },
  diaryContentInput: {
    flex: 1,
    color: '#CB5B0F',
  },
saveButton: {
  backgroundColor: '#F97316',
  borderRadius: 30,
  width: 327,
  height: 44,
  alignItems: 'center',
  justifyContent: 'center',
  alignSelf: 'center',
  marginBottom: 80 , // 버튼을 위로 40px 이동
},
  saveButtonText: {
    color: 'white',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },
  modalDateText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  closeModalButton: {
    marginTop: 20,
    alignSelf: 'flex-end',
  },
  closeModalButtonText: {
    color: '#007AFF',
    fontSize: 16,
  },
  whiteBox: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  modalImageContainer: {
    backgroundColor: 'white',
    width: '100%',
    height: 200,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  modalImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  
});

export default DiaryPage;