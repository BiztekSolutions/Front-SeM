import { DataTypes, Model } from 'sequelize';
import sequelize from '../db';

class UserModel extends Model {
  public idUser!: number;
  public name!: string;
  public lastname!: string;
  public rol!: string;
  public created_date!: Date;
  public updated_date!: Date;
}

UserModel.init(
  {
    idUser: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    lastname: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    rol: {
      type: DataTypes.STRING,
    },
    created_date: {
      type: DataTypes.DATE,
    },
    updated_date: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    modelName: 'UserModel',
    timestamps: false,
  }
);

export default UserModel;
