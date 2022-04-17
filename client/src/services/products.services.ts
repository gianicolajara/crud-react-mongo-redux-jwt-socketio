import axios, { AxiosResponse } from "axios";

export const addProductService = async (
  name: string,
  price: number,
  description: string,
  category: string,
  quantity: number
): Promise<AxiosResponse> => {
  try {
    const res: AxiosResponse = await axios.post(
      "http://localhost:5001/api/v1/products/create",
      {
        name,
        price,
        description,
        category,
        quantity,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return res;
  } catch (error) {
    throw error;
  }
};

export const getAllProductsService = async (): Promise<AxiosResponse> => {
  try {
    const res: AxiosResponse = await axios.get(
      "http://localhost:5001/api/v1/products",
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return res;
  } catch (error) {
    throw error;
  }
};
