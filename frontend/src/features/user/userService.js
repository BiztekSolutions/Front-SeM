import axios from "axios";
import { base_url } from "../../utils/utilities";

const loginUser = async (user) => {
  const response = await axios.post(
    `http://localhost:3000/api/v1/auth/login`,
    user
  );

  return response.data;
};

const updateUser = async (data) => {
  const response = await axios.put(`${base_url}/user/update/${data.userId}`, {
    newUser: data.newUser,
    oldPassword: data.oldPassword,
  });

  return response.data;
};

const getUsers = async (token) => {
  const response = await axios.get("http://localhost:3000/api/v1/users/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const getUser = async (token, userId) => {
  const response = await axios(`http://localhost:3000/api/v1/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const userData = response.data;
  return userData;
};

const deleteUser = async (data) => {
  const response = await axios.post(
    `http://localhost:3000/api/v1/user/delete/${data.userId}`,
    data
  );

  return response.data;
};

export const userService = {
  loginUser,
  updateUser,
  getUser,
  getUsers,
  deleteUser,
};
