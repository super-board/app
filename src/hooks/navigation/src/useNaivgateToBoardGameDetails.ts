import {useCallback} from "react";

import {useNavigation} from "@react-navigation/native";

export default function useNavigateToBoardGameDetails(id: number) {
  const navigation = useNavigation();

  const navigateToBoardGameDetails = useCallback(
    () => navigation.navigate("BoardGameDetailsScreen", {id}),
    [id],
  );

  return {navigateToBoardGameDetails};
}
