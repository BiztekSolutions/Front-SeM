import axios from "axios";
import { base_url } from "../../utils/utilities";

const getRutines = async (userId, token) => {
  try {
    const response = await axios.get(`${base_url}/users/${userId}/routines`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const user = response.data;
    console.log(user, "ansdoansdonasodnas");
    // Obtener un array de promesas para las solicitudes de rutinas individuales
    const routinePromises = user.routines.map(async (routine) => {
      const routineResponse = await axios.get(
        `${base_url}/routines/${routine.idRoutine}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return routineResponse.data;
    });

    // Esperar a que todas las solicitudes se completen
    const routinesDetails = await Promise.all(routinePromises);

    return routinesDetails;
  } catch (error) {
    // Manejar errores aquí
    console.error(error);
    throw error;
  }
};

const getAllRutines = async () => {
  const response = await axios.get(`${base_url}/get-all-rutinas`);
  return response.data;
};

const updateRutines = async (data, idRutina) => {
  try {
    const response = await axios.put(`${base_url}/routines/${idRutina}`, data);
    return response.data;
  } catch (error) {
    throw new Error("Failed to update rutines.");
  }
};

const createRutine = async (data, token) => {
  try {
    console.log("data", data);
    console.log("token", token);
    const response = await axios.post(`${base_url}/routines`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to create rutine.");
  }
};

export const rutinasService = {
  getRutines,
  getAllRutines,
  updateRutines,
  createRutine,
};
