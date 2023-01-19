import React from "react";

import {View} from "react-native";

type Props = {
  width?: number;
  height?: number;
};

function SizedBox({width = 0, height = 0}: Props) {
  return <View style={{width, height}} />;
}

export default SizedBox;
