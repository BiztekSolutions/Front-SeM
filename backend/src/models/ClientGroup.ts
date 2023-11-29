import { DataTypes, Model } from 'sequelize';
import sequelize from '../configs/db';

class ClientGroup extends Model {
  public idClientGroup!: number;
}

ClientGroup.init(
  {
    idClientGroup: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'ClientGroup',
    timestamps: false,
  }
);

export default ClientGroup;
