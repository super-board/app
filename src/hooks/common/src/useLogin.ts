import {useAppDispatch, useAppSelector} from "@/hooks/redux";
import {loginAsync} from "@/store";

function useLogin() {
  const didLogin = useAppSelector(state => !!state.auth.accessToken);

  const dispatch = useAppDispatch();
  const login = () => dispatch(loginAsync());

  return {didLogin, login};
}

export default useLogin;
