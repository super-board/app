import {axiosPublic} from "@/api/src/config";
import {EmailVerificationPayload, ResetPasswordForm} from "@/types";

export async function sendVerificationMail(email: string) {
  return axiosPublic.get<unknown, {clientKey: string}>("passwords/code", {params: {email}});
}

export async function verifyAuthCode(payload: EmailVerificationPayload) {
  return axiosPublic.post("passwords/code-check", payload);
}

export async function resetPassword(payload: ResetPasswordForm) {
  return axiosPublic.patch("passwords", payload);
}
