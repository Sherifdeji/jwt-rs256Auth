import jwt from "jsonwebtoken";
import { currentKid, keys } from "../utils/keyStore";

// Signs a payload and returns a JWT using the private key
export const signToken = (payload: object) => {
  const privateKey = keys[currentKid].privateKey;

  return jwt.sign(payload, privateKey, {
    algorithm: "RS256", // Asymmetric signing algorithm
    expiresIn: "1d",
    keyid: currentKid, // Key ID for identifying the key used
  });
};

// Verifies a JWT and returns the decoded payload
export const verifyToken = (token: string) => {
  // Decode token to extract header (but don't verify it yet)
  const decodedHeader = jwt.decode(token, { complete: true }) as any;

  if (!decodedHeader || !decodedHeader.header.kid) {
    throw new Error("Invalid token header"); // Ensure 'kid' is present
  }

  const { kid } = decodedHeader.header;

  // Get the public key that matches the 'kid' from the keystore
  const publicKey = keys[kid]?.publicKey;

  if (!publicKey) {
    throw new Error("Public key not found for kid");
  }

  // Verify token using public key and expected algorithm
  return jwt.verify(token, publicKey, { algorithms: ["RS256"] });
};
