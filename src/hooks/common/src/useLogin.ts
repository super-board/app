import {useAppDispatch, useAppSelector} from "@/hooks/redux";
import {checkShouldLoginAsync, loginAsync} from "@/store";

function useLogin() {
  const didLogin = useAppSelector(state => !!state.auth.accessToken);
  const shouldLogin = useAppSelector(state => state.auth.shouldLogin);

  const dispatch = useAppDispatch();
  const login = () => dispatch(loginAsync());
  const checkShouldLogin = () => dispatch(checkShouldLoginAsync());

  return {didLogin, shouldLogin, login, checkShouldLogin};
}

export default useLogin;
