// services/groupService.js
import axios from "axios";
import { base_url } from "../../utils/utilities";

const createGroup = async (token, groupData) => {
  const response = await axios.post(`${base_url}/groups`, groupData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const getGroup = async (token, idGroup) => {
  const response = await axios.get(`${base_url}/groups/${idGroup}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
const deleteGroup = async (token, groupId) => {
  const response = await axios.put(`${base_url}/groups/${groupId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const getGroups = async () => {
  const response = await axios.get(`${base_url}/groups`);
  return response.data;
};

const setRoutineGroup = async (token, data) => {
  const response = await axios.post(`${base_url}/groups/set-routine`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const groupService = {
  createGroup,
  getGroup,
  getGroups,
  setRoutineGroup,
  deleteGroup,
};
