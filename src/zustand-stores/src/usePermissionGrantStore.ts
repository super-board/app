import {create} from "zustand";

import keys from "@/constants/keys";
import {AsyncStorageService} from "@/services/storage";

type PermissionGrantState = {
  shouldRequestPermissionGrant: boolean;
};

type PermissionGrantAction = {
  loadPermissionGrantStatus: () => Promise<void>;
  completePermissionGrant: () => Promise<void>;
};

const usePermissionGrantStore = create<PermissionGrantState & PermissionGrantAction>()(set => ({
  shouldRequestPermissionGrant: true,
  loadPermissionGrantStatus: async () => {
    set({
      shouldRequestPermissionGrant: !(await AsyncStorageService.getData(
        keys.PERMISSION_GRANT_REQUESTED,
      )),
    });
  },
  completePermissionGrant: async () => {
    set({shouldRequestPermissionGrant: false});
    await AsyncStorageService.saveData(keys.PERMISSION_GRANT_REQUESTED, true);
  },
}));

export default usePermissionGrantStore;
