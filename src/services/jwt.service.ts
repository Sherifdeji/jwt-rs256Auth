// src/services/jwt.service.ts

import jwt from "jsonwebtoken";
import { currentKid, keys } from "../utils/keyStore";

export const signToken = (payload: object) => {
  const privateKey = keys[currentKid].privateKey;

  return jwt.sign(payload, privateKey, {
    algorithm: "RS256",
    expiresIn: "1d",
    header: {
      kid: currentKid,
    },
  });
};

export const verifyToken = (token: string) => {
  const decodedHeader = jwt.decode(token, { complete: true }) as any;

  if (!decodedHeader || !decodedHeader.header.kid) {
    throw new Error("Invalid token header");
  }

  const { kid } = decodedHeader.header;
  const publicKey = keys[kid]?.publicKey;

  if (!publicKey) {
    throw new Error("Public key not found for kid");
  }

  return jwt.verify(token, publicKey, { algorithms: ["RS256"] });
};
