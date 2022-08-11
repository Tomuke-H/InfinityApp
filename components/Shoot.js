import React, {useState} from 'react'
import { View, Text} from 'react-native'
import Calculator from './Calculator'
import Modifiers from './Modifiers'
import Profiles from './Profiles'

const Shoot = () => {
  const [active, setActive] = useState({name: "Fusilier", bs: 12, weapon: {name: "Combi Rifle", burst: 3, dam: 13}, arm: 1, faction: "PanO"})
  const [reactive, setReactive] = useState({name: "Thorakitai", bs: 12, weapon: {name: "Combi Rifle", burst: 1, dam: 13}, arm: 3, faction: "Aleph"})
  const [player1, setPlayer1] = useState(active)
  const [player2, setPlayer2] = useState(reactive)

  return (
    <View>
      <Text>
        Shoot!!
      </Text>
      <Profiles active={active} reactive={reactive} setActive={setActive} setReactive={setReactive}/>
      <Modifiers player1={player1} player2={player2} setPlayer1={setPlayer1} setPlayer2={setPlayer2}/>
      <Calculator player1 = {player1} player2 = {player2}/>
    </View>
  )
}

export default Shoot;