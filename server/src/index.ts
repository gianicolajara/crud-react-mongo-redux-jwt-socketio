import server from "./app";

server.listen(process.env.PORT || 5001, () => {
  console.log("is connected to port", process.env.PORT || 5001);
});
