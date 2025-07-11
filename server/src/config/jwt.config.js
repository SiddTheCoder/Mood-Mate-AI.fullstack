import jwt from "jsonwebtoken";

export const generateJWTToken = (payload, secret, expiresIn) => {
  return jwt.sign(payload, secret, { expiresIn });
};

export const verifyJWTToken = (token, secret) => {
  return jwt.verify(token, secret);
};
