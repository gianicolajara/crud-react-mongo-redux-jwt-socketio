import io, { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

export const socket: Socket<DefaultEventsMap, DefaultEventsMap> = io(
  "http://localhost:5001",
  {
    withCredentials: true,
    extraHeaders: {
      "Access-Control-Allow-Origin": "http://localhost:5001",
    },
  }
);
