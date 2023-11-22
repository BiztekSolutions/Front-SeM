import { DataTypes, Model } from 'sequelize';
import sequelize from '../configs/db';

class RoutineHasExercise extends Model {
  public idRoutineHasExercise!: number;
}

RoutineHasExercise.init(
  {
    idRoutineHasExercise: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'RoutineHasExercise',
    timestamps: false,
    
  }
);

export default RoutineHasExercise;
