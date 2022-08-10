import React, {useState} from 'react'
import { View, Text} from 'react-native'
import Calculator from './Calculator'
import Modifiers from './Modifiers'
import Profiles from './Profiles'

const Shoot = () => {
  return (
    <View>
      <Text>
        Shoot!!
      </Text>
      <Profiles />
      <Modifiers />
      <Calculator />
    </View>
  )
}

export default Shoot;