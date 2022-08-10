import React, {useState } from 'react';
import { StyleSheet, Text, Button, View } from 'react-native';

const Calculator = ({player1, player2}) => {
  const [results, setResults] = useState({rollResults:[]})


  // The Big Comparison
  const compareRolls = (player1, player2, p1Rolls, p2Rolls) => {
    let p1Successes = p1Rolls.filter((r)=>{return r <= player1.bs})
    let p2Successes = p2Rolls.filter((r)=>{return r <= player2.bs})

    // let p1Successes = [12, 2]
    // let p2Successes = [5]
    let p1Unblocked = []
    let p2Unblocked = []


    // Skip process if both players whiff
    if(p1Successes.length < 1 && p2Successes < 1){
      return {p1Successes, p2Successes}
    }


    // Seperate Crits
    let p1Crits = p1Successes.filter((r)=>{return r === player1.bs})
    let p2Crits = p2Successes.filter((r)=>{return r === player2.bs})
    let p1Hits = p1Successes.filter((r)=>{return r !== player1.bs})
    let p2Hits = p2Successes.filter((r)=>{return r !== player2.bs})


    // Crit cancel
    if(p1Crits.length > 0 && p2Crits.length > 0){
      return {p1Successes, p2Successes, p1Crits, p2Crits, p1Unblocked:[], p2Unblocked:[]}
    }
   

    // Find player 1's unblocked hits
    for (i=0; i<p1Hits.length; i++){
      let unblocked = true

      if(p2Crits.length > 0){
        unblocked = false
      }

      for (j=0; j<p2Hits.length; j++){
        if(p1Hits[i] <= p2Hits[j]){
          unblocked = false
        }
      }
      if(unblocked === true){
        p1Unblocked.push(p1Hits[i])
      }
    }


    // Find player 2's unblocked hits
    for (i=0; i<p2Hits.length; i++){
      let unblocked = true

      if(p1Crits.length > 0){
        unblocked = false
      }

      for (j=0; j<p1Hits.length; j++){
        if(p2Hits[i] <= p1Hits[j]){
          unblocked = false
        }
      }
      if(unblocked === true){
        p2Unblocked.push(p2Hits[i])
      }
    }

    // Push crits to unblocked
    for(i = 0; i < p1Crits.length; i++){
      p1Unblocked.push(p1Crits[i])
    }
    for(i = 0; i < p2Crits.length; i++){
      p2Unblocked.push(p2Crits[i])
    }


    return {p1Successes, p2Successes, p1Crits, p2Crits, p1Unblocked, p2Unblocked}
  }


  // Damage calculating function
  const damageFunction = (player1, player2, rollResults) => {
    if(!rollResults.p1Unlocked && !rollResults.p2Unblocked){
      return 'backup error'
    }

    // Roll saves
    let max = Math.floor(21)
    let min = Math.ceil(1)
    let savingRolls = []
    let unsavedDamage = {player: 'none', damage: 0}
    let unsavedHits = []

    if(rollResults.p1Unblocked.length > 0){
      for(let i = 0; i < rollResults.p1Unblocked.length; i++){
        savingRolls.push(Math.floor(Math.random() * (max - min) + min));
      }
      unsavedHits = savingRolls.filter((r)=> {return r <= player1.dam - player2.arm})
      unsavedDamage = {player: "Player2", damage: unsavedHits.length}
    } else if(rollResults.p2Unblocked.length > 0) {
      for(let i = 0; i < rollResults.p2Unblocked.length; i++){
        savingRolls.push(Math.floor(Math.random() * (max - min) + min));
      }
      unsavedHits = savingRolls.filter((r)=> {return r <= player2.dam - player1.arm})
      unsavedDamage = {player: "Player1", damage: unsavedHits.length}
    } else {
      return "error"
    }

    return {savingRolls, unsavedHits, unsavedDamage}
  }



  // Master function
  const calcFunction = (player1, player2) => {

    // Roll the dice
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


    // Compare the dice
    let rollResults = compareRolls(player1, player2, profile1Rolls, profile2Rolls)

    // Calculate damage if applicable
    let damageResults
    if(rollResults.p1Unblocked && rollResults.p1Unblocked.length > 0 || rollResults.p2Unblocked && rollResults.p2Unblocked.length > 0){
      damageResults = damageFunction(player1, player2, rollResults)
      // damageResults = 'Could be damage!'
    } else {
      damageResults = {savingRolls:[], unsavedHits:[], unsavedDamage:0}
    }

    // Set state for all the things
    setResults({profile1Rolls, profile2Rolls, rollResults, damageResults})
  }

  

  // Display
  return (
    <View style={styles.container}>
      <Button onPress={()=> calcFunction(player1, player2)} title="Run"/>
      <Text>Player 1's Roll:{JSON.stringify(results.profile1Rolls)}</Text>
      <Text>Player 2's Roll:{JSON.stringify(results.profile2Rolls)}</Text>
      <Text></Text>
      <Text>Player 1's Successes:{results.rollResults.p1Unblocked ? JSON.stringify(results.rollResults.p1Unblocked) : "[]"}</Text>
      <Text>Player 2's Successes:{results.rollResults.p2Unblocked ? JSON.stringify(results.rollResults.p2Unblocked) : "[]"}</Text>
      <Text></Text>
      <Text>Saving Roll: {results.damageResults ? JSON.stringify(results.damageResults.savingRolls) : "[]"}</Text>
      <Text>Failed Saves: {results.damageResults ? JSON.stringify(results.damageResults.unsavedHits) : "[]"}</Text>
      <Text>{JSON.stringify(results.damageResults)}</Text>
      <Text> ------------------- </Text>
      <Text></Text>
      <Text>Raw Data: {JSON.stringify(results)}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default Calculator;