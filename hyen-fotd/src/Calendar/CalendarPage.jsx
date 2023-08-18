import React from 'react';
import { Calendar } from 'react-native-calendars';
import { StyleSheet, View } from 'react-native';
import ContentTab from '../Navigations/ContentTap';

function CalendarPage({ navigation }) {
  const currentDate = new Date(); 
  const currentYear = currentDate.getFullYear();
  const currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 1을 더해준 후 2자리 문자열로 변환
  const currentDay = String(currentDate.getDate()).padStart(2, '0'); // 날짜를 2자리 문자열로 변환
  const formattedCurrentDate = `${currentYear}-${currentMonth}-${currentDay}`; // 현재 날짜를 형식에 맞게 변환

  const markedDates = {
    [formattedCurrentDate]: {
      selected: true, 
    },
  };

  const handleDateSelect = (date) => {
    navigation.navigate('Diary', { selectedDate: date });
  };

  return (
    <View style={styles.container}>
      <Calendar
        style={styles.calendar}
        markedDates={markedDates}
        theme={{
          selectedDayBackgroundColor: '#009688',
          arrowColor: '#009688',
          dotColor: '#009688',
          todayTextColor: '#009688',
        }}
        onDayPress={(day) => handleDateSelect(day.dateString)}
      />
      <ContentTab />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF3EB',
    paddingTop: 100,
  },
  calendar: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
});

export default CalendarPage;
