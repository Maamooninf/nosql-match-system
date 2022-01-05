import express from "express";
import { globaly } from "../interfaces/main.js";
// import { isloggedin } from "../initialApp/auth";
import {
  getAllPlayers,
  createPlayer,
  getOne,
  updateplayer,
} from "../controllers/playerController.js";
export default class Playerrout implements globaly {
  public path = "/player";
  public router = express.Router();

  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes() {
    /**
     * @swagger
     * components:
     *   schemas:
     *    Player:
     *        type: object
     *        required:
     *         - position
     *         - name
     *        properties:
     *         position:
     *           type: string
     *           description:  refre to default position of a player
     *         name:
     *           type: string
     *           description:  player's name
     *         team:
     *          type: string
     *          description:  refer to player's team
     *        example:
     *         name: mohammed
     *         team: 6181...
     *         position: 6181...

     *
     */

    /**
     * @swagger
     * /player/getAll:
     *   get:
     *     security:
     *       - Bearer: []
     *     summary: Returns All players
     *     tags: [Player]
     *     responses:
     *       200:
     *         description: The list of the players
     *         contents:
     *           application/json:
     *             schema:
     *                 $ref: '#/components/schemas/Player'
     *       401:
     *        description: unauthentcated
     *       500:
     *         description: netWork Error
     */

    this.router.get("/getAll", getAllPlayers);

    /**
     * @swagger
     * /player/getone/{playerid}:
     *   get:
     *     security:
     *       - Bearer: []
     *     summary: Get a player by id
     *     tags: [Player]
     *     parameters:
     *      - in: path
     *        name: playerid
     *        schema:
     *         type: string
     *        required: true
     *        description: The player id
     *     responses:
     *       200:
     *         description: player
     *         contents:
     *           application/json:
     *             schema:
     *                 $ref: '#/components/schemas/Player'
     *       401:
     *        description: unauthentcated
     *       404:
     *        description: position not found
     *       500:
     *         description: netWork Error
     */
    this.router.get("/getone/:playerid", getOne);

    /**
     * @swagger
     * /player/create:
     *   post:
     *     security:
     *       - Bearer: []
     *     summary: create a player (if team dose not exists it will be null)
     *     tags: [Player]
     *     requestBody:
     *      required: true
     *      content:
     *       application/json:
     *        schema:
     *          $ref: '#/components/schemas/Player'
     *     responses:
     *       200:
     *         description: player created successfully
     *         content:
     *           application/json:
     *            schema:
     *             $ref: '#/components/schemas/Player'
     *       401:
     *        description: unauthentcated
     *       404:
     *         description: position not found
     *       500:
     *          description: Network error
     */
    this.router.post("/create", createPlayer);

    /**
     * @swagger
     * /player/update/{playerid}:
     *   patch:
     *     security:
     *       - Bearer: []
     *     summary: Update player by id
     *     tags: [Player]
     *     parameters:
     *      - in: path
     *        name: playerid
     *        schema:
     *         type: string
     *        required: true
     *        description: player id
     *     requestBody:
     *      required: true
     *      content:
     *       application/json:
     *        schema:
     *          $ref: '#/components/schemas/Player'
     *     responses:
     *       200:
     *         description: player updated successfully
     *         content:
     *           application/json:
     *            schema:
     *             $ref: '#/components/schemas/Player'
     *       401:
     *        description: unauthentcated
     *       500:
     *          description: Network error
     */

    this.router.patch("/update/:playerid", updateplayer);
  }
}
