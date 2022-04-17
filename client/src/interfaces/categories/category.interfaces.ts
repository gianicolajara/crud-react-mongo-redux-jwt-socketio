import { typeOfForm } from "../../enums/formUser.enum";

export interface ICategory {
  id: string;
  name: string;
  activate: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICategoryForm {
  typeOfForm: typeOfForm;
  form: ICategoryFormInputs;
}

export interface IFormStateGeneric {
  typeOfForm: typeOfForm;
  form: any;
}

export interface ICategoryFormInputs {
  id?: string;
  name: string;
  activate?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICategoryFormState {
  formCategory: ICategoryForm;
}

export interface ICategoryState {
  categories: ICategory[];
}

export interface ICategoryStore {
  categories: ICategoryState;
}
