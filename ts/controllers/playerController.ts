import { Request, Response } from "express";
import { PlayerModel } from "../Modal/PlayerModal.js";
import { TeamModel } from "../Modal/TeamModal.js";
import { PositionModel } from "../Modal/PositionModal.js";
export const getAllPlayers = async (req: Request, res: Response) => {
  try {
    const players = await PlayerModel.find();
    return res.status(200).send(players);
  } catch (err) {
    return res.status(500).send(err);
  }
};

export const getOne = async (req: Request, res: Response) => {
  try {
    const player = await PlayerModel.findOne({ _id: req.params.playerid });
    return res.status(200).send(player);
  } catch (err) {
    return res.status(500).send(err);
  }
};

export const createPlayer = async (req: Request, res: Response) => {
  try {
    let team = await TeamModel.findOne({ _id: req.body.team });
    let pos = await PositionModel.findOne({ _id: req.body.position });
    if (pos && team) {
      let player = new PlayerModel();
      player.name = req.body.name;
      player.position = req.body.position;
      player.team = req.body.team;
      let pl = await player.save();
      return res.status(200).send(pl);
    } else if (pos) {
      let player = new PlayerModel();
      player.name = req.body.name;
      player.position = pos;
      let pl = await player.save();
      return res.status(200).send(pl);
    }
    return res.status(404).send({ err: "position not found!" });
  } catch (err) {
    return res.status(500).send(err);
  }
};

export const updateplayer = async (req: Request, res: Response) => {
  try {
    let body = req.body;
    await PlayerModel.findOneAndUpdate({ _id: req.params.id }, body);
    return res.redirect(303, `/player/getone/${req.params.id}`);
  } catch (err) {
    return res.status(500).send(err);
  }
};

// export const addMatchandpos = async (req: Request, res: Response) => {
//   try {
//     let idpl = req.body.player;
//     let playerRepo = getRepository(Player);
//     let PosRepo = getRepository(Position);
//     let MatchRepo = getRepository(Match);
//     let JuncRep = getRepository(PlayerMPos);
//     const [player, match, position] = await Promise.all([
//       playerRepo.findOne(idpl),
//       MatchRepo.findOne(req.body.match),
//       PosRepo.findOne(req.body.position),
//     ]);
//     let junc = new PlayerMPos();
//     if (player && match && position) {
//       junc.player = player;
//       junc.match = match;
//       junc.pos = position;
//       junc = await JuncRep.save(junc);
//       return res.status(200).send(junc);
//     } else {
//       return res.status(404).send({ err: "some prop is not found" });
//     }
//   } catch (err) {
//     return res.status(500).send(err);
//   }
// };
