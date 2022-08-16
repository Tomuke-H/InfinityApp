import React, {useState} from 'react'
import { View, Text} from 'react-native'
import Calculator from './Calculator'
import Profiles from './Profiles'

const Shoot = () => {
  const [active, setActive] = useState({name: "Fusilier", bs: 12, weapon: {name: "Combi Rifle", burst: 3, dam: 13}, arm: 1, faction: "PanO"})
  const [reactive, setReactive] = useState({name: "Thorakitai", bs: 12, weapon: {name: "Combi Rifle", burst: 1, dam: 13}, arm: 3, faction: "Aleph"})
  const [mods, setMods] = useState({activeBsMod: 0, activeArmMod: 0, reactiveBsMod: 0, reactiveArmMod: 0})



  return (
    <View>
      <Profiles 
        active={active} 
        reactive={reactive} 
        setActive={setActive} 
        setReactive={setReactive}
        mods={mods}
        setMods={setMods}
      />
      <Calculator 
        player1={active} 
        player2={reactive} 
        activeMods={activeMods} 
        reactiveMods={reactiveMods}/>
    </View>
  )
}

export default Shoot;