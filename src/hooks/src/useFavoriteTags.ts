import React from "react";

import {api} from "@/api";
import useRefetchQuery from "@/hooks/src/useRefetchQuery";
import {Tag} from "@/types";
import {useAuthStore, useFavoriteTagsStore} from "@/zustand-stores";

export default function useFavoriteTags() {
  const {isLoading: isTagListLoading, data: tagList} = useRefetchQuery(["tags"], api.tag.fetchTags);
  const {tagIds: favoriteTagsLocal} = useFavoriteTagsStore();
  const didLogin = useAuthStore(state => !!state.accessToken);
  const {data: myPageDetails} = useRefetchQuery(["members/mypage"], api.myPage.fetchDetails, {
    enabled: didLogin,
  });
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
  }, [isTagListLoading, tagList, favoriteTagsLocal, myPageDetails]);

  return {isLoading: isTagListLoading, tagList, favoriteTags};
}
