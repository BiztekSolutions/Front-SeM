// controllers/commentController.ts
import { Request, Response } from 'express';
import Comment from '../models/Comment';

export const createComment = async (req: Request, res: Response): Promise<void> => {
  const postId = req.params.postId;
  const { content } = req.body;

  try {
    const comment = await Comment.create({ content, postId });

    res.json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getCommentsForPost = async (req: Request, res: Response): Promise<void> => {
  const postId = req.params.postId;

  try {
    const comments = await Comment.findAll({ where: { postId } });
    res.json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
