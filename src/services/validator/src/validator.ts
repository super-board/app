export function isValidEmail(text: string) {
  const pattern = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  return pattern.test(text);
}
