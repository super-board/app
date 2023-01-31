import {useEffect} from "react";

import {useAppDispatch, useAppSelector} from "@/hooks/redux";
import {clearSelectedTags, loadInterestTagsAsync, toggleSelectedTag} from "@/store";

function useSelectedTagIds() {
  const selectedTagIds = useAppSelector(state => state.interestTag.selectedTagIds);

  const dispatch = useAppDispatch();
  const loadSelectedTags = () => dispatch(loadInterestTagsAsync());
  const toggleTag = (id: number) => dispatch(toggleSelectedTag(id));
  const isSelectedTag = (id: number) => selectedTagIds.includes(id);

  useEffect(() => {
    dispatch(clearSelectedTags());
  }, [dispatch]);

  return {selectedTagIds, loadSelectedTags, toggleTag, isSelectedTag};
}

export default useSelectedTagIds;
