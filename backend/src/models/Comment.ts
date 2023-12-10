// models/Comment.ts
import { DataTypes, Model } from 'sequelize';
import sequelize from '../configs/db';
import Post from './Post';

class Comment extends Model {
  public id!: number;
  public content!: string;
  public clientId!: number;
  public postId!: number; // Cambia aquí para seguir la convención
}

Comment.init(
  {
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Comment',
  }
);
Comment.belongsTo(Post, { foreignKey: 'postId' });

export default Comment;
