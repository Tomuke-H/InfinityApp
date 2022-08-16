import React, {useState} from 'react'
import { Text, View, Switch } from 'react-native'

const Modifiers = ({active, reactive, mods, setMods}) => {
  const [activeCover, setActiveCover] = useState(false)
  const [reactiveCover, setReactiveCover] = useState(false)
  const [activeBs, setActiveBs] = useState(0)
  const [activeArm, setActiveArm] = useState(0)
  const [reactiveBs, setReactiveBs] = useState(0)
  const [reactiveArm, setReactiveArm] = useState(0)

  const updateMods = () => {
    setMods({activeBsMod: mods.activeBsMod+activeBs, activeArmMod:mods.activeArmMod+activeArm, reactiveBsMod:mods.reactiveBsMod+reactiveBs, reactiveArmMod:mods.reactiveArmMod+reactiveArm})
  }
  
  const toggleActiveCover = () => {
    if(activeCover){
      setMods({activeBsMod: mods.activeBsMod, activeArmMod: mods.activeArmMod -3, reactiveBsMod: mods.reactiveBsMod +3, reactiveArmMod:mods.reactiveArmMod})
      // setReactiveBs(reactiveBs+3)
      // setActiveArm(activeArm-3)
      
    } else if(!activeCover){
      // setReactiveBs(reactiveBs-3)
      // setActiveArm(activeArm+3)
      setMods({activeBsMod: mods.activeBsMod, activeArmMod: mods.activeArmMod +3, reactiveBsMod: mods.reactiveBsMod -3, reactiveArmMod:mods.reactiveArmMod})
    }
    setActiveCover(!activeCover)
    // updateMods()
  }
  const toggleReactiveCover = () => {
    if(reactiveCover){
      // setActiveBs(activeBs+3)
      // setReactiveArm(reactiveArm-3)
      setMods({activeBsMod: mods.activeBsMod+3, activeArmMod: mods.activeArmMod, reactiveBsMod: mods.reactiveBsMod, reactiveArmMod:mods.reactiveArmMod-3})
    } else if(!reactiveCover){
      // setActiveBs(activeBs-3)
      // setReactiveArm(reactiveArm+3)
      setMods({activeBsMod: mods.activeBsMod-3, activeArmMod: mods.activeArmMod, reactiveBsMod: mods.reactiveBsMod, reactiveArmMod:mods.reactiveArmMod+3})
    }
    setReactiveCover(!reactiveCover)
    // updateMods()
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