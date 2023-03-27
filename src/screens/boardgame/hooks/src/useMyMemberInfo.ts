import {useGetMyMemberInfoQuery} from "@/store";

export default function useMyMemberInfo() {
  const {isLoading, data: myMemberInfo} = useGetMyMemberInfoQuery();

  const isLoginUser = (id: number) => {
    if (isLoading) return false;
    return myMemberInfo?.id === id;
  };

  const isAdmin = () => {
    if (isLoading) return false;
    return myMemberInfo?.role === "ADMIN";
  };

  return {isLoading, myMemberInfo, isLoginUser, isAdmin};
}
