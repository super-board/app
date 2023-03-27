import {useAppDispatch, useAppSelector} from "@/hooks/redux";
import {checkPermissionGrantRequestedAsync} from "@/store";

function useCheckPermissionGrantRequested() {
  const shouldRequestPermissionGrant = useAppSelector(
    state => state.permissionGrant.shouldRequestPermissionGrant,
  );
  const isLoading = useAppSelector(state => state.permissionGrant.loading !== "success");

  const dispatch = useAppDispatch();
  const checkPermissionGrantRequested = () => dispatch(checkPermissionGrantRequestedAsync());

  return {isLoading, shouldRequestPermissionGrant, checkPermissionGrantRequested};
}

export default useCheckPermissionGrantRequested;
