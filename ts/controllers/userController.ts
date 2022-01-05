import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import { UserModel } from "../Modal/UserModal.js";
import { geneerror } from "../errors/userrerrors.js";
import { User } from "../interfaces/Userinterface.js";
import { hashword, degree } from "../config/establish.js";
export const Signincont = async (req: Request, res: Response) => {
  try {
    const user = req.body as User;

    let result = (await UserModel.findOne({ username: user.username })) as User;
    if (!result) {
      return res.status(404).send({ msg: "user dose not exits" });
    } else {
      if (user.password === undefined) user.password = "";
      const match = await bcrypt.compare(user.password, result.password);

      if (match && user.password) {
        jwt.sign(
          { _id: result._id, isAdmin: result.isAdmin },
          hashword,
          { expiresIn: "24h" },
          (err, token) => {
            if (err) {
              return res.status(402).send({ msg: "error in token" });
            } else {
              return res.status(200).send({
                token,
              });
            }
          }
        );
      } else {
        return res.status(402).send({ msg: "user not found" });
      }
    }
  } catch (err) {
    return res.status(500).send(err);
  }
};

export const Signupcont = (req: Request, res: Response) => {
  try {
    var { name, password, confirmpass, username, isAdmin } = req.body;

    var errpass: string = "";
    var errex: string = "";
    if (password !== confirmpass) {
      errpass = "password and confirme are not the same";
      console.log(errpass);
    }
    UserModel.findOne({ username: username })
      .then((found) => {
        if (found) {
          errex = "user already exists";
        }
        bcrypt.hash(password, degree, function (err: any, hashv: string) {
          if (err) {
            return res.status(402).send({ msg: err });
          } else {
            const user = new UserModel({ username, password, isAdmin });
            user
              .validate()
              .then(() => {
                if (errex !== "" || errpass !== "") {
                  return res.status(402).send({ errex, errpass });
                } else {
                  user.password = hashv;
                  user.tepassword = "";
                  user
                    .save()
                    .then(() => {
                      return res
                        .status(200)
                        .send({ msg: "Successfully sign up", resu: user });
                    })
                    .catch((err) => {
                      let fields = geneerror(err, "path");
                      let messages = geneerror(err, "message");
                      return res.status(402).send({ fields, messages });
                    });
                }
              })
              .catch((err: any) => {
                let fields = geneerror(err, "path");
                let messages = geneerror(err, "message");
                return res
                  .status(402)
                  .send({ fields, messages, errpass, errex });
              });
          }
        });
      })

      .catch((err) => {
        return res.status(500).send({ msg: "error in network" });
      });
  } catch (err) {
    return res.status(402).send(err);
  }
};
