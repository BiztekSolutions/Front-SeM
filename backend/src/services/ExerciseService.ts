import Exercise from '../models/Exercise';
/*
 * if you need to make calls to additional tables, data stores (Redis, for example),
 * or call an external endpoint as part of creating the blogpost, add them to this service
 */
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

module.exports = {
  list,
  get,
};
