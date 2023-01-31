import {useAppDispatch, useAppSelector} from "@/hooks/redux";
import {clearSelectedTags, loadInterestTagsAsync, toggleSelectedTag} from "@/store";

function useSelectedTagIds() {
  const selectedTagIds = useAppSelector(state => state.interestTag.selectedTagIds);

  const dispatch = useAppDispatch();
  const loadSelectedTags = () => dispatch(loadInterestTagsAsync());
  const toggleTag = (id: number) => dispatch(toggleSelectedTag(id));
  const resetSelectedTags = () => dispatch(clearSelectedTags());
  const isSelectedTag = (id: number) => selectedTagIds.includes(id);

  return {selectedTagIds, loadSelectedTags, toggleTag, resetSelectedTags, isSelectedTag};
}

export default useSelectedTagIds;
