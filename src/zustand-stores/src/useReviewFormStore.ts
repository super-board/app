import {Asset, launchImageLibrary} from "react-native-image-picker";
import {create} from "zustand";

import {network} from "@/constants/network";
import {PermissionCameraAndGalleryService} from "@/services/permission";
import {BoardGameSummary} from "@/types";

type ReviewFormState = {
  boardGame: BoardGameSummary | null;
  grade: number;
  images: Asset[];
  content: string;
};

type ReviewFormAction = {
  selectBoardGame: (boardGame: BoardGameSummary) => void;
  updateGrade: (grade: number) => void;
  loadImages: (urls: string[]) => Promise<void>;
  addImage: (image: Asset) => Promise<void>;
  removeImage: (targetIndex: number) => void;
  updateContent: (content: string) => void;
  reset: () => void;
};

const INITIAL_STATE = {
  boardGame: null,
  grade: 5,
  images: [],
  content: "",
};

const useReviewFormStore = create<ReviewFormState & ReviewFormAction>()(set => ({
  ...INITIAL_STATE,
  selectBoardGame: (boardGame: BoardGameSummary) => set({boardGame}),
  updateGrade: (grade: number) => set({grade}),
  loadImages: async (urls: string[]) => {
    const promises = (await Promise.allSettled(
      urls.map(url =>
        fetch(`${network.IMAGE_BASE_URL}/${url}`)
          .then(response => response.blob())
          .then(
            blob =>
              new Promise(resolve => {
                const reader = new FileReader();
                reader.onloadend = () =>
                  resolve({
                    uri: (reader.result as string).replace("application/octet-stream", "image/png"),
                    base64: (reader.result as string).replace(
                      "data:application/octet-stream;base64,",
                      "",
                    ),
                  });
                reader.readAsDataURL(blob);
              }),
          ),
      ),
    )) as {status: "fulfilled" | "rejected"; value: Asset}[];
    const resolvedPromises = promises.filter(({status}) => status === "fulfilled");
    const images = resolvedPromises.map(promise => promise.value);
    set({images});
  },
  addImage: async () => {
    await PermissionCameraAndGalleryService.requestPermission();
    const result = await launchImageLibrary({
      quality: 0.5,
      mediaType: "photo",
      includeBase64: true,
    });
    set(state => ({images: [...state.images, ...(result.assets ?? [])]}));
  },
  removeImage: (targetIndex: number) =>
    set(state => ({images: state.images.filter((_, index) => index !== targetIndex)})),
  updateContent: (content: string) => set({content}),
  reset: () => set(INITIAL_STATE),
}));

export default useReviewFormStore;
