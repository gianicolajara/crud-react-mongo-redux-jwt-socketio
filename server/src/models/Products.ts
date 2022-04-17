import mongoose from "mongoose";
import { Schema, model } from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";
import { ioConfig } from "../app";
import { IProduct } from "../interfaces/products.interfaces";

const productSchema: Schema<IProduct> = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    category: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Category",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    createdAt: Date,
    updatedAt: Date,
  },
  {
    timestamps: true,
  }
);

productSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

const productModel = model<IProduct>("Product", productSchema);

productSchema.plugin(mongooseUniqueValidator);

productModel.watch().on("change", (change) => {
  ioConfig.emit("server->products->change");
});

export default model("Products", productSchema);
