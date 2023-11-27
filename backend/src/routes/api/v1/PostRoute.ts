// routes/postRoutes.ts

import express, { Router } from 'express';
import * as postController from '../../../controllers/PostController';

const postRouter: Router = express.Router();

postRouter.get('/', postController.getAllPosts);
postRouter.post('/', postController.createPost);
postRouter.put('/:id', postController.updatePost);

export default postRouter;
