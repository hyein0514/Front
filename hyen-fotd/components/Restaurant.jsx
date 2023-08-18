import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: 373,
    height: 49,
    left: 18,
    top: 79,
  },
  location: {
    fontFamily: 'Noto Sans',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 15,
    lineHeight: 20,
    color: '#C75100',
  },
  name: {
    fontFamily: 'Noto Sans',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 15,
    lineHeight: 20,
    color: '#C75100',
  },
});

const Restaurant = ({ store }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.location}>{store.location}</Text>
      <Text style={styles.name}>{store.store_name}</Text>
    </View>
  );
};

export default Restaurant;
