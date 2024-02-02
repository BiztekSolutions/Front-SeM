"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoutineConfiguration = exports.GroupExercise = exports.Exercise = exports.Routine = exports.Group = exports.Coach = exports.Client = exports.Credential = exports.Session = exports.User = void 0;
const User_1 = __importDefault(require("./User"));
exports.User = User_1.default;
const Session_1 = __importDefault(require("./Session"));
exports.Session = Session_1.default;
const Credential_1 = __importDefault(require("./Credential"));
exports.Credential = Credential_1.default;
const Client_1 = __importDefault(require("./Client"));
exports.Client = Client_1.default;
const Coach_1 = __importDefault(require("./Coach"));
exports.Coach = Coach_1.default;
const Group_1 = __importDefault(require("./Group"));
exports.Group = Group_1.default;
const Routine_1 = __importDefault(require("./Routine"));
exports.Routine = Routine_1.default;
const Exercise_1 = __importDefault(require("./Exercise"));
exports.Exercise = Exercise_1.default;
const GroupExercise_1 = __importDefault(require("./GroupExercise"));
exports.GroupExercise = GroupExercise_1.default;
const ExerciseConfiguration_1 = __importDefault(require("./ExerciseConfiguration"));
exports.RoutineConfiguration = ExerciseConfiguration_1.default;
// USER RELATIONS
User_1.default.hasMany(Credential_1.default, { foreignKey: 'idUser' });
Credential_1.default.belongsTo(User_1.default, { foreignKey: 'idUser' });
Session_1.default.belongsTo(Credential_1.default, { foreignKey: 'idCredential' });
Credential_1.default.hasMany(Session_1.default, { foreignKey: 'idCredential' });
//User.hasOne(Client, { foreignKey: 'idUser' });
Client_1.default.belongsTo(User_1.default, { foreignKey: 'idUser' });
//User.hasOne(Coach, { foreignKey: 'idUser' });
Coach_1.default.belongsTo(User_1.default, { foreignKey: 'idUser' });
// CLIENT RELATIONS
Client_1.default.belongsTo(Group_1.default, { foreignKey: 'idClient' });
Group_1.default.hasMany(Client_1.default, { foreignKey: 'idClient' });
Client_1.default.belongsToMany(Routine_1.default, { through: 'ClientHasRoutine' });
Routine_1.default.belongsToMany(Client_1.default, { through: 'ClientHasRoutine' });
// GROUP RELATIONS
//Group.hasOne(Routine);
Routine_1.default.hasOne(Group_1.default);
Routine_1.default.hasMany(GroupExercise_1.default, { foreignKey: 'idRoutine' });
GroupExercise_1.default.belongsTo(Routine_1.default, { foreignKey: 'idRoutine', onDelete: 'CASCADE', hooks: true });
