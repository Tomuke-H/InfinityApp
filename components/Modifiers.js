import React, {useState} from 'react'
import { Text, View, Switch } from 'react-native'

const Modifiers = ({active, reactive, mods, setMods}) => {
  const [activeCover, setActiveCover] = useState(false)
  const [reactiveCover, setReactiveCover] = useState(false)

  const toggleActiveCover = () => {
    if(activeCover){
      setMods({activeBsMod: mods.activeBsMod, activeArmMod: mods.activeArmMod -3, reactiveBsMod: mods.reactiveBsMod +3, reactiveArmMod:mods.reactiveArmMod})
    } else if(!activeCover){
      setMods({activeBsMod: mods.activeBsMod, activeArmMod: mods.activeArmMod +3, reactiveBsMod: mods.reactiveBsMod -3, reactiveArmMod:mods.reactiveArmMod})
    }
    setActiveCover(!activeCover)
  }
  const toggleReactiveCover = () => {
    if(reactiveCover){
      setMods({activeBsMod: mods.activeBsMod+3, activeArmMod: mods.activeArmMod, reactiveBsMod: mods.reactiveBsMod, reactiveArmMod:mods.reactiveArmMod-3})
    } else if(!reactiveCover){
      setMods({activeBsMod: mods.activeBsMod-3, activeArmMod: mods.activeArmMod, reactiveBsMod: mods.reactiveBsMod, reactiveArmMod:mods.reactiveArmMod+3})
    }
    setReactiveCover(!reactiveCover)
  }
  

  return (
    <View>
      <Text>Active in Cover</Text>
      <Switch 
        value={activeCover}
        onValueChange={toggleActiveCover}
      />
      <Text>Reactive in Cover</Text>
      <Switch 
        value={reactiveCover}
        onValueChange={toggleReactiveCover}
      />
    </View>
  )
}

export default Modifiers;