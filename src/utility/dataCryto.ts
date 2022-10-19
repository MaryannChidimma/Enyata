import jwt from "jsonwebtoken";
import constants from "../config/constants";
import bcrypt from "bcrypt";
/**
 *
 * @param dataToEncrypt This is the data that will encryped
 * @param expirationTime The expiration time in hrs
 */

const encryptData = function (
  dataToEncrypt: object,
  expirationTime: string = constants.JWT_Customer_LOGIN_EXPIRATION,
  secretKey: string = constants.JWT_SECRET_KEY!
) {
  const encryptedData = jwt.sign(dataToEncrypt, secretKey, {
    expiresIn: expirationTime,
  });

  return encryptedData;
};

const decryptData = function (
  tokenToDecrypt: string,
  secretKey: string = constants.JWT_SECRET_KEY!
) {
  const decryptedData = jwt.verify(tokenToDecrypt, secretKey!);
  return decryptedData as any;
};

const passwordHash = async function (stringToHash: string) {
  const hashedPassword = await bcrypt.hash(stringToHash, 12);
  return hashedPassword;
};
const comparePassword = async (password: string, hashedPassword: string) => {
  const isPasswordCorrect = await bcrypt.compare(
    password.trim(),
    hashedPassword,
  );
  return isPasswordCorrect;
};

const genRandomChar = (len: number) => {
  let text = "";
  let possible =
    "123456789ABCDEFGHJKLMNP123456789QRSTUVWXYZabcdefghjkmnpqrstuvwxyz123456789";

  for (let i = 0; i < len; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text.toUpperCase();
};

export { encryptData, decryptData, passwordHash, comparePassword, genRandomChar };
