import {useAppDispatch, useAppSelector} from "@/hooks/redux";
import {savePermissionGrantResultAsync} from "@/store";

function useSavePermissionGrantResult() {
  const isSubmitting = useAppSelector(state => state.permissionGrant.loading === "pending");

  const dispatch = useAppDispatch();
  const savePermissionGrantResult = () => dispatch(savePermissionGrantResultAsync());

  return {isSubmitting, savePermissionGrantResult};
}

export default useSavePermissionGrantResult;
