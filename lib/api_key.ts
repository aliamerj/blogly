import crypto from "crypto";
// export function hashApiKey(apiKey: string) {
//   return crypto
//     .createHash("sha256")
//     .update(apiKey + process.env.API_SECRET)
//     .digest("hex");
// }
//
// export function compareApiKey(originKey: string, apiKey: string): boolean {
//   return originKey === hashApiKey(apiKey);
// }

const algorithm = "aes-256-cbc";
const key = crypto.scryptSync(process.env.API_SECRET!, "salt", 32);
const iv = crypto.randomBytes(16);

export const apiEncrypt = (text: string) => {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return { iv: iv.toString("hex"), encryptedData: encrypted };
};

export const apiDecrypt = (encryptedData: string, ivHex: string) => {
  const ivBuffer = Buffer.from(ivHex, "hex");
  const decipher = crypto.createDecipheriv(algorithm, key, ivBuffer);
  let decrypted = decipher.update(encryptedData, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
};
