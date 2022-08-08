import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import useCalculator from './hooks/useCalculator.js'
import React, {useState} from 'react'

const fakeProfile1 = {bs: 12, burst: 3, arm: 1}
const fakeProfile2 = {bs: 13, burst: 1, arm: 1}

export default function App() {
  const [results, setResults] = useState({})

  const [success, setSuccess] = useState(0)
  const [profile1, setProfile1] = useState({})
  const [profile2, setProfile2] = useState({})

  const compareRolls = (player1, player2, p1Rolls, p2Rolls) => {
    let p1Successes = p1Rolls.filter((r)=>{return r <= player1.bs})
    let p2Successes = p2Rolls.filter((roll)=>{return roll <= player2.bs})
    return {p1Successes, p2Successes}
  }

  const calcFunction = (player1, player2) => {
      let max = Math.floor(21)
      let min = Math.ceil(1)

      let profile1Rolls = []
      for(let i = 0; i < player1.burst; i++){
        profile1Rolls.push(Math.floor(Math.random() * (max - min) + min));
      }

      let profile2Rolls = []
      for(let i = 0; i < player2.burst; i++){
        profile2Rolls.push(Math.floor(Math.random() * (max - min) + min));
      }

      
      let rollResults = compareRolls(player1, player2, profile1Rolls, profile2Rolls)
      setResults({profile1Rolls, profile2Rolls, rollResults})
  }

  return (
    <View style={styles.container}>
      <Text>Infinity Calculator App</Text>
      <Button onPress={()=>calcFunction(fakeProfile1, fakeProfile2)} title="Run"/>
      <Text>{JSON.stringify(results)}</Text>
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
