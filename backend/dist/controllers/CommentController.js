"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteComment = exports.createComment = void 0;
const Comment_1 = __importDefault(require("../models/Comment"));
const Client_1 = __importDefault(require("../models/Client"));
const Coach_1 = __importDefault(require("../models/Coach"));
const createComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idPost = req.params.idPost;
    const { content, userId } = req.body;
    try {
        const coach = yield Coach_1.default.findByPk(userId);
        if (!!coach) {
            const comment = yield Comment_1.default.create({ content, idPost, idCoach: coach.idCoach });
            return res.status(201).json(comment);
        }
        const client = yield Client_1.default.findOne({ where: { idUser: userId } });
        if (!client) {
            return res.status(404).json({ error: 'Solo clientes y coaches pueden comentar' });
        }
        const comment = yield Comment_1.default.create({ content, idPost, idClient: client.idClient });
        return res.status(201).json(comment);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.createComment = createComment;
const deleteComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const commentId = parseInt(req.params.commentId, 10);
    try {
        const comment = yield Comment_1.default.findByPk(commentId);
        if (!comment) {
            return res.status(404).json({ error: 'Comment not found' });
        }
        yield Comment_1.default.destroy({ where: { idComment: commentId } });
        return res.status(200).json({ message: 'Comment deleted successfully' });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.deleteComment = deleteComment;
