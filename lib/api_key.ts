import crypto from "crypto";
export function hashApiKey(apiKey: string) {
  return crypto
    .createHash("sha256")
    .update(apiKey + process.env.API_SECRET)
    .digest("hex");
}

export function compareApiKey(originKey: string, apiKey: string): boolean {
  return originKey === hashApiKey(apiKey);
}
