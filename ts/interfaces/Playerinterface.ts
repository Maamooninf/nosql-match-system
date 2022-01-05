import { Position } from "./Positioninterface";
import { Team } from "./Teaminterface";

export interface Player {
  _id: string;
  name: string;
  team: Team;
  position: Position;
}
