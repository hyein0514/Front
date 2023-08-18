import React from 'react';
import { StyleSheet, View } from 'react-native';
import { BACKCARROT } from './Colors';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      {/* Text component removed */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BACKCARROT,
  },
});

export default HomeScreen;
