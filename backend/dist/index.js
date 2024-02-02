"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const db_1 = __importDefault(require("./configs/db"));
const mainRouter_1 = __importDefault(require("./routes/api/v1/mainRouter"));
const User_1 = __importDefault(require("./models/User"));
const Credential_1 = __importDefault(require("./models/Credential"));
const Session_1 = __importDefault(require("./models/Session"));
const Client_1 = __importDefault(require("./models/Client"));
const Coach_1 = __importDefault(require("./models/Coach"));
const Group_1 = __importDefault(require("./models/Group"));
const Routine_1 = __importDefault(require("./models/Routine"));
const Exercise_1 = __importDefault(require("./models/Exercise"));
const Post_1 = __importDefault(require("./models/Post"));
const Comment_1 = __importDefault(require("./models/Comment"));
const GroupExercise_1 = __importDefault(require("./models/GroupExercise"));
const ExerciseConfiguration_1 = __importDefault(require("./models/ExerciseConfiguration"));
const ClientGroup_1 = __importDefault(require("./models/ClientGroup"));
const serverless_http_1 = __importDefault(require("serverless-http"));
const app = (0, express_1.default)();
const PORT = 3000;
// Middlewares
app.use(express_1.default.json());
app.use((0, morgan_1.default)('dev'));
app.use((0, cors_1.default)());
// parse application/x-www-form-urlencoded
app.use(body_parser_1.default.urlencoded({ extended: true }));
// parse application/json
app.use(body_parser_1.default.json());
// USER RELATIONS
User_1.default.hasMany(Credential_1.default, { foreignKey: 'idUser' });
Credential_1.default.belongsTo(User_1.default, { foreignKey: 'idUser', onDelete: 'CASCADE', hooks: true });
Session_1.default.belongsTo(Credential_1.default, { foreignKey: 'idCredential', onDelete: 'CASCADE', hooks: true });
Credential_1.default.hasMany(Session_1.default, { foreignKey: 'idCredential' });
//User.hasOne(Client, { foreignKey: 'idUser' });
Client_1.default.belongsTo(User_1.default, { foreignKey: 'idUser', onDelete: 'CASCADE', hooks: true });
User_1.default.hasOne(Client_1.default, { foreignKey: 'idUser' });
//User.hasOne(Coach, { foreignKey: 'idUser' });
Coach_1.default.belongsTo(User_1.default, { foreignKey: 'idUser', onDelete: 'CASCADE', hooks: true });
// CLIENT RELATIONS
ClientGroup_1.default.belongsTo(Client_1.default, { foreignKey: 'idClient' });
Client_1.default.hasMany(ClientGroup_1.default, { foreignKey: 'idClient' });
ClientGroup_1.default.belongsTo(Group_1.default, { foreignKey: 'idGroup' });
Group_1.default.hasMany(ClientGroup_1.default, { foreignKey: 'idGroup' });
Client_1.default.hasMany(Routine_1.default, { foreignKey: 'idClient' });
Routine_1.default.belongsTo(Client_1.default, { foreignKey: 'idClient', onDelete: 'CASCADE', hooks: true });
// GROUP RELATIONS
Group_1.default.hasMany(Routine_1.default, { foreignKey: 'idGroup' });
Routine_1.default.belongsTo(Group_1.default, { foreignKey: 'idGroup' });
// ROUTINE RELATIONS
Routine_1.default.hasMany(GroupExercise_1.default, { foreignKey: 'idRoutine' });
GroupExercise_1.default.belongsTo(Routine_1.default, { foreignKey: 'idRoutine', onDelete: 'CASCADE', hooks: true });
GroupExercise_1.default.hasMany(ExerciseConfiguration_1.default, { foreignKey: 'idGroupExercise' });
ExerciseConfiguration_1.default.belongsTo(GroupExercise_1.default, { foreignKey: 'idGroupExercise', onDelete: 'CASCADE', hooks: true });
Exercise_1.default.hasMany(ExerciseConfiguration_1.default, { foreignKey: 'idExercise' });
ExerciseConfiguration_1.default.belongsTo(Exercise_1.default, { foreignKey: 'idExercise' });
//Post relations
Post_1.default.belongsTo(Client_1.default, { foreignKey: 'idClient' });
Client_1.default.hasMany(Post_1.default, { foreignKey: 'idClient' });
Comment_1.default.belongsTo(Client_1.default, { foreignKey: 'idClient' });
Client_1.default.hasMany(Comment_1.default, { foreignKey: 'idClient' });
Post_1.default.hasMany(Comment_1.default, { foreignKey: 'idPost', onDelete: 'CASCADE', hooks: true });
Comment_1.default.belongsTo(Post_1.default, { foreignKey: 'idPost', onDelete: 'CASCADE', hooks: true });
db_1.default
    .sync({ force: false })
    .then(() => {
    app.listen(PORT, () => {
        console.log(`Database & tables created!`);
        console.log(`Server running at http://localhost:${PORT}`);
    });
})
    .catch((err) => {
    console.error(err);
});
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || err;
    console.error(err);
    res.status(status).json(message);
});
app.use('/', mainRouter_1.default);
module.exports.handler = (0, serverless_http_1.default)(app);
