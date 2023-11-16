import { DataTypes, Model } from 'sequelize';
import sequelize from '../db';

class Credential extends Model {
  public idCredential!: number;
  public email!: string;
  public password!: string;
  public created_date!: Date;
  public updated_date!: Date;

}

Credential.init(
  {
    idCredential: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
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
    modelName: 'Credential',
    timestamps: false,
  }
);

export default Credential;
