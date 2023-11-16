import { DataTypes, Model } from 'sequelize';
import sequelize from '../db';

class RoutineHasExercise extends Model {
  public Routine_idRoutine!: number;
  public Exercise_idExercise!: number;
  public weekDay?: Date;
}

RoutineHasExercise.init(
  {
    Routine_idRoutine: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    Exercise_idExercise: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    weekDay: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    modelName: 'RoutineHasExercise',
  }
);

export default RoutineHasExercise;
