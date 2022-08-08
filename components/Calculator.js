import React, {useState } from 'react';
import { Text, Button, View } from 'react-native';

const Calculator = ({player1, player2}) => {
  const [results, setResults] = useState({})

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

  // calcFunction(player1, player2)
  return (
    <View>
      <Button onPress={()=> calcFunction(player1, player2)} title="Run"/>
      <Text>{JSON.stringify(results)}</Text>
    </View>
  )
}

export default Calculator;