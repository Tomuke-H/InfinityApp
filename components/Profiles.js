import React,{ useState, useEffect } from 'react'
import { StyleSheet, View, Text, Button } from 'react-native'
import { profileList } from './profileList'
import DropDownPicker from 'react-native-dropdown-picker'

const Profiles = ({active, reactive, setActive, setReactive}) => {
  const [profiles, setProfiles] = useState(profileList)
  const [openActive, setOpenActive] = useState(false)
  const [activeId, setActiveId] = useState(null)
  const [openReactive, setOpenReactive] = useState(false)
  const [reactiveId, setReactiveId] = useState(null)

  useEffect(()=>{
    console.log(active)
  }, [active])

  const searchById = (id, w) => {
    let searched = profileList.filter((p)=>p.id === id)
    if(w==='a'){
      setActive(searched[0])
    } else if(w==='r'){
      setReactive(searched[0])
    } else {
      console.log("search error")
    }
  }
  
  return (
    <View>
     
      <Text>Active: </Text>
      <DropDownPicker
        open={openActive}
        value={activeId}
        items={profiles}
        setOpen={setOpenActive}
        setValue={setActiveId}
        setItems={setProfiles}
        containerStyle={{maxWidth:'70%'}}
        schema={{
          label: 'name',
          value: 'id'
        }}
        onChangeValue={(value) => {searchById(value, 'a')}}
        zIndex={30}
      />
      <Text>BS{active.bs} ARM{active.arm}</Text>
      <Text>Weapon: {active.weapon.name} Burst: {active.weapon.burst} Damage: {active.weapon.dam}</Text>
      <Text>Reactive:</Text>
      <DropDownPicker
        open={openReactive}
        value={reactiveId}
        items={profiles}
        setOpen={setOpenReactive}
        setValue={setReactiveId}
        setItems={setProfiles}
        containerStyle={{maxWidth:'70%'}}
        schema={{
          label: 'name',
          value: 'id'
        }}
        onChangeValue={(value) => {searchById(value, 'r')}}
        zIndex={20}
      />
      <Text>BS{reactive.bs} ARM{reactive.arm} </Text>
      <Text>Weapon: {reactive.weapon.name} Burst: {reactive.weapon.burst} Damage: {reactive.weapon.dam}</Text>
      <Modifiers active={active} reactive={reactive} setActive={setActive} setReactive={setReactive}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '70%'
  },
});

export default Profiles;