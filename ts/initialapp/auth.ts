import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

import { hashword } from "../config/establish.js";
import { User } from "../interfaces/Userinterface";
const isloggedin = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;
    console.log(hashword);
    if (authorization) {
      const decoded = jwt.verify(authorization, hashword) as User;
      if (decoded && decoded.isAdmin) {
        req.user = decoded;
        next();
      } else {
        return res.status(401).json({ msg: "You are not authenticated!" });
      }
    } else {
      return res.status(401).json({ msg: "You need to login" });
    }
  } catch (err) {
    return res.status(401).json({ err });
  }
};
export { isloggedin };
