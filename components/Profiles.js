import React from 'react'
import { View, Text } from 'react-native'

const Profiles = () => {
  const fakeProfile1 = {bs: 12, burst: 3, arm: 1, dam:13}
  const fakeProfile2 = {bs: 13, burst: 1, arm: 2, dam:14}
  return (
    <View>
      <Text> Profiles!</Text>
      <Text>Player 1: BS 12, Burst 3, Arm 1, Dam 13</Text>
      <Text>Player 2: BS 13, Burst 1, Arm 2, Dam 14</Text>
    </View>
  )
}

export default Profiles;