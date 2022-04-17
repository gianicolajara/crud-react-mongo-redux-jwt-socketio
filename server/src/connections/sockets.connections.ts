import { ioConfig } from "../app";

export const socketsConnections: Function = (): void => {
  ioConfig.on("connection", (socket) => {
    console.log(`new client connected ${socket.id}`);
  });

  ioConfig.on("disconnect", (socket) => {
    console.log(`client disconnected ${socket.id}`);
  });
};
