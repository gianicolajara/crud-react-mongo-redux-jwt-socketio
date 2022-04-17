import axios, { AxiosResponse } from "axios";

export const loginService = async (
  username: String,
  password: String
): Promise<AxiosResponse> => {
  try {
    const res: AxiosResponse = await axios.post(
      "http://localhost:5001/api/v1/auth/login",
      {
        username,
        password,
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

export const registerService = async (
  username: string,
  password: string,
  email: string,
  roles: string[]
): Promise<AxiosResponse> => {
  try {
    const res: AxiosResponse = await axios.post(
      "http://localhost:5001/api/v1/auth/register",
      {
        username,
        password,
        email,
        roles,
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
