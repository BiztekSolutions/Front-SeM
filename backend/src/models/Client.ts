import { DataTypes, Model, BelongsToManyAddAssociationMixin, BelongsToManyGetAssociationsMixin } from 'sequelize';
import sequelize from '../configs/db';
import Routine from './Routine';

interface ClientAttributes {
  idClient: number;
  idUser: number;
}

interface ClientCreationAttributes extends Partial<ClientAttributes> {}

interface ClientInstance extends Model<ClientAttributes, ClientCreationAttributes> {
  addRoutine: BelongsToManyAddAssociationMixin<Routine, number>;
  getRoutines: BelongsToManyGetAssociationsMixin<Routine>;
}

class Client extends Model<ClientAttributes, ClientCreationAttributes> implements ClientInstance {
  public idClient!: number;
  public idUser!: number;

  public addRoutine!: BelongsToManyAddAssociationMixin<Routine, number>;
  public getRoutines!: BelongsToManyGetAssociationsMixin<Routine>;

  public static associate(models: any): void {
    this.belongsToMany(models.Routine, { through: 'ClientRoutine', foreignKey: 'clientId' });
  }
}

Client.init(
  {
    idClient: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    idUser: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Client',
    timestamps: false,
  }
);

export default Client;
