import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import Shoot from './components/Shoot.js';
import React from 'react'

export default function App() {

  return (
    <View style={styles.container}>
      <Text>Infinity Calculator App</Text>
      <Shoot/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
