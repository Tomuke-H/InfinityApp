import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { profileList, weaponList } from "./profileList";
import DropDownPicker from "react-native-dropdown-picker";
import Modifiers from "./Modifiers";

const Profiles = ({
  active,
  reactive,
  setActive,
  setReactive,
  mods,
  setMods,
}) => {
  const [profiles, setProfiles] = useState(profileList);
  const [openActive, setOpenActive] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const [openReactive, setOpenReactive] = useState(false);
  const [reactiveId, setReactiveId] = useState(null);

  // useEffect(()=>{
  //   console.log(active)
  // }, [active])

  const searchById = (id, w) => {
    let searched = profileList.filter((p) => p.id === id);
    if (w === "a") {
      setActive(searched[0]);
    } else if (w === "r") {
      setReactive(searched[0]);
    } else {
      console.log("search error");
    }
  };

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
        containerStyle={{ maxWidth: "70%" }}
        schema={{
          label: "name",
          value: "id",
        }}
        onChangeValue={(value) => {
          searchById(value, "a");
        }}
        zIndex={30}
      />
      <Text>
        BS{active.bs}
        {mods.activeBsMod !== 0 ? `(${mods.activeBsMod})` : ""} ARM{active.arm}
        {mods.activeArmMod !== 0 ? `(+${mods.activeArmMod})` : ""}
      </Text>
      <Text>
        Weapon: {active.weapon.name} Burst: {active.weapon.burst} Damage:{" "}
        {active.weapon.dam}
      </Text>
      <Text>Reactive:</Text>
      <DropDownPicker
        open={openReactive}
        value={reactiveId}
        items={profiles}
        setOpen={setOpenReactive}
        setValue={setReactiveId}
        setItems={setProfiles}
        containerStyle={{ maxWidth: "70%" }}
        schema={{
          label: "name",
          value: "id",
        }}
        onChangeValue={(value) => {
          searchById(value, "r");
        }}
        zIndex={20}
      />
      <Text>
        BS{reactive.bs}
        {mods.reactiveBsMod !== 0 ? `(${mods.reactiveBsMod})` : ""} ARM
        {reactive.arm}
        {mods.reactiveArmMod !== 0 ? `(+${mods.reactiveArmMod})` : ""}{" "}
      </Text>
      <Text>
        Weapon: {reactive.weapon.name} Burst: {reactive.weapon.burst} Damage:{" "}
        {reactive.weapon.dam}
      </Text>
      <Modifiers
        active={active}
        reactive={reactive}
        mods={mods}
        setMods={setMods}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    maxWidth: "70%",
  },
});

export default Profiles;
