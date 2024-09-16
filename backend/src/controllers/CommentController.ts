// controllers/commentController.ts
import { Request, Response } from 'express';
import Comment from '../models/Comment';
import Client from '../models/Client';
import Coach from '../models/Coach';

export const createComment = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
  const idPost = req.params.idPost;
  const { content, userId } = req.body;

  try {
    const coach = await Coach.findByPk(userId);
    if (!!coach) {
      const comment = await Comment.create({ content, idPost, idCoach: coach.idCoach });
      return res.status(201).json(comment);
    }
    const client = await Client.findOne({ where: { idUser: userId } });
    if (!client) {
      return res.status(404).json({ error: 'Solo clientes y coaches pueden comentar' });
    }
    const comment = await Comment.create({ content, idPost, idClient: client.idClient });
    return res.status(201).json(comment);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deleteComment = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
  const commentId: number = parseInt(req.params.commentId, 10);
  try {
    const comment = await Comment.findByPk(commentId);

    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    await Comment.destroy({ where: { idComment: commentId } });

    return res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
