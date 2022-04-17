import { Server as ServerHTTP } from "http";
import { Server as WebSocketServer } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

export const configureSocketIo = (
  server: number | ServerHTTP
): WebSocketServer<
  DefaultEventsMap,
  DefaultEventsMap,
  DefaultEventsMap,
  any
> => {
  const io: WebSocketServer<
    DefaultEventsMap,
    DefaultEventsMap,
    DefaultEventsMap,
    any
  > = new WebSocketServer(server, {
    cors: {
      origin: "http://localhost:3000",
      allowedHeaders: ["Access-Control-Allow-Origin"],
      credentials: true,
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    },
  });

  return io;
};
