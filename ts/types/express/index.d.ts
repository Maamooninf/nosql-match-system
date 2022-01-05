import { User } from "../../interfaces/Userinterface";

declare global {
  namespace Express {
    interface Request {
      user: User;
    }
  }
}
