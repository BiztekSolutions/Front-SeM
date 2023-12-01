import { DataTypes, Model } from 'sequelize';
import sequelize from '../configs/db';

class RoutineConfiguration extends Model {
  public idRoutineConfiguration!: number;
  public series?: number;
  public day?: String;
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
    },
    day: {
      type: DataTypes.STRING,
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
    timestamps: false,
  }
);

export default RoutineConfiguration;
