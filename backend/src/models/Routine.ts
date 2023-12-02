import { DataTypes, Model } from 'sequelize';
import sequelize from '../configs/db';

class Routine extends Model {
  public idRoutine!: number;
  public name?: string;
  public startDate?: Date;
  public endDate?: Date;
  public objective?: string;
  public observation?: string;
  public weekDay?: number;

  // static associate(models: any) {
  //   this.belongsToMany(models.Exercise, { through: models.RoutineHasExercise });
  //   this.hasOne(models.Group);
  // }
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
    startDate: {
      type: DataTypes.DATE,
    },
    endDate: {
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
