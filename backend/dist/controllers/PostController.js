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
exports.deletePost = exports.updatePost = exports.createPost = exports.getAllPosts = void 0;
const Post_1 = __importDefault(require("../models/Post"));
const Comment_1 = __importDefault(require("../models/Comment")); // Asegúrate de importar el modelo Comment
const Client_1 = __importDefault(require("../models/Client"));
const User_1 = __importDefault(require("../models/User"));
const Coach_1 = __importDefault(require("../models/Coach"));
const db_1 = __importDefault(require("../configs/db"));
const getAllPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield Post_1.default.findAll({
            include: [
                {
                    model: Comment_1.default,
                    required: false,
                    as: 'Comments',
                    include: [
                        {
                            model: Client_1.default,
                            required: false,
                            include: [
                                {
                                    model: User_1.default, // Agrega el modelo User
                                    attributes: ['name', 'lastname', 'avatar'], // Puedes especificar las columnas que deseas recuperar
                                },
                            ],
                        },
                        {
                            model: Coach_1.default,
                            required: false,
                            include: [
                                {
                                    model: User_1.default, // Agrega el modelo User
                                    attributes: ['name', 'lastname', 'avatar'], // Puedes especificar las columnas que deseas recuperar
                                },
                            ],
                        }
                    ],
                },
                {
                    model: Coach_1.default,
                    include: [
                        {
                            model: User_1.default,
                            attributes: ['name', 'lastname', 'avatar'],
                        },
                    ],
                },
            ],
        });
        return res.json(posts);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: error });
    }
});
exports.getAllPosts = getAllPosts;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content, userId } = req.body;
    try {
        const coach = yield Coach_1.default.findOne({ where: { idUser: userId } });
        if (!coach) {
            return res.status(404).json({ error: 'User is not a coach' });
        }
        const newPost = yield Post_1.default.create({
            title,
            content,
            idCoach: coach ? coach.idCoach : null,
        });
        return res.json(newPost);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.createPost = createPost;
const updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idPost = parseInt(req.params.id, 10);
    const { title, content } = req.body;
    console.log(idPost);
    try {
        const post = yield Post_1.default.findByPk(idPost, {
            include: Comment_1.default,
        });
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        post.title = title;
        post.content = content;
        yield post.save();
        return res.json(post);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.updatePost = updatePost;
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idPost = parseInt(req.params.id, 10);
    const transaction = yield db_1.default.transaction();
    try {
        const post = yield Post_1.default.findByPk(idPost);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        const postComments = yield Comment_1.default.findAll({ where: { idPost } });
        if (postComments) {
            postComments.forEach((comment) => __awaiter(void 0, void 0, void 0, function* () {
                yield Comment_1.default.destroy({ where: { idComment: comment.idComment }, transaction });
            }));
        }
        yield Post_1.default.destroy({ where: { idPost }, transaction });
        yield transaction.commit();
        return res.status(200).json({ message: 'Post deleted successfully' });
    }
    catch (error) {
        console.error(error);
        yield transaction.rollback();
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.deletePost = deletePost;
