import { Player } from "./Playerinterface";
import { Team } from "./Teaminterface";

export default interface Match {
  _id: string;
  date: Date;
  teamone: Team;
  teamtwo: Team;
  playerPos: Array<any>;
}
