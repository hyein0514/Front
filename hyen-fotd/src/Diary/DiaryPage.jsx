import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const DiaryPage = ({ route }) => {
  const [diaryText, setDiaryText] = useState('');
  const { selectedDate } = route.params;

  const saveDiary = () => {
    // 여기서 일기 저장 로직을 구현합니다.
    // 예를 들어, 선택된 날짜와 일기 내용을 저장할 수 있습니다.
    // 저장 후 원하는 동작을 수행하거나 알림을 표시할 수 있습니다.
  };

  return (
    <View style={styles.container}>
      <Text style={styles.dateText}>{selectedDate}</Text>
      <TextInput
        multiline
        placeholder="일기를 작성하세요..."
        value={diaryText}
        onChangeText={setDiaryText}
        style={styles.input}
      />
      <Button title="일기 저장" onPress={saveDiary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 20,
    marginBottom: 10,
  },
  input: {
    width: '100%',
    height: 150,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
});

export default DiaryPage;
