// var io = req.app.get('socketio');
import express from "express";
import cors from "cors";
import { globaly } from "../interfaces/main";
import mongoose from "mongoose";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import morgan from "morgan";
import { connectstring } from "../config/establish.js";
class App {
  public app: express.Application;
  public port: number;

  constructor(controllers: any, port: number) {
    this.app = express();
    this.port = port;
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    mongoose.set("runValidators", true);
    mongoose
      .connect(connectstring)
      .then(() => {
        console.log("conntected");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  private initializeMiddlewares() {
    let options = {
      definition: {
        openapi: "3.0.0",
        info: {
          title: "Match system",
          version: "1.0.0",
          description: "",
        },

        servers: [
          {
            url: "http://localhost:5000",
          },
        ],
        components: {
          securitySchemes: {
            Bearer: {
              type: "apiKey",
              in: "header",
              name: "Authorization",
            },
          },
        },
        security: {
          Bearer: [],
        },
      },
      apis: ["./server/routes/*.js"],
    };
    const specs = swaggerJSDoc(options);
    this.app.use(morgan("dev"));
    this.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private initializeControllers(controllers: globaly[]) {
    controllers.forEach((controller: globaly) => {
      this.app.use(controller.path, controller.router);
    });
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
}

export default App;
