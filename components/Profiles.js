import React from 'react'
import { View, Text } from 'react-native'

const Profiles = ({active, reactive, setActive, setReactive}) => {
  
  return (
    <View>
      <Text></Text>
      <Text>Active: </Text>
      <Text>{active.name} BS{active.bs} ARM{active.arm}</Text>
      <Text>Weapon: {active.weapon.name} Burst: {active.weapon.burst} Damage: {active.weapon.dam}</Text>
      <Text></Text>
      <Text>Reactive:</Text>
      <Text>{reactive.name} BS{reactive.bs} ARM{reactive.arm} </Text>
      <Text>Weapon: {reactive.weapon.name} Burst: {reactive.weapon.burst} Damage: {reactive.weapon.dam}</Text>
      <Text></Text>
    </View>
  )
}

export default Profiles;