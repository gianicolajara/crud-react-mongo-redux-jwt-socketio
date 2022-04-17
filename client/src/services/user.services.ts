import axios, { AxiosResponse } from "axios";

export const getAllUsers = async (): Promise<AxiosResponse> => {
  console.log("getAllUsers ------------------------");
  try {
    const resGetAllUsers = await axios.get(
      "http://localhost:5001/api/v1/users"
    );
    return resGetAllUsers;
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (
  id: string,
  userToUpdate: {}
): Promise<AxiosResponse> => {
  try {
    const resUpdateUser = await axios.put(
      `http://localhost:5001/api/v1/users/update/${id}`,
      userToUpdate,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return resUpdateUser;
  } catch (error) {
    throw error;
  }
};

export const updateActivateUser = async (
  id: string,
  body: {}
): Promise<AxiosResponse> => {
  try {
    const resDeleteUser = await axios.put(
      `http://localhost:5001/api/v1/users/delete/${id}`,
      body,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return resDeleteUser;
  } catch (error) {
    throw error;
  }
};
