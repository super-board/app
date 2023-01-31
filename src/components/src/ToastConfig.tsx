import React from "react";

import {BaseToast, ToastConfig} from "react-native-toast-message";

import colors from "@/constants/colors";
import typography from "@/constants/typography";

export default {
  error: props => (
    <BaseToast
      {...props}
      style={{
        width: "70%",
        height: 38,
        borderRadius: 19,
        justifyContent: "center",
        alignItems: "center",
      }}
      text1Style={[
        typography.subhead03,
        {
          width: "100%",
          color: colors.OTBBlack,
          textAlign: "center",
        },
      ]}
    />
  ),
} as ToastConfig;
