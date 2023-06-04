import React, {useEffect, useRef, useState} from "react";

import {NativeStackHeaderProps} from "@react-navigation/native-stack";
import {Dimensions, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity} from "react-native";

import * as SVG from "@/assets/svgs";
import colors from "@/constants/colors";
import effects from "@/constants/effects";
import typography from "@/constants/typography";
import {useSearchStore} from "@/zustand-stores";

import {AppBar} from "./AppBar";
import {AppBarButton} from "./AppBarButton";

export default function SearchAppBar({navigation}: NativeStackHeaderProps) {
  const inputRef = useRef<TextInput>(null);
  const [query, setQuery] = useState("");
  const [hasFocus, setHasFocus] = useState(false);

  const {searchQuery, updateSearchQuery, resetSearchQuery} = useSearchStore();

  const onSearch = () => {
    updateSearchQuery(query);
  };

  useEffect(() => {
    if (!query) {
      resetSearchQuery();
      return;
    }

    const timeout = setTimeout(() => updateSearchQuery(query), 750);
    return () => clearTimeout(timeout);
  }, [query, resetSearchQuery, updateSearchQuery]);

  return (
    <AppBar.Container>
      <AppBar.Header>
        <AppBar.Center>
          <Text style={[typography.subhead01, effects.textDropShadow, styles.title]}>검색</Text>
        </AppBar.Center>
        <AppBar.Left marginLeft={24}>
          <AppBarButton.HistoryBack navigation={navigation} />
        </AppBar.Left>
      </AppBar.Header>
      <AppBar.Content style={styles.contentContainer}>
        <TextInput
          ref={inputRef}
          style={[styles.searchInput, typography.body01, typography.textWhite]}
          placeholder="알고싶은 보드게임을 검색해보세요"
          placeholderTextColor={colors.OTBBlack500}
          selectionColor={colors.OTBBlack400}
          underlineColorAndroid="transparent"
          returnKeyType="search"
          value={query}
          onFocus={() => setHasFocus(() => true)}
          onBlur={() => setHasFocus(() => false)}
          onChangeText={text => setQuery(() => text)}
          onSubmitEditing={onSearch}
        />
        <TouchableOpacity style={styles.searchButton} activeOpacity={1} onPress={onSearch}>
          <SVG.Icon.Search width={24} height={24} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.backdrop, {display: hasFocus && !searchQuery ? "flex" : "none"}]}
          activeOpacity={0.5}
          onPress={Keyboard.dismiss}
        />
      </AppBar.Content>
    </AppBar.Container>
  );
}

const styles = StyleSheet.create({
  title: {color: colors.OTBBlack50},
  contentContainer: {
    position: "relative",
    width: Dimensions.get("window").width,
    height: 64,
    paddingHorizontal: 24,
    backgroundColor: colors.OTBBlack,
  },
  searchInput: {
    marginVertical: 8,
    width: "100%",
    height: 48,
    paddingHorizontal: 16,
    backgroundColor: colors.OTBBlack700,
    borderRadius: 4,
  },
  searchButton: {
    position: "absolute",
    top: 20,
    right: 32,
  },
  backdrop: {
    position: "absolute",
    top: 64,
    left: 0,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height - 56 - 64,
    backgroundColor: "#000000",
    opacity: 0.5,
  },
});
