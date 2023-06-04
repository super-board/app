import {create} from "zustand";

type SearchState = {
  searchQuery: string;
};

type SearchAction = {
  updateSearchQuery: (query: string) => void;
  resetSearchQuery: () => void;
};

const useSearchStore = create<SearchState & SearchAction>()(set => ({
  searchQuery: "",
  updateSearchQuery: (query: string) => {
    set({searchQuery: query});
  },
  resetSearchQuery: () => {
    set({searchQuery: ""});
  },
}));

export default useSearchStore;
