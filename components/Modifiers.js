import React, { useState } from "react";
import { Text, View, Switch } from "react-native";
import MultiSlider from "@ptomasroos/react-native-multi-slider";

const Modifiers = ({ active, reactive, mods, setMods }) => {
  const [activeCover, setActiveCover] = useState(false);
  const [reactiveCover, setReactiveCover] = useState(false);
  const [activeBs, setActiveBs] = useState(0);
  const [activeArm, setActiveArm] = useState(0);
  const [reactiveBs, setReactiveBs] = useState(0);
  const [reactiveArm, setReactiveArm] = useState(0);
  const [range, setRange] = useState(0);
  const [previousRange, setPreviousRange] = useState({ a: 0, r: 0 });

  // DOESN'T WORK HOW I'D LIKE
  // const updateMods = () => {
  //   setMods({
  //     activeBsMod: mods.activeBsMod + activeBs,
  //     activeArmMod: mods.activeArmMod + activeArm,
  //     reactiveBsMod: mods.reactiveBsMod + reactiveBs,
  //     reactiveArmMod: mods.reactiveArmMod + reactiveArm,
  //   });
  // };

  const toggleActiveCover = () => {
    if (activeCover) {
      setMods({
        activeBsMod: mods.activeBsMod,
        activeArmMod: mods.activeArmMod - 3,
        reactiveBsMod: mods.reactiveBsMod + 3,
        reactiveArmMod: mods.reactiveArmMod,
      });
    } else if (!activeCover) {
      setMods({
        activeBsMod: mods.activeBsMod,
        activeArmMod: mods.activeArmMod + 3,
        reactiveBsMod: mods.reactiveBsMod - 3,
        reactiveArmMod: mods.reactiveArmMod,
      });
    }
    setActiveCover(!activeCover);
  };

  const toggleReactiveCover = () => {
    if (reactiveCover) {
      setMods({
        activeBsMod: mods.activeBsMod + 3,
        activeArmMod: mods.activeArmMod,
        reactiveBsMod: mods.reactiveBsMod,
        reactiveArmMod: mods.reactiveArmMod - 3,
      });
    } else if (!reactiveCover) {
      setMods({
        activeBsMod: mods.activeBsMod - 3,
        activeArmMod: mods.activeArmMod,
        reactiveBsMod: mods.reactiveBsMod,
        reactiveArmMod: mods.reactiveArmMod + 3,
      });
    }
    setReactiveCover(!reactiveCover);
  };

  const addRangeMod = () => {};

  const resetRangemod = () => {};

  const renderRange = () => {
    if (range > 48) {
      return 48 + "-" + 96;
    } else if (range > 0) {
      return range - 8 + "-" + range;
    } else {
      return range;
    }
  };

  return (
    <View>
      <Text>-----------------</Text>
      <Text>Modifiers:</Text>
      <Text>Active in Cover</Text>
      <Switch value={activeCover} onValueChange={toggleActiveCover} />
      <Text>Reactive in Cover</Text>
      <Switch value={reactiveCover} onValueChange={toggleReactiveCover} />
      <Text>Range</Text>
      <MultiSlider
        allowOverlap={true}
        value={range}
        onValuesChange={(value) => setRange(value)}
        onValuesChangeStart={() => resetRangemod()}
        onValuesChangeFinish={(value) => addRangeMod(value)}
        optionsArray={[0, 8, 16, 24, 32, 40, 48, 96]}
      />
      <Text>{renderRange()}</Text>
    </View>
  );
};

export default Modifiers;
