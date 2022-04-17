import mongoose from "mongoose";

const mongooseConnect: Function = async (): Promise<void> => {
  try {
    await mongoose.connect("mongodb://localhost:27017/", {
      dbName: "inventoryShop",
      connectTimeoutMS: 10000,
      maxPoolSize: 10,
      ssl: false,
      replicaSet: "rs0",
    });

    console.log("connected to mongodb is done");
  } catch (error) {
    console.error("error mongodb", error);
  }

  mongoose.connection.on("error", (error: any) => {
    console.error("error mongodb", error);
  });
};

mongooseConnect();
