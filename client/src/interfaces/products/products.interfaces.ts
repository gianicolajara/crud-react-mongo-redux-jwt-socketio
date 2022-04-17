export interface IProduct {
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  quantity: number;
}

export interface IProductState {
  products: IProduct[];
}

export interface IProductStore {
  products: IProductState;
}
