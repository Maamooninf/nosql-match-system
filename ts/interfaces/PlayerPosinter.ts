import { Player } from "./Playerinterface";
import { Position } from "./Positioninterface";

export interface PlayerPos {
  _id: string;
  name: string;
  player: Player;
  position: Position;
}
