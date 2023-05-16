/**
 * Characters for generating random string
 */
const CHARS = "abcdefghijklmnopqrstuwxyz0123456789";

/**
 * Generate random string with given length
 * @param len
 */
export function randomString(len: number = 6) {
  let str = "";
  for (let i = 0; i < len; i++) {
    str += CHARS.charAt(Math.round(Math.random() * CHARS.length));
  }
  return str;
}
