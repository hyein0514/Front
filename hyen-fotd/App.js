import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CalendarPage from './src/Calendar/CalenderPage';
import DiaryPage from './src/Diary/DiaryPage';
import RestaurantListPage from './src/Restaurant/RestaurantListPage';

// const App = () => {
//   return (
//     <View style={styles.container}>
//       <CalendarPage />
//     </View>
//   );
// };
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F5FCFF',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Calendar">
        <Stack.Screen name="Calendar" component={CalendarPage} />
        <Stack.Screen name="Diary" component={DiaryPage} />
        <Stack.Screen name="RestaurantList" component={RestaurantListPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;