import { NextApiRequest } from "next";
export interface IGetUserAuthInfoRequest extends NextApiRequest {
  user: any;
}
