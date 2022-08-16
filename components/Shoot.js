import React, {useState} from 'react'
import { View, Text} from 'react-native'
import Calculator from './Calculator'
import Profiles from './Profiles'

const Shoot = () => {
  const [active, setActive] = useState({name: "Fusilier", bs: 12, weapon: {name: "Combi Rifle", burst: 3, dam: 13}, arm: 1, faction: "PanO"})
  const [reactive, setReactive] = useState({name: "Thorakitai", bs: 12, weapon: {name: "Combi Rifle", burst: 1, dam: 13}, arm: 3, faction: "Aleph"})


  return (
    <View>
      <Profiles style={{zIndex:2}} active={active} reactive={reactive} setActive={setActive} setReactive={setReactive}/>
      <Calculator style={{zIndex:0}} player1 = {active} player2 = {reactive}/>
    </View>
  )
}

export default Shoot;