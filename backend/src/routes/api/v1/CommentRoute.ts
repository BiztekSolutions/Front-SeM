// routes/commentRoute.ts
import express, { Router } from 'express';
import { createComment, getCommentsForPost } from '../../../controllers/CommentController';

const commentRouter: Router = express.Router();

commentRouter.post('/:postId', createComment);
commentRouter.get('/:postId', getCommentsForPost);

export default commentRouter;
