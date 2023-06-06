import {useCallback} from "react";

import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";

import {RootStackParamList} from "@/navigation/navigation";

export default function useNavigateToBoardGameDetails(id: number) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const navigateToBoardGameDetails = useCallback(
    () => navigation.navigate("BoardGameDetailsScreen", {id}),
    [id],
  );

  return {navigateToBoardGameDetails};
}
