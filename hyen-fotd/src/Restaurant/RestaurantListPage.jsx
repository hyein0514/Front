import React from 'react';
import { View, StyleSheet } from 'react-native';
import Restaurant from '../../components/Restaurant';
import { STORE_LIST } from '../../constants/store';

const RestaurantListPage = () => {
    return (
      <View style={styles.container}>
         {STORE_LIST.map((store, idx) => (
            <Restaurant key={`${idx}-store`} store={store} />
            ))}
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  
  export default RestaurantListPage;