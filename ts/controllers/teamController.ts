import { Request, Response } from "express";

import { TeamModel } from "../Modal/TeamModal.js";
export const getAllteams = async (req: Request, res: Response) => {
  try {
    const teams = await TeamModel.find();
    return res.status(200).send(teams);
  } catch (err) {
    return res.status(500).send({ err });
  }
};

export const getone = async (req: Request, res: Response) => {
  try {
    const team = await TeamModel.findOne({ _id: req.params.id });
    return res.status(200).send(team);
  } catch (err) {
    return res.status(500).send({ err });
  }
};

export const createTeam = async (req: Request, res: Response) => {
  try {
    let team = new TeamModel();
    team.name = req.body.name;
    let result = await team.save();
    return res.status(200).send(result);
  } catch (err) {
    return res.status(500).send({ err });
  }
};
