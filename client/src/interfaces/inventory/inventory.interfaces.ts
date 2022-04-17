import { typeOfForm } from "../../enums/formUser.enum";

export interface IProduct {
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  quantity: number;
}

export interface IProductForm {
  typeOfForm: typeOfForm.create;
  form: IProduct;
}

export interface IFormInventoryState {
  formInventory: IProductForm;
}

export interface IProductState {
  products: IProduct[];
}
