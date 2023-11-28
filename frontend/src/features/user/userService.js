import axios from "axios";
import { base_url } from "../../utils/utilities";

const updateUser = async (data) => {
  const response = await axios.put(`${base_url}/users/update/${data.userId}`, {
    newUser: data.newUser,
    oldPassword: data.oldPassword,
  });

  return response.data;
};

const getUsers = async (token) => {
  const response = await axios.get(`${base_url}/users/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
const getClients = async (token) => {
  const response = await axios.get(`${base_url}/users/allClients`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const addUserToClients = async (token, userId) => {
  const response = await axios.post(
    `${base_url}/users/createClient`,
    {
      userId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

const getUser = async (token, userId) => {
  const response = await axios(`${base_url}/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const userData = response.data;
  return userData;
};

const deleteUser = async (data) => {
  const response = await axios.post(
    `${base_url}/users/delete/${data.userId}`,
    data
  );

  return response.data;
};

export const userService = {
  updateUser,
  addUserToClients,
  getClients,
  getUser,
  getUsers,
  deleteUser,
};
