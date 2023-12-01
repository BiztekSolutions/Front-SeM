import { DataTypes, Model } from 'sequelize';
import sequelize from '../configs/db';

class Exercise extends Model {
  public idExercise!: number;
  public name?: string;
  public description?: string;
  public type?: string;
  public video?: string; // Nuevo campo: URL del video
  public image1?: string; // Nuevo campo: URL de la primera imagen
  public image2?: string; // Nuevo campo: URL de la segunda imagen
}

Exercise.init(
  {
    idExercise: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING, // Puedes ajustar el tipo según tus necesidades
    },
    type: {
      type: DataTypes.STRING, // Puedes ajustar el tipo según tus necesidades
    },
    name: {
      type: DataTypes.STRING,
    },
    videoUrl: {
      type: DataTypes.STRING, // Puedes ajustar el tipo según tus necesidades
    },
    image1: {
      type: DataTypes.STRING, // Puedes ajustar el tipo de datos según tus necesidades
    },
    image2: {
      type: DataTypes.STRING, // Puedes ajustar el tipo de datos según tus necesidades
    },
  },
  {
    sequelize,
    modelName: 'Exercise',
    timestamps: false,
  }
);

export default Exercise;
