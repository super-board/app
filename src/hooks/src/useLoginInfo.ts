import {useQuery} from "@tanstack/react-query";

import {api} from "@/api";

export default function useLoginInfo() {
  const {
    isLoading,
    data: loginInfo,
    ...queryResult
  } = useQuery(["members/me"], api.member.fetchLoginInfo);

  const isLoginUser = (id: number): boolean => {
    if (isLoading || !loginInfo) return false;
    return loginInfo.id === id;
  };

  const isAdmin = () => {
    if (isLoading || !loginInfo) return false;
    return loginInfo.role === "ROLE_ADMIN";
  };

  return {isLoading, loginInfo, isLoginUser, isAdmin, ...queryResult};
}
