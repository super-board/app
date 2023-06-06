import {Dimensions, StyleSheet} from "react-native";

import colors from "@/constants/colors";

const APP_BAR_HEIGHT = 56;
const style = StyleSheet.create({
  screenWithAppBarContainer: {
    flex: 1,
    backgroundColor: colors.OTBBlack,
    width: Dimensions.get("window").width,
    padding: 24,
    paddingTop: 0,
  },
  screenWithoutAppBarContainer: {
    flex: 1,
    backgroundColor: colors.OTBBlack,
    width: Dimensions.get("window").width,
    padding: 24,
    paddingTop: 0,
  },
});

export default style;
