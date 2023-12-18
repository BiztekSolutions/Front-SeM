// controllers/commentController.ts
import { Request, Response } from 'express';
import Comment from '../models/Comment';
import Client from '../models/Client';
import User from '../models/User';

export const createComment = async (req: Request, res: Response): Promise<void> => {
  const postId = req.params.postId;
  const { content, userId } = req.body;
  console.log('content', content);
  console.log('postId', postId);

  try {
    const comment = await Comment.create({ content, postId, clientId: userId });

    res.json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deleteComment = async (req: Request, res: Response): Promise<void> => {
  const commentId: number = parseInt(req.params.commentId, 10);
  console.log('commentId', commentId);

  try {
    const comment = await Comment.findByPk(commentId);

    if (!comment) {
      res.status(404).json({ error: 'Comment not found' });
    }

    await comment!.destroy();

    res.json({ message: 'Comment deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
