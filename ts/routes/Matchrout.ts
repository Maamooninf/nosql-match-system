import express from "express";
import { globaly } from "../interfaces/main.js";
import {
  createMatch,
  AttachplayerPos,
  getOneMatch,
  updateMatch,
  getMatches,
} from "../controllers/matchController.js";
export default class Matchrout implements globaly {
  public path = "/match";
  public router = express.Router();

  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes() {
    /**
     * @swagger
     * components:
     *   schemas:
     *     Match:
     *       type: object
     *       required:
     *         - teamone
     *         - teamtwo
     *         - date
     *       properties:
     *         teamone:
     *           type: number
     *           description:  refre to team one number
     *
     *         teamtwo:
     *           type: number
     *           description:  refre to team two number
     *
     *         date:
     *          type: string
     *          description:  start time of match
     *       example:
     *         id: 1
     *         teamone: 2
     *         teamtwo: 4
     *         date: 2021-10-01
     *     PlayerMpos:
     *      type: object
     *      required:
     *       - position
     *       - player
     *      properties:
     *       position:
     *        type: string
     *        description:  refre to  position number of a player
     *       player:
     *        type: string
     *        description:  refre to  player number
     *      example:
     *       position: uuid
     *       player: uuid
     *
     */

    /**
     * @swagger
     * /match/getAll:
     *   get:
     *     security:
     *       - Bearer: []
     *     summary: Returns All matches which consisits of two teams and a date
     *     tags: [Match]
     *     responses:
     *       200:
     *         description: The list of the matches
     *         contents:
     *           application/json:
     *             schema:
     *                 $ref: '#/components/schemas/Match'
     *       401:
     *        description: unauthentcated
     *       500:
     *         description: netWork Error
     */
    this.router.get("/getAll", getMatches);

    /**
     * @swagger
     * /match/getone/{id}:
     *   get:
     *     security:
     *       - Bearer: []
     *     summary: Get a match by id
     *     tags: [Match]
     *     parameters:
     *      - in: path
     *        name: id
     *        schema:
     *         type: string
     *        required: true
     *        description: The match id
     *     responses:
     *       200:
     *         description: match
     *         contents:
     *           application/json:
     *             schema:
     *                 $ref: '#/components/schemas/Match'
     *       401:
     *        description: unauthentcated
     *       500:
     *         description: netWork Error
     */
    this.router.get("/getone/:id", getOneMatch);

    /**
     * @swagger
     * /match/create:
     *   post:
     *     security:
     *       - Bearer: []
     *     summary: Create a new match
     *     tags: [Match]
     *     requestBody:
     *      required: true
     *      content:
     *       application/json:
     *        schema:
     *          $ref: '#/components/schemas/Match'
     *     responses:
     *       200:
     *         description: match successfully added
     *         content:
     *           application/json:
     *            schema:
     *             $ref: '#/components/schemas/Match'
     *       401:
     *        description: unauthentcated
     *       400:
     *         description: valdation error
     *       500:
     *          description: Network error
     */
    this.router.post("/create", createMatch);

    /**
     * @swagger
     * /match/attachplayer/{id}:
     *   post:
     *    security:
     *       - Bearer: []
     *    summary: attach a player with position and match
     *    tags: [Match]
     *    parameters:
     *      - in: path
     *        name: id
     *        schema:
     *         type: string
     *        required: true
     *        description: The match id
     *    requestBody:
     *     required: true
     *     content:
     *      application/json:
     *        schema:
     *         $ref: '#/components/schemas/PlayerMpos'
     *    responses:
     *       200:
     *        description: attach successfully added
     *        content:
     *         application/json:
     *           schema:
     *            $ref: '#/components/schemas/PlayerMpos'
     *       401:
     *        description: unauthentcated
     *       404:
     *         description: some prop not found
     *       500:
     *          description: Network error
     */
    this.router.patch("/attachplayer/:id", AttachplayerPos);
    /**
     * @swagger
     * /match/update/{id}:
     *   patch:
     *     security:
     *       - Bearer: []
     *     summary: Update match by id
     *     tags: [Match]
     *     parameters:
     *      - in: path
     *        name: id
     *        schema:
     *         type: string
     *        required: true
     *        description: The match id
     *     requestBody:
     *      required: true
     *      content:
     *       application/json:
     *        schema:
     *          $ref: '#/components/schemas/Match'
     *     responses:
     *       200:
     *         description: The list of the matches
     *         content:
     *           application/json:
     *            schema:
     *             $ref: '#/components/schemas/Match'
     *       401:
     *        description: unauthentcated
     *       400:
     *         description: valdation error
     *       500:
     *          description: Network error
     */

    this.router.patch("/update/:id", updateMatch);
  }
}
