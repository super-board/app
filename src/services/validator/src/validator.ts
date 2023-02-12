export function isValidEmail(text: string): boolean {
  const pattern = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  return pattern.test(text);
}

export function isValidPassword(password: string): boolean {
  /* 영문, 숫자 조합 8 ~ 20자리 비밀번호 */
  const pattern1 = "(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{8,20}";
  /* 영문, 특수문자 조합 8 ~ 20자리 비밀번호 */
  const pattern2 = "(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z!@#$%^&*]{8,20}";
  /* 숫자, 특수문자 조합 8 ~ 20자리 비밀번호 */
  const pattern3 = "(?=.*[0-9])(?=.*[!@#$%^&*])[0-9!@#$%^&*]{8,20}";
  /* 영문, 숫자, 특수문자 조합 8 ~ 20자리 비밀번호 */
  const pattern4 = "(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}";

  const passwordRegExp = new RegExp(`^${pattern1}|${pattern2}|${pattern3}|${pattern4}$`, "g");
  return passwordRegExp.test(password);
}
