import { Schema, model, Model } from "mongoose";
import bcrypt from "bcryptjs";
import { IUser, IUserModel } from "../interfaces/user.interfaces";
import uniqueValidator from "mongoose-unique-validator";
import { ioConfig } from "../app";

const userSchema: Schema<IUser, IUserModel> = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
    createdAt: Date,
    updatedAt: Date,
    roles: [
      {
        type: String,
        enum: ["user", "admin"],
        default: "user",
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    delete ret.password;
  },
});

userSchema.statics.passwordCrypt = async function (
  password: string
): Promise<string> {
  try {
    const salt: string = await bcrypt.genSalt(10);
    const hash: string = await bcrypt.hash(password, salt);
    return hash;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

userSchema.statics.passwordEncrypt = async function (
  password: string,
  hash: string
): Promise<boolean> {
  try {
    return await bcrypt.compare(password, hash);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

userSchema.plugin(uniqueValidator);

const Users: IUserModel = model<IUser, IUserModel>("Users", userSchema);

//Users changes to Socket.io
Users.watch().on("change", (change) => {
  console.log("cambios en el users");
  // users changed
  ioConfig.emit("server->users->change");
});

export default Users;
