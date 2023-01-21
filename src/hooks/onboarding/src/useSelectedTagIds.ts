import {useEffect} from "react";

import {useAppDispatch, useAppSelector} from "@/hooks/redux";
import {clearSelectedTags, toggleSelectedTag} from "@/store";

function useSelectedTagIds() {
  const selectedTagIds = useAppSelector(state => state.interestTag.selectedTagIds);

  const dispatch = useAppDispatch();
  const toggleTag = (id: number) => dispatch(toggleSelectedTag(id));
  const isSelectedTag = (id: number) => selectedTagIds.includes(id);

  useEffect(() => {
    dispatch(clearSelectedTags());
  }, [dispatch]);

  return {selectedTagIds, toggleTag, isSelectedTag};
}

export default useSelectedTagIds;
