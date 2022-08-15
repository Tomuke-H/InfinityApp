import React,{ useState } from 'react'
import { StyleSheet, View, Text, Button } from 'react-native'
import { profileList } from './profileList'
import DropDownPicker from 'react-native-dropdown-picker'

const Profiles = ({active, reactive, setActive, setReactive}) => {
  const [profiles, setProfiles] = useState([{label: 'Apple', value: 'apple'}, {label: 'Orange', value: 'orange'}])
  const [openActive, setOpenActive] = useState(false)
  const [activeValue, setActiveValue] = useState(null)
  const [openReactive, setOpenReactive] = useState(false)

  // const refineData = () => {
  //   let refinedList = profileList.map((p)=> ({label: p.name, value: p.name}))
  //   setProfiles(refinedList)
  //   console.log(profileList)
  //   console.log(profiles)
  // }

  // refineData()
  
  return (
    <View>
      {/* <Button title="Refine" onPress={()=>refineData()} /> */}
     
      <DropDownPicker
        open={openActive}
        value={activeValue}
        items={profiles}
        setOpen={setOpenActive}
        setValue={setActiveValue}
        setItems={setProfiles}
        containerStyle={{maxWidth:'70%'}}
      />
      <Text>Active: </Text>
      <Text>{active.label} BS{active.bs} ARM{active.arm}</Text>
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