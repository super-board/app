import {axiosAuthenticated, axiosPublic} from "@/api/src/config";
import {MemberDetails, RegisterForm} from "@/types";

export async function checkDuplicateEmail(email: string) {
  return axiosPublic.get("/members/mail-check", {params: {email}});
}

export async function checkDuplicateNickname(nickname: string) {
  return axiosPublic.get("/members/nickname-check", {params: {nickname}});
}

export async function signUpWithEmailAndPassword(payload: RegisterForm) {
  return axiosPublic.post("/members/sign-up", payload);
}

export async function fetchLoginInfo() {
  return axiosAuthenticated.get<unknown, MemberDetails>("/members/me");
}
