import React,{ useState, useEffect } from 'react'
import { StyleSheet, View, Text, Button } from 'react-native'
import { profileList } from './profileList'
import DropDownPicker from 'react-native-dropdown-picker'

const Profiles = ({active, reactive, setActive, setReactive}) => {
  const [profiles, setProfiles] = useState(profileList)
  const [openActive, setOpenActive] = useState(false)
  const [activeId, setActiveId] = useState(null)
  const [openReactive, setOpenReactive] = useState(false)

  useEffect(()=>{
    console.log(active)
  }, [active])

  const searchById = (id) => {
    let searched = profileList.filter((p)=>p.id === id)
    setActive(searched[0])
  }
  
  return (
    <View>
     
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
        onChangeValue={(value) => {searchById(value)}}
      />
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text>Active: </Text>
      <Text>{active.name} BS{active.bs} ARM{active.arm}</Text>
      <Text>Weapon: {active.weapon.name} Burst: {active.weapon.burst} Damage: {active.weapon.dam}</Text>
      <Text></Text>
      <Text>Reactive:</Text>
      <Text>{reactive.name} BS{reactive.bs} ARM{reactive.arm} </Text>
      <Text>Weapon: {reactive.weapon.name} Burst: {reactive.weapon.burst} Damage: {reactive.weapon.dam}</Text>
      <Text></Text>
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