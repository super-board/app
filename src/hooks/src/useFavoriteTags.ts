import React from "react";

import {useQuery} from "@tanstack/react-query";

import {api} from "@/api";
import {Tag} from "@/types";
import {useAuthStore, useFavoriteTagsStore} from "@/zustand-stores";

export default function useFavoriteTags() {
  const {isLoading: isTagListLoading, data: tagList} = useQuery(["tags"], api.tag.fetchTags);
  const {tagIds: favoriteTagsLocal} = useFavoriteTagsStore();
  const didLogin = useAuthStore(state => !!state.accessToken);
  const {isLoading: isMyPageDetailsLoading, data: myPageDetails} = useQuery(
    ["members/mypage"],
    api.myPage.fetchDetails,
    {enabled: didLogin},
  );
  const [favoriteTags, setFavoriteTags] = React.useState<Tag[]>([]);

  React.useEffect(() => {
    if (isTagListLoading || !tagList) return;

    const tagIds =
      didLogin && myPageDetails
        ? myPageDetails?.favoriteTags.map(tag => tag.id) ?? []
        : favoriteTagsLocal;
    const filteredTags = tagList
      .map(tagGroup => tagGroup.tags)
      .flat()
      .filter(tag => tagIds.includes(tag.id));
    setFavoriteTags(filteredTags);
  }, [isTagListLoading, isMyPageDetailsLoading, tagList, favoriteTagsLocal, myPageDetails]);

  return {isLoading: isTagListLoading || isMyPageDetailsLoading, tagList, favoriteTags};
}
