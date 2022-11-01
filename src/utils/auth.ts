import jwt from "jsonwebtoken";
import type { NextApiResponse } from "next";
import { IGetUserAuthInfoRequest } from "src/interfaces/IGetUserAuthInfoRequest";
import { IUser } from "src/interfaces/IUser";
const secret = process.env.NEXT_PUBLIC_JWT_SECRET;

const signToken = (user: IUser) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      isAdmin: user.isAdmin,
    },
    secret!,
    {
      expiresIn: "30d",
    }
  );
};

const isAuth = async (
  req: IGetUserAuthInfoRequest,
  res: NextApiResponse,
  next: any
) => {
  return new Promise((resolve, reject) => {
    const { authorization } = req.headers;
    if (authorization) {
      const token = authorization.slice(7, authorization.length); // BEARER XXX
      jwt.verify(token, secret!, (err, decode) => {
        if (err) {
          res.status(401).send({ message: "Token is not valid" });
        } else {
          req.user = decode;
          next();
        }
      });
    } else {
      res.status(401).send({ message: "Token is not suppiled" });
    }
  });
};
export { signToken, isAuth };
