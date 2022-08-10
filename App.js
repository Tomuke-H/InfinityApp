import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
// import useCalculator from './hooks/useCalculator.js'
import Calculator from './components/Calculator.js';
import React, {useState} from 'react'

const fakeProfile1 = {bs: 12, burst: 3, arm: 1, dam:13}
const fakeProfile2 = {bs: 13, burst: 1, arm: 2, dam:14}

export default function App() {

  return (
    <View style={styles.container}>
      <Text>Infinity Calculator App</Text>
      <Text>Player 1: BS 12, Burst 3, Arm 1, Dam 13</Text>
      <Text>Player 2: BS 13, Burst 1, Arm 2, Dam 14</Text>
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
