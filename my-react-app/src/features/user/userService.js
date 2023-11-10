import axios from "axios";
import { base_url } from "../../utils/utilities";

const loginUser = async (user) => {
  const response = await axios.post(`${base_url}/user/login`, user);

  return response.data;
};

const googleLogin = async (googleUser) => {
  const response = await axios.post(`${base_url}/user/googleAuth`, googleUser);

  return response.data;
};

const updateUser = async (data) => {
  const response = await axios.put(`${base_url}/user/update/${data.userId}`, {
    newUser: data.newUser,
    oldPassword: data.oldPassword,
  });

  return response.data;
};

const getUsers = async () => {
  const response = await axios.get(`http://localhost:3000/users`);

  return response.data;
};

const deleteUser = async (userId) => {
  const response = await axios.delete(`${base_url}/user/delete/${userId}`);

  return response.data;
};

const getUser = async (userId) => {
  const response = await axios(`http://localhost:3000/users/${userId}`);
  const userData = response.data;
  return userData;
};

const createUser = async (data) => {
  const response = await axios.post(`${base_url}/user/create`, data);

  return response.data;
};

export const userService = {
  loginUser,
  updateUser,
  deleteUser,
  googleLogin,
  getUser,
  getUsers,
  createUser,
};
