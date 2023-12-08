//@ts-nocheck
import { DataTypes, Model } from 'sequelize';
import sequelize from '../configs/db';

class User extends Model {
  public idUser!: number;
  public name!: string;
  public lastname!: string;
  public avatar?: string; // Agrega el campo avatar al modelo
}

User.init(
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
    avatar: {
      type: DataTypes.STRING, // Puedes ajustar el tipo de datos según la URL o ruta de tu avatar
    },
  },
  {
    sequelize,
    modelName: 'User',
    timestamps: false,
  }
);

export default User;
