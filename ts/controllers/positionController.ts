import { Request, Response } from "express";
import { PositionModel } from "../Modal/PositionModal.js";

export const getAllpos = async (req: Request, res: Response) => {
  try {
    const positions = await PositionModel.find();
    return res.status(200).send(positions);
  } catch (err) {
    return res.status(500).send({ err });
  }
};

export const getone = async (req: Request, res: Response) => {
  try {
    const positions = await PositionModel.findById(req.params.id);
    return res.status(200).send(positions);
  } catch (err) {
    return res.status(500).send({ err });
  }
};

export const createPos = async (req: Request, res: Response) => {
  try {
    let pos = new PositionModel();
    pos.name = req.body.name;
    let result = await pos.save();
    return res.status(200).send(result);
  } catch (err) {
    return res.status(500).send({ err });
  }
};

export const updatePos = async (req: Request, res: Response) => {
  try {
    let body = req.body;
    await PositionModel.findOneAndUpdate({ _id: req.params.id }, body);
    return res.redirect(303, `/position/getone/${req.params.id}`);
  } catch (err) {
    return res.status(500).send({ err });
  }
};
