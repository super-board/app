import {useAppDispatch, useAppSelector} from "@/hooks/redux";
import {toggleSelectedTag} from "@/store";

function useSelectedTagIds() {
  const selectedTagIds = useAppSelector(state => state.interestTag.selectedTagIds);

  const dispatch = useAppDispatch();
  const toggleTag = (id: number) => dispatch(toggleSelectedTag(id));

  return {selectedTagIds, toggleTag};
}

export default useSelectedTagIds;
