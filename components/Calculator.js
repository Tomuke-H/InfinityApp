import React, {useState } from 'react';
import { StyleSheet, Text, Button, View } from 'react-native';

const Calculator = ({player1, player2}) => {
  const [results, setResults] = useState({aASuccess:0, rASuccess:0, aCADamage:0, aADamage:0, aCRDamage:0, aRDamage:0})
  const [counter, setCounter] = useState(0)
  const [loading, setLoading] = useState(false)


  // The Big Comparison
  const compareRolls = (player1, player2, p1Rolls, p2Rolls) => {
    let p1Successes = p1Rolls.filter((r)=>{return r <= player1.bs})
    let p2Successes = p2Rolls.filter((r)=>{return r <= player2.bs})

    let p1Crits = []
    let p2Crits = []
    let p1Unblocked = []
    let p2Unblocked = []


    // Skip process if both players whiff
    if(p1Successes.length < 1 && p2Successes < 1){
      return {p1Crits, p2Crits, p1Unblocked, p2Unblocked, p1Successes, p2Successes}
    }


    // Seperate Crits
    p1Crits = p1Successes.filter((r)=>{return r === player1.bs})
    p2Crits = p2Successes.filter((r)=>{return r === player2.bs})
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


    return {p1Crits, p2Crits, p1Unblocked, p2Unblocked, p1Successes, p2Successes}
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
      for(let i = 0; i < rollResults.p1Unblocked.length + rollResults.p1Crits.length; i++){
        savingRolls.push(Math.floor(Math.random() * (max - min) + min));
      }
      unsavedHits = savingRolls.filter((r)=> {return r <= player1.weapon.dam - player2.arm})
      unsavedDamage = {player: "reactive", damage: unsavedHits.length}
    } else if(rollResults.p2Unblocked.length > 0) {
      for(let i = 0; i < rollResults.p2Unblocked.length + rollResults.p2Crits.length; i++){
        savingRolls.push(Math.floor(Math.random() * (max - min) + min));
      }
      unsavedHits = savingRolls.filter((r)=> {return r <= player2.weapon.dam - player1.arm})
      unsavedDamage = {player: "active", damage: unsavedHits.length}
    } else {
      return "error"
    }

    return {savingRolls, unsavedHits, unsavedDamage}
  }



  const averagesCalculation = (player1, player2) => {
    let hugeArray = calcFunction(player1, player2)
    // console.log('---------------------------------------------------')
    // console.log('---------------------------------------------------')
    // console.log('---------------------------------------------------')
    console.log(hugeArray[0])
    // setResults(hugeArray)
    
    // Find average active successes
    let activeUnblocked = hugeArray.filter((r)=>r.rollResults.p1Unblocked.length > 0)
    let averageActiveSuccess = ((activeUnblocked.length/hugeArray.length) * 100).toFixed(2)
    // Find average reactive successes
    let reactiveUnblocked = hugeArray.filter((r)=>r.rollResults.p2Unblocked.length > 0)
    let averageReactiveSuccess = ((reactiveUnblocked.length/hugeArray.length) * 100).toFixed(2)
    // Find average active damage dealt
    let activeDamage = activeUnblocked.filter((r)=>r.damageResults.unsavedDamage.damage > 0)
    let averageActiveDamageArray = activeDamage.map((r)=>r.damageResults.unsavedDamage.damage)
    let averageActiveDamage = (averageActiveDamageArray.reduce((a, b)=>a+b, 0)/averageActiveDamageArray.length).toFixed(2)
    let averageChanceActiveDamage = ((activeDamage.length/hugeArray.length) * 100).toFixed(2)
    // Find average reactive damage dealt
    let reactiveDamage = reactiveUnblocked.filter((r)=>r.damageResults.unsavedDamage.damage > 0)
    let averageReactiveDamageArray = reactiveDamage.map((r)=>r.damageResults.unsavedDamage.damage)
    let averageReactiveDamage = (averageReactiveDamageArray.reduce((a, b)=>a+b, 0)/averageReactiveDamageArray.length).toFixed(2)
    let averageChanceReactiveDamage = ((reactiveDamage.length/hugeArray.length) * 100).toFixed(2)


    // console.log(activeUnblocked.length)
    // console.log(hugeArray.length)
    // console.log(averageActiveSuccess)

    setResults({aASuccess:averageActiveSuccess, rASuccess:averageReactiveSuccess, aCADamage: averageChanceActiveDamage, aADamage:averageActiveDamage, aRDamage: averageReactiveDamage, aCRDamage:averageChanceReactiveDamage})
  }



  // Master function
  const calcFunction = (player1, player2) => {
    let allResults = []
    let max = Math.floor(21)
    let min = Math.ceil(1)
    
    
    for(let i=0; i<5000; i++){
      let profile1Rolls = []
      let profile2Rolls = []

      // Roll the dice
      
      for(let j = 0; j < player1.weapon.burst; j++){
        profile1Rolls.push(Math.floor(Math.random() * (max - min) + min));
      }
      
      for(let k = 0; k < player2.weapon.burst; k++){
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
      // setResults({profile1Rolls, profile2Rolls, rollResults, damageResults})
      setCounter(i + 1)
      allResults.push({profile1Rolls, profile2Rolls, rollResults, damageResults})
    }

    
    return allResults
  }

  

  // Display
  return (
    <View style={styles.container}>
      <Button onPress={()=> averagesCalculation(player1, player2)} title="Run"/>
      {/* <Text>{player1.name}'s Roll:{JSON.stringify(results.profile1Rolls)}</Text>
      <Text>{player2.name}'s Roll:{JSON.stringify(results.profile2Rolls)}</Text>
      <Text></Text>
      <Text>{player1.name}'s Successes:{results.rollResults.p1Unblocked ? JSON.stringify(results.rollResults.p1Unblocked) : "[]"}</Text>
      <Text>{player2.name}'s Successes:{results.rollResults.p2Unblocked ? JSON.stringify(results.rollResults.p2Unblocked) : "[]"}</Text>
      <Text></Text>
      <Text>Saving Roll: {results.damageResults ? JSON.stringify(results.damageResults.savingRolls) : "[]"}</Text>
      <Text>Failed Saves: {results.damageResults ? JSON.stringify(results.damageResults.unsavedHits) : "[]"}</Text>
      <Text>{JSON.stringify(results.damageResults)}</Text> */}
      <Text></Text>
      {loading ? <Text>Loading</Text> :
      <View>
        <Text>Face to Face Roll Results</Text>
        <Text>ran {counter} times</Text>
        <Text> ------------------- </Text>
        <Text>Active Win: {results.aASuccess}%</Text>
        <Text>Active Chance of damage: {results.aCADamage}%</Text>
        <Text>Average Damage when dealt: {results.aADamage}</Text>
        <Text></Text>
        <Text>Reactive Win: {results.rASuccess}%</Text>
        <Text>Reactive Chance of damage: {results.aCRDamage}%</Text>
        <Text>Average Damage when dealt: {results.aRDamage}</Text>
        {/* <Text>Array Length: {JSON.stringify(results.length)}</Text> */}
        {/* <Text>Raw Data: {JSON.stringify(results)}</Text> */}
      </View>
      }
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