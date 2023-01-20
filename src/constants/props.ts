import {NavigationProp, ParamListBase, RouteProp} from "@react-navigation/native";

export type ScreenProps = {
  navigation: NavigationProp<ParamListBase>;
  route: RouteProp<ParamListBase>;
};
