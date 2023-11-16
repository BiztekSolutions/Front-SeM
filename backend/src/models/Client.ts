import { DataTypes, Model } from 'sequelize';
import sequelize from '../db';

class Client extends Model {
  public idClient!: number;
}

Client.init(
  {
    idClient: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  },
  {
    sequelize,
    modelName: 'Client',
    timestamps: false,
  }
);

export default Client;
