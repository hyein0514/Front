import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CalendarPage from './src/Calendar/CalendarPage';
import DiaryPage from './src/Diary/DiaryPage';
import {  ContentRoutes,CalendarRoutes } from './src/Navigations/Routes';
import ContentTab from './src/Navigations/ContentTap';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer independent = {true}>
      <Stack.Navigator initialRouteName="Calendar">
        <Stack.Screen name="Calendar" component={CalendarPage} />
        <Stack.Screen name="Diary" component={DiaryPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// const App = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen name={ContentRoutes.HOME} component={ContentTab} />
//         <Stack.Screen name={CalendarRoutes.CALENDAR} component={CalendarPage} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

export default App;