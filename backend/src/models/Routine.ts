import { DataTypes, Model } from 'sequelize';
import sequelize from '../configs/db';

class Routine extends Model {
  public idRoutine!: number;
  public name?: string;
  public expiration_date?: Date;
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
    expiration_date: {
      type: DataTypes.DATE,
    },
    objective: {
      type: DataTypes.STRING,
    },
    observation: {
      type: DataTypes.STRING,
    },
    weekDay: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    modelName: 'Routine',
    
  }
);

export default Routine;
