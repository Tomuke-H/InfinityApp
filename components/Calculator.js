import React, {useState } from 'react';
import { Text, Button, View } from 'react-native';

const Calculator = ({player1, player2}) => {
  const [results, setResults] = useState({rollResults:[]})

  const compareRolls = (player1, player2, p1Rolls, p2Rolls) => {
    let p1Successes = p1Rolls.filter((r)=>{return r <= player1.bs})
    let p2Successes = p2Rolls.filter((roll)=>{return roll <= player2.bs})

    if(p1Successes.length < 1){
      return p2Successes.length > 0 ? p2Successes : "whiff"
    } else if (p2Successes.length < 1) {
      return p1Successes.length > 0 ? p1Successes : "whiff"
    } 

    let p1Unblocked = []
    for (i=0; i<p1Successes.length; i++){
      let unblocked = true
      for (j=0; j<p2Successes.length; j++){
        if(p1Successes[i] <= p2Successes[j]){
          unblocked = false
        }
      }
      if(unblocked === true){
        p1Unblocked.push(p1Successes[i])
      }
    }

    let p2Unblocked = []
    for (i=0; i<p2Successes.length; i++){
      let unblocked = true
      for (j=0; j<p1Successes.length; j++){
        if(p2Successes[i] <= p1Successes[j]){
          unblocked = false
        }
      }
      if(unblocked === true){
        p2Unblocked.push(p2Successes[i])
      }
    }

    // let p2Unblocked = []
    // for (i=0; i<p2Successes.length; i++){
    //   for (j=0; j<p1Successes.length; j++){
    //     if(p2Successes[i] > p1Successes[j]){
    //       p2Unblocked.push(p2Successes[i])
    //     }
    //   }
    // }


    return {p1Successes, p2Successes, p1Unblocked:p1Unblocked, p2Unblocked:p2Unblocked}
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
      <Text>Player 1's Roll:{JSON.stringify(results.profile1Rolls)}</Text>
      <Text>Player 2's Roll:{JSON.stringify(results.profile2Rolls)}</Text>
      <Text>Player 1's Unblocked Roll:{results.rollResults.p1Unblocked ? JSON.stringify(results.rollResults.p1Unblocked) : "[]"}</Text>
      <Text>Player 2's Unblocked Roll:{results.rollResults.p2Unblocked ? JSON.stringify(results.rollResults.p2Unblocked) : "[]"}</Text>
      <Text>Raw Data: {JSON.stringify(results)}</Text>
    </View>
  )
}

export default Calculator;