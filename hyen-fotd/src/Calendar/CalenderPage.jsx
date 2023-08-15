import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';

const CalendarPage = ({ navigation }) => {
  // 7월의 첫 날과 마지막 날을 계산합니다.
  const startDate = new Date('2023-07-01');
  const endDate = new Date('2023-07-31');

  const markedDates = {};
  
  // 7월의 모든 날짜를 markedDates에 추가합니다.
  const currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    const dateString = currentDate.toISOString().split('T')[0];
    markedDates[dateString] = { marked: true, dotColor: 'orange' };
    currentDate.setDate(currentDate.getDate() + 1);
  }

  const onDatePress = (date) => {
    navigation.navigate('Diary', { selectedDate: date.dateString });
  };

  const renderDayComponent = (date, item) => {
    const isToday = date.dateString === item.today.dateString;
    const isMarked = item.markedDates[date.dateString];

    return (
      

      <TouchableOpacity
      onPress={() => onDatePress(date)}
      style={[styles.dayContainer, isToday && styles.today]}
    >
      <View style={[styles.dayContainer, isToday && styles.today]}>
        <Text style={[styles.dayText, isToday && styles.todayText]}>
          {date.day}
        </Text>
        {isMarked && <View style={styles.dot} />}
      </View>
    </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Calendar
        markedDates={markedDates}
        markingType={'custom'}
        renderDay={(date) => renderDayComponent(date, markedDates)}
        theme={{
          backgroundColor: 'white',
          calendarBackground: 'white',
          textSectionTitleColor: 'brown',
          selectedDayBackgroundColor: 'orange',
          selectedDayTextColor: 'white',
          todayTextColor: 'brown',
          dayTextColor: 'lightorange',
          arrowColor: 'brown',
        }}
        current={'2023-07-01'}
        // 7월의 첫 날
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 351,
    height: 350,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  dayContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    width: 50,
    height: 50,
  },
  today: {
    backgroundColor: 'lightgrey', // 오늘 날짜 배경색
  },
  todayText: {
    fontWeight: 'bold',
  },
  dayText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'lightorange', // 연한 주황색 날짜 텍스트
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'darkorange', // 동그라미 색
    marginTop: 5,
  },
});

export default CalendarPage;
