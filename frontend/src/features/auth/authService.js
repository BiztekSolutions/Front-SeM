import axios from "axios";
import { base_url } from "@/utils/utilities";

const login = async (user) => {
  const response = await axios.post(
    `${base_url}/auth/login`,
    user
  );

  return response.data;
};

const logout = async (userId, token) => {
  const response = await axios.get(
    `${base_url}/auth/logout`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

const register = async (data) => {
  const response = await axios.post(
    `${base_url}/auth/register`,
    data
  );

  return response.data;
};

export const authService = {
  login,
  logout,
  register,
};
