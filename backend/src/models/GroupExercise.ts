import { DataTypes, Model, BelongsToManyAddAssociationMixin, BelongsToManyGetAssociationsMixin } from 'sequelize';
import sequelize from '../configs/db';
import Exercise from './Exercise';

interface GroupExerciseAttributes {
  idGroupExercise: number;
  day?: string;
}

interface GroupExerciseCreationAttributes extends Partial<GroupExerciseAttributes> {}

interface GroupExerciseInstance extends Model<GroupExerciseAttributes, GroupExerciseCreationAttributes> {
  addExercise: BelongsToManyAddAssociationMixin<Exercise, number>;
  getExercises: BelongsToManyGetAssociationsMixin<Exercise>;
}

class GroupExercise extends Model<GroupExerciseAttributes, GroupExerciseCreationAttributes> implements GroupExerciseInstance {
  public idGroupExercise!: number;
  public day?: string;

  public addExercise!: BelongsToManyAddAssociationMixin<Exercise, number>;
  public getExercises!: BelongsToManyGetAssociationsMixin<Exercise>;

  public static associate(models: any): void {
    this.belongsToMany(models.Exercise, { through: 'GroupExerciseHasExercise', foreignKey: 'idGroupExercise' });
  }
}

GroupExercise.init(
  {
    idGroupExercise: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    day: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: 'GroupExercise',
    timestamps: false,
  }
);

export default GroupExercise;
