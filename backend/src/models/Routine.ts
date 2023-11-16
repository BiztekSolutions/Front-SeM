import { DataTypes, Model } from 'sequelize';
import sequelize from '../db';
import RoutineHasExercise from './RoutineHasExercise';
import RoutineConfiguration from './RoutineConfiguration';
import Exercise from './Exercise';

class Routine extends Model {
  public idRoutine!: number;
  public name?: string;
  public expiration_date?: Date;
  public objective?: string;
  public observation?: string;
}

Routine.init(
  {
    idRoutine: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    expiration_date: {
      type: DataTypes.DATE,
    },
    objective: {
      type: DataTypes.STRING,
    },
    observation: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: 'Routine',
  }
);

export default Routine;
