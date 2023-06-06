import {create} from "zustand";

import keys from "@/constants/keys";
import {AsyncStorageService} from "@/services/storage";

type FavoriteTagsState = {
  tagIds: number[];
};

type FavoriteTagsAction = {
  loadFavoriteTags: () => Promise<void>;
  saveFavoriteTags: (tagIds: number[]) => Promise<void>;
};

const useFavoriteTagsStore = create<FavoriteTagsState & FavoriteTagsAction>()(set => ({
  tagIds: [],
  loadFavoriteTags: async () => {
    set({tagIds: (await AsyncStorageService.getData(keys.FAVORITE_TAG_IDS)) ?? []});
  },
  saveFavoriteTags: async (tagIds: number[]) => {
    set({tagIds});
    await AsyncStorageService.saveData(keys.FAVORITE_TAG_IDS, tagIds);
  },
}));

export default useFavoriteTagsStore;
