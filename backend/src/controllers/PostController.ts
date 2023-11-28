import { Request, Response } from 'express';
import Post from '../models/Post';
import Comment from '../models/Comment'; // Asegúrate de importar el modelo Comment

export const getAllPosts = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
  try {
    const posts = await Post.findAll({
      include: [
        {
          model: Comment,
          as: 'Comments', // Utiliza el mismo alias que en la definición de la relación
        },
      ],
    });

    return res.json(posts);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const createPost = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
  const { title, content } = req.body;

  try {
    const newPost = await Post.create({
      title,
      content,
    });

    return res.json(newPost);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updatePost = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
  const postId: number = parseInt(req.params.id, 10);
  const { title, content } = req.body;

  try {
    const post = await Post.findByPk(postId, {
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
