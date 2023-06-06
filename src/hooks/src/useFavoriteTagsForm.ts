import React from "react";

export default function useFavoriteTagsForm(invalidCallback?: () => void) {
  const [selectedTagIds, setSelectedTagIds] = React.useState<number[]>([]);

  const isSelectedTag = (id: number) => selectedTagIds.includes(id);

  const toggleTag = (tagId: number) => {
    const isSelected = isSelectedTag(tagId);
    if (!isSelected && selectedTagIds.length === 5) {
      return invalidCallback?.call(null);
    }

    if (isSelected) {
      const filtered = selectedTagIds.filter(id => id !== tagId);
      setSelectedTagIds(() => filtered);
      return;
    }

    setSelectedTagIds(() => [...selectedTagIds, tagId]);
  };

  const resetSelectedTags = () => {
    setSelectedTagIds(() => []);
  };

  return {
    selectedTagIds,
    isSelectedTag,
    toggleTag,
    resetSelectedTags,
  };
}
