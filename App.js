import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
// import useCalculator from './hooks/useCalculator.js'
import Calculator from './components/Calculator.js';
import React, {useState} from 'react'

const fakeProfile1 = {bs: 12, burst: 3, arm: 1}
const fakeProfile2 = {bs: 13, burst: 1, arm: 1}

export default function App() {

  return (
    <View style={styles.container}>
      <Text>Infinity Calculator App</Text>
      <Calculator player1={fakeProfile1} player2={fakeProfile2}/>
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
