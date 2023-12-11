import { DataTypes, Model } from 'sequelize';
import sequelize from '../configs/db';

class ExerciseConfiguration extends Model {
  public idRoutineConfiguration!: number;
  public series?: number;
  public day?: String;
  public weight?: number;
  public repetitions?: number;
  public restTime?: number;
  public order?: number;
}

ExerciseConfiguration.init(
  {
    idRoutineConfiguration: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    series: {
      type: DataTypes.INTEGER,
    },
    repetitions: {
      type: DataTypes.INTEGER,
    },
    order: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    modelName: 'ExerciseConfiguration',
    timestamps: false,
  }
);

export default ExerciseConfiguration;
