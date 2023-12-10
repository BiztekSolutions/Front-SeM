// models/Post.ts
import { DataTypes, Model } from 'sequelize';
import sequelize from '../configs/db';
import Comment from './Comment';

class Post extends Model {
  public id!: number;
  public title!: string;
  public content!: string;
  public clientId!: number;
}

Post.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Post',
  }
);

export default Post;
