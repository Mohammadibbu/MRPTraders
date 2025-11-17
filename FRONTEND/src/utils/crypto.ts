// utils/crypto.ts
import CryptoJS from "crypto-js";

const SECRET_KEY = "YOUR_SECRET_KEY_32_CHARS";

export const encryptData = (data: any) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};

export const decryptData = (cipher: string) => {
  try {
    const bytes = CryptoJS.AES.decrypt(cipher, SECRET_KEY);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch {
    return null;
  }
};
