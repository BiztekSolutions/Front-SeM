// models/Group.ts
import { DataTypes, Model } from 'sequelize';
import {
  BelongsToManyGetAssociationsMixin,
  BelongsToManyAddAssociationMixin,
  HasOneGetAssociationMixin,
  HasOneSetAssociationMixin,
} from 'sequelize';
import User from './User';
import Routine from './Routine';
import Client from './Client'; // Importa el modelo Client
import sequelize from '../configs/db';

class Group extends Model {
  public idGroup!: number;
  public name?: string;

  // Definir la relación con Client
  public getClients!: BelongsToManyGetAssociationsMixin<Client>;
  public addClient!: BelongsToManyAddAssociationMixin<Client, number>;

  public getRoutine!: HasOneGetAssociationMixin<Routine>;
  public setRoutine!: HasOneSetAssociationMixin<Routine, number>;
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
