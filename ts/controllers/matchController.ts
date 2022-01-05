import { Request, Response } from "express";
import { MatchModel } from "../Modal/MatchModal.js";
import { playerPosModel } from "../Modal/PlayerPos.js";
export const getMatches = async (req: Request, res: Response) => {
  try {
    let matchs = await MatchModel.find();
    return res.status(200).send(matchs);
  } catch (err) {
    return res.status(500).send({ err });
  }
};

export const getOneMatch = async (req: Request, res: Response) => {
  try {
    let matches = await MatchModel.findOne({ _id: req.params.id });
    return res.status(200).send(matches);
  } catch (err) {
    return res.status(500).send({ err });
  }
};

export const createMatch = async (req: Request, res: Response) => {
  try {
    let match = new MatchModel();
    match.date = req.body.date;
    match.teamone = req.body.teamone;
    match.teamtwo = req.body.teamtwo;
    match = await match.save();
    return res.status(200).send(match);
  } catch (err) {
    return res.status(500).send({ err });
  }
};
export const AttachplayerPos = async (req: Request, res: Response) => {
  try {
    let match = await MatchModel.findOne({ _id: req.params.id });
    if (match) {
      let player = req.body.player;
      let position = req.body.position;
      let playerpos = new playerPosModel({ player, position });
      let resul = await playerpos.save();
      let id = resul._id;
      await MatchModel.findOneAndUpdate(
        { _id: req.params.id },
        {
          $push: {
            playerPos: id,
          },
        },
        { new: true }
      );
      return res.redirect(303, `/match/getone/${req.params.id}`);
    } else {
      return res.status(404).send("match not found");
    }
  } catch (err) {
    return res.status(500).send({ msg: "network error", err });
  }
};

export const updateMatch = async (req: Request, res: Response) => {
  try {
    let idma = req.params.id;
    await MatchModel.findOneAndUpdate(
      { id: idma },
      {
        $set: {
          teamone: req.body.teamone,
          teamtwo: req.body.teamtwo,
          date: req.body.date,
        },
      },
      { new: true }
    );

    return res.redirect(303, `/match/getone/${idma}`);
  } catch (err) {
    return res.status(500).send(err);
  }
};
