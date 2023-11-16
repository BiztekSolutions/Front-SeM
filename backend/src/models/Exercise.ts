import { DataTypes, Model } from 'sequelize';
import sequelize from '../db';

class Exercise extends Model {
  public idExercise!: number;
  public name?: string;
}

Exercise.init(
  {
    idExercise: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: 'Exercise',
  }
);

export default Exercise;