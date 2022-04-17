import { Schema, model } from "mongoose";
import { ioConfig } from "../app";
import { ICategory } from "../interfaces/category.interfaces";
import mongooseUniqueValidator from "mongoose-unique-validator";

const CategorySchema: Schema<ICategory> = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    activate: {
      type: Boolean,
      default: true,
    },
    createAt: {
      type: Date,
    },
    updateAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

CategorySchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

CategorySchema.plugin(mongooseUniqueValidator);

const Category = model<ICategory>("Category", CategorySchema);

Category.watch().on("change", (change) => {
  ioConfig.emit("server->category->changes");
});

export default Category;
