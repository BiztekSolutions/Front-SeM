import { DataTypes, Model } from 'sequelize';
import sequelize from '../db';

class Group extends Model {
  public idGroup!: number;
  public name?: string;
}

Group.init(
  {
    idGroup: {
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
    modelName: 'Group',
  }
);

export default Group;
