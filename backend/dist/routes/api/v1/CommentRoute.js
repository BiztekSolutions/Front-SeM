"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/commentRoute.ts
const express_1 = __importDefault(require("express"));
const CommentController_1 = require("../../../controllers/CommentController");
const commentRouter = express_1.default.Router();
commentRouter.post('/:idPost', CommentController_1.createComment);
commentRouter.delete('/:commentId', CommentController_1.deleteComment);
exports.default = commentRouter;
