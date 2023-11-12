import UserModel from './UserModel';
import Session from './Session';
import Credential from './Credential';

// USER RELATIONS
UserModel.hasMany(Credential, { foreignKey: 'idUser' });
Credential.belongsTo(UserModel, { foreignKey: 'idUser' });

Session.belongsTo(Credential, { foreignKey: 'idCredential' });
Credential.hasMany(Session, { foreignKey: 'idCredential' });

export { Session, UserModel, Credential };
