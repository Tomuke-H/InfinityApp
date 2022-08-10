import React from 'react'
import { View, Text } from 'react-native'

const Profiles = ({active, reactive, setActive, setReactive}) => {
  
  return (
    <View>
      <Text> Profiles!</Text>
      <Text>Active: </Text>
      <Text>{active.name} BS{active.bs} ARM{active.arm} Weapon:{JSON.stringify(active.weapon)}</Text>
      <Text>Reactive:</Text>
      <Text>{reactive.name} BS{reactive.bs} ARM{reactive.arm} Weapon:{JSON.stringify(reactive.weapon)}</Text>
    </View>
  )
}

export default Profiles;