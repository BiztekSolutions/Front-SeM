import axios from "axios";
import { base_url } from "../../utils/utilities";

const getRutines = async (userId) => {
  const response = await axios.get(`http://localhost:3000/users/${userId}`);
  const user = response.data;
  const rutinas = user.rutinas;
  return rutinas;
};
const getAllRutines = async () => {
  const response = await axios(`${base_url}/get-all-rutinas`);

  return response.data;
};

export const rutinasService = {
  getRutines,
  getAllRutines,
};
