import axios from "axios";
import { base_url } from "../../utils/utilities";

const getRutines = async (userId) => {
  const response = await axios.get(`http://localhost:3000/users/${userId}`);
  const user = response.data;
  const rutinas = user.rutinas;
  return rutinas;
};

const getAllRutines = async () => {
  const response = await axios.get(`${base_url}/get-all-rutinas`);
  return response.data;
};

const updateRutines = async (data) => {
  try {
    const response = await axios.put(`${base_url}/update-rutines`, data);
    return response.data;
  } catch (error) {
    throw new Error("Failed to update rutines.");
  }
};

export const rutinasService = {
  getRutines,
  getAllRutines,
  updateRutines,
};
