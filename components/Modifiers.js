import React, {useState} from 'react'
import { Text, View, Switch } from 'react-native'

const Modifiers = ({active, reactive, mods, setMods}) => {
  const [activeCover, setActiveCover] = useState(false)
  const [reactiveCover, setReactiveCover] = useState(false)

  const toggleActiveCover = () => {
    if(activeCover){
      setMods({activeBsMod: mods.activeBsMod, activeArmMod: mods.activeArmsMod -3, reactiveBsMod: mods.reactiveBsMod +3, reactiveArmMod:mods.reactiveArmMod})
    } else if(!activeCover){
      setMods({activeBsMod: mods.activeBsMod, activeArmMod: mods.activeArmsMod +3, reactiveBsMod: mods.reactiveBsMod -3, reactiveArmMod:mods.reactiveArmMod})
    }
    setActiveCover(!activeCover)
  }
  

  return (
    <View>
      <Text>Active in Cover</Text>
      <Switch 
        value={activeCover}
        onValueChange={toggleActiveCover}
      />
    </View>
  )
}

export default Modifiers;