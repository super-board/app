import {useAppDispatch} from "@/hooks/redux";
import {loginAsync} from "@/store";

function useLogin() {
  const dispatch = useAppDispatch();
  const login = () => dispatch(loginAsync());

  return {login};
}

export default useLogin;
