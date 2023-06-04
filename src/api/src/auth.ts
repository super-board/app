import {EmailVerificationPayload, LoginForm} from "@/types";

import {axiosAuthenticated, axiosPublic} from "./config";

export async function sendVerificationMail(email: string) {
  return axiosPublic.get<unknown, {clientKey: string}>("auth/code", {params: {email}});
}

export async function verifyAuthCode(payload: EmailVerificationPayload) {
  return axiosPublic.post("auth/code-check", payload);
}

export async function signIn(payload: LoginForm) {
  return axiosPublic.post("auth/sign-in", payload);
}

export async function signOut() {
  return axiosAuthenticated.patch("auth/sign-out");
}
