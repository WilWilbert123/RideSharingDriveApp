import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapScreen from './MapScreen';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <MapScreen />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
 marginTop:40
  },
});

export default HomeScreen;
