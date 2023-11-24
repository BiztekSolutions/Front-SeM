import axios from "axios";

const loginUser = async (user) => {
  const response = await axios.post(
    `http://localhost:3000/api/v1/auth/login`,
    user
  );

  return response.data;
};

const logout = async (userId) => {
  const response = await axios.get("http://localhost:3000/api/v1/logout", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const register = async (data) => {
  const response = await axios.post(
    `http://localhost:3000/api/v1/auth/register`,
    data
  );

  return response.data;
};

export const authService = {
  loginUser,
  logout,
  register,
};
