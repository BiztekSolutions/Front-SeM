import Exercise from '../models/Exercise';

export const list = async () => {
  try {
    return await Exercise.findAll();
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export const get = async (idExercise: number) => {
  try {
    return await Exercise.findByPk(idExercise);
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export const create = async () => {};

export const update = async () => {};

module.exports = {
  list,
  get,
  create,
  update,
};
