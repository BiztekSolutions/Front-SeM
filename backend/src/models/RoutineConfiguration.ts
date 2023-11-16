import { DataTypes, Model } from 'sequelize';
import sequelize from '../db';

class RoutineConfiguration extends Model {
  public idRoutineConfiguration!: number;
  public series?: number;
  public weight?: number;
  public repetitions?: number;
  public restTime?: number;

}

RoutineConfiguration.init(
  {
    idRoutineConfiguration: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    series: {
      type: DataTypes.INTEGER,
    },
    weight: {
      type: DataTypes.DECIMAL(2),
    },
    repetitions: {
      type: DataTypes.INTEGER,
    },
    restTime: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    modelName: 'RoutineConfiguration',
  }
);

export default RoutineConfiguration;
