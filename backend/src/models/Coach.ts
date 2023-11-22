import { DataTypes, Model } from 'sequelize';
import sequelize from '../configs/db';

class Coach extends Model {
  public idCoach!: number;
}

Coach.init(
  {
    idCoach: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  },
  {
    sequelize,
    modelName: 'Coach',
    timestamps: false,
    
  }
);

export default Coach;
