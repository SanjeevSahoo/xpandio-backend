const CryptoJS = require("crypto-js");

const CRYPTO_KEY = process.env.NODE_APP_CRYPTO_KEY || "somesecret";

// const encryptData = (data) =>
//   CryptoJS.AES.encrypt(JSON.stringify(data), CRYPTO_KEY).toString();
const encryptData = (data) => {
  const encrypted = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    CRYPTO_KEY
  ).toString();
  const hmac = CryptoJS.HmacSHA256(
    encrypted,
    CryptoJS.SHA256(CRYPTO_KEY)
  ).toString();
  return hmac + encrypted;
};

const decryptData = (ciphertext) => {
  const transithmac = ciphertext.substring(0, 64);
  const transitencrypted = ciphertext.substring(64);
  const decryptedhmac = CryptoJS.HmacSHA256(
    transitencrypted,
    CryptoJS.SHA256(CRYPTO_KEY)
  ).toString();
  if (transithmac !== decryptedhmac) {
    throw new Error("Tempared Key");
  }
  const decrypted = CryptoJS.AES.decrypt(transitencrypted, CRYPTO_KEY).toString(
    CryptoJS.enc.Utf8
  );
  return JSON.parse(decrypted);
};
const encryptDataSame = (data) => {
  const hash = CryptoJS.SHA256(CRYPTO_KEY);
  return CryptoJS.AES.encrypt(JSON.stringify(data), hash, {
    mode: CryptoJS.mode.ECB,
  }).toString();
};

const decryptDataSame = (ciphertext) => {
  try {
    const hash = CryptoJS.SHA256(CRYPTO_KEY);
    const bytes = CryptoJS.AES.decrypt(ciphertext, hash);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch (err) {
    return null;
  }
};

module.exports.encryptData = encryptData;
module.exports.decryptData = decryptData;
module.exports.encryptDataSame = encryptDataSame;
module.exports.decryptDataSame = decryptDataSame;
