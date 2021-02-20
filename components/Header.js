import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

const Header = () => (
  <View style={styles.header}>
    <Image styles={styles.text} source={require('../assets/nbA.jpeg')} />
  </View>
);

const styles = StyleSheet.create({
  header: {
    height: '12.5%',
    width: '100%',
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  text: {
    width: 50,
    height: 10
  }
});

export default Header;