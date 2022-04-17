import express, { application, Express } from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import authRouter from "./routes/auth.routes";
import handleError from "./middlewares/handleError";
import { handleExpressValidator } from "./middlewares/handleExpressValidator";
import cors from "cors";
import notFoundRouter from "./routes/notFound.routes";
import userRouter from "./routes/user.routes";
import { configureSocketIo } from "./config/socket.config";
import { Server } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { socketsConnections } from "./connections/sockets.connections";
import http from "http";
import "./db";
import productsRouter from "./routes/products.routes";
import categoryRouter from "./routes/category.routes";

dotenv.config();

const app: Express = express();

const server: http.Server = http.createServer(app);
const ioConfig: Server<
  DefaultEventsMap,
  DefaultEventsMap,
  DefaultEventsMap,
  any
> = configureSocketIo(server);

socketsConnections();

//Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

//Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productsRouter);
app.use("/api/v1/category", categoryRouter);

//Middlewares errors and validators
app.use(handleExpressValidator);
app.use(handleError);
app.use(notFoundRouter);

export default server;
export { ioConfig };
