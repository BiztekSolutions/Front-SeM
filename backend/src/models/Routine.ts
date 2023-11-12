import { DataTypes, Model } from 'sequelize';
import sequelize from '../db';

class RoutineModel extends Model {
  public idRoutine!: number;
  public name?: string;
  public created_date?: Date;
  public updated_date?: Date;
  public expiration_date?: Date;
  public objective?: string;
  public observation?: string;
}

RoutineModel.init(
  {
    idRoutine: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    created_date: {
      type: DataTypes.DATE,
    },
    updated_date: {
      type: DataTypes.DATE,
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
    modelName: 'RoutineModel',
    timestamps: false,
  }
);

export default RoutineModel;
