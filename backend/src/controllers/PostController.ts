import { Request, Response } from 'express';
import Post from '../models/Post';
import Comment from '../models/Comment'; // Asegúrate de importar el modelo Comment
import Client from '../models/Client';
import User from '../models/User';
import Coach from '../models/Coach';
import sequelize from '../configs/db';
import { log } from 'console';

export const getAllPosts = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
  try {
    const posts = await Post.findAll({
      include: [
        {
          model: Comment,
          required: false,
          as: 'Comments',
          include: [
            {
              model: Client,
              required: false,
              include: [
                {
                  model: User, // Agrega el modelo User
                  attributes: ['name', 'lastname', 'avatar'], // Puedes especificar las columnas que deseas recuperar
                },
              ],
            },
            {
              model: Coach,
              required: false,
              include: [
                {
                  model: User, // Agrega el modelo User
                  attributes: ['name', 'lastname', 'avatar'], // Puedes especificar las columnas que deseas recuperar
                },
              ],
            }
          ],
        },
        {
          model: Coach,
          include: [
            {
              model: User,
              attributes: ['name', 'lastname', 'avatar'],
            },
          ],
        },
      ],
    });

    return res.json(posts);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error });
  }
};

export const createPost = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
  const { title, content, userId } = req.body;

  try {
    const coach = await Coach.findOne({ where: { idUser: userId } });

    if (!coach) {
      return res.status(404).json({ error: 'User is not a coach' });
    }

    const newPost = await Post.create({
      title,
      content,
      idCoach: coach ? coach.idCoach : null, 
    });

    return res.json(newPost);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updatePost = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
  const idPost: number = parseInt(req.params.id, 10);
  const { title, content } = req.body;
  console.log(idPost);
  
  try {
    const post = await Post.findByPk(idPost, {
      include: Comment,
    });

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    post.title = title;
    post.content = content;

    await post.save();

    return res.json(post);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deletePost = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
  const idPost: number = parseInt(req.params.id, 10);
  const transaction = await sequelize.transaction();

  try {
    const post = await Post.findByPk(idPost);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const postComments = await Comment.findAll({ where: { idPost } });

    if (postComments) {
      postComments.forEach(async (comment) => {
        await Comment.destroy({ where: { idComment: comment.idComment }, transaction });
      });
    }

    await Post.destroy({ where: { idPost }, transaction });
    await transaction.commit();
    return res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error(error);
    await transaction.rollback();
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
