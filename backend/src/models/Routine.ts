// models/Routine.ts

import {
  DataTypes,
  Model,
  BelongsToManyAddAssociationMixin,
  BelongsToManyGetAssociationsMixin,
  BelongsToManySetAssociationsMixin,
} from 'sequelize';
import sequelize from '../configs/db';
import GroupExercise from './GroupExercise';

interface RoutineAttributes {
  idRoutine: number;
  name?: string;
  startDate?: Date;
  endDate?: Date;
  objective?: string;
  observation?: string;
  weekDay?: number;
}

interface RoutineCreationAttributes extends Partial<RoutineAttributes> {}

interface RoutineInstance extends Model<RoutineAttributes, RoutineCreationAttributes> {
  addGroupExercise: BelongsToManyAddAssociationMixin<GroupExercise, number>;
  getGroupExercises: BelongsToManyGetAssociationsMixin<GroupExercise>;
  setGroupExercises: BelongsToManySetAssociationsMixin<GroupExercise, number>;
}

class Routine extends Model<RoutineAttributes, RoutineCreationAttributes> implements RoutineInstance {
  public idRoutine!: number;
  public name?: string;
  public startDate?: Date;
  public endDate?: Date;
  public objective?: string;
  public observation?: string;
  public weekDay?: number;

  public addGroupExercise!: BelongsToManyAddAssociationMixin<GroupExercise, number>;
  public getGroupExercises!: BelongsToManyGetAssociationsMixin<GroupExercise>;
  public setGroupExercises!: BelongsToManySetAssociationsMixin<GroupExercise, number>;

  public static associate(models: any): void {
    this.belongsToMany(models.GroupExercise, { through: 'RoutineHasGroupExercise', foreignKey: 'idRoutine' });
  }
}

Routine.init(
  {
    idRoutine: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    startDate: {
      type: DataTypes.DATE,
    },
    endDate: {
      type: DataTypes.DATE,
    },
    objective: {
      type: DataTypes.STRING,
    },
    observation: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: 'Routine',
  }
);

export default Routine;
