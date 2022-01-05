import App from "./initialapp/App.js";
import Positionrout from "./routes/Positionrout.js";
import Teamrout from "./routes/Teamrout.js";
import Userrout from "./routes/Userrout.js";
import Playerrout from "./routes/Playerrout.js";
import Matchrout from "./routes/Matchrout.js";
import dotenv from "dotenv";
dotenv.config();
const app = new App(
  [
    new Userrout(),
    new Positionrout(),
    new Teamrout(),
    new Playerrout(),
    new Matchrout(),
  ],
  5000
);

app.listen();
