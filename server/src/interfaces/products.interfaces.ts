import mongoose from "mongoose";

export interface IProduct {
  name: string;
  price: number;
  description: string;
  image: string;
  category: mongoose.Schema.Types.ObjectId;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
}
