//@ts-nocheck
import { Request, Response } from 'express';
import User from '../models/User';
import { get, list,  listClients, remove } from '../services/UserService';
import Client from '../models/Client';
import Routine from '../models/Routine';
import GroupExercise from '../models/GroupExercise';
import ClientGroup from '../models/ClientGroup';
import sequelize from '../configs/db';
import bcrypt from 'bcrypt';

export const getClients = async (req: Request, res: Response) => {
  try {
    const clients = await listClients();
    return res.status(200).json({ message: 'all clients', clients });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const createClient = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: 'User id is required in the request body' });
    }

    // Verificar si el usuario ya tiene un cliente asociado
    const existingClient = await Client.findOne({ where: { idUser: userId } });
    if (existingClient) {
      return res.status(400).json({ message: 'Client already exists for this user' });
    }

    const newClient = await Client.create({
      idUser: userId,
    });

    return res.status(201).json({ message: 'Client created successfully', newClient });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const getTrainingDays = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.clientId as string);
    if (!userId || isNaN(userId)) return res.status(400).json({ message: 'User id is required' });

    const client = await Client.findByPk(userId);

    if (!client) {
      return res.status(400).json({ message: 'Client not found' });
    }

    const trainingLogs = client.trainingLogs;
    return res.status(200).json({ message: 'Training logs retrieved successfully', trainingLogs: trainingLogs });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const markDayAsTrained = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.clientId as string);
    const { date, idRoutine } = req.body;
    const formattedDate = new Date(date);

    if (!userId || isNaN(userId)) return res.status(400).json({ message: 'User id is required' });
    if (!date) return res.status(400).json({ message: 'Date is required in the request body' });
    if (!idRoutine) return res.status(400).json({ message: 'Routine id is required in the request body' });
    const client = await Client.findByPk(userId);

    if (!client) {
      return res.status(400).json({ message: 'Client not found' });
    }

    const currentTrainingLogs = client.trainingLogs || [];
    const updatedTrainingLogs = [...currentTrainingLogs, { date: formattedDate.toISOString(), idRoutine: idRoutine }];

    client.update({
      trainingLogs: updatedTrainingLogs,
    });

    return res.status(200).json({ message: 'Day marked as trained successfully' });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const markDayAsUntrained = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.clientId as string);
    const { date, idRoutine } = req.body;
    const formattedDate = new Date(date);

    if (!userId || isNaN(userId)) return res.status(400).json({ message: 'User id is required' });
    if (!date) return res.status(400).json({ message: 'Date is required in the request body' });
    if (!idRoutine) return res.status(400).json({ message: 'Routine id is required in the request body' });

    const client = await Client.findByPk(userId);

    if (!client) {
      return res.status(400).json({ message: 'Client not found' });
    }

    client.trainingLogs = client.trainingLogs.filter(
      (log) => new Date(log.date).getTime() !== formattedDate.getTime() || log.idRoutine !== idRoutine
    );

    await client.save();

    return res.status(200).json({ message: 'Training log removed successfully' });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId as string);

    if (!userId || isNaN(userId)) return res.status(400).json({ message: 'User id is required' });

    const user = await get(userId);

    if (!user) return res.status(400).json({ message: 'User not found' });

    return res.status(200).json({ user });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await list();

    return res.status(200).json({ users });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const getUserRoutines = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId as string);
    if (!userId || isNaN(userId)) return res.status(400).json({ message: 'User id is required' });

    // Recuperar el usuario con las rutinas asociadas
    const client = await Client.findByPk(userId, {
      include: [
        {
          model: Routine,
        },
      ],
    });

    if (!client) {
      return res.status(400).json({ message: 'Client not found' });
    }
    //@ts-ignore
    return res.status(200).json({ routines: client.Routines });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId as string);

    if (!userId || isNaN(userId)) {
      return res.status(400).json({ error: 'Invalid user id' });
    }

    // Validar datos antes de la actualización
    const { name, lastname, avatar } = req.body.newUser;

    if (!name && !lastname && !avatar) {
      return res.status(400).json({ error: 'No data provided for update' });
    }

    // Actualizar solo los campos proporcionados
    const updatedUser = await User.update({ name, lastname, avatar }, { where: { idUser: userId } });

    if (updatedUser[0] === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json({ message: 'Usuario actualizado', data: updateUser });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const removeUser = async (req: Request, res: Response) => {
  const transaction = await sequelize.transaction();
  try {
    const userId = parseInt(req.params.userId as string);
    if (!userId || isNaN(userId)) return res.status(400).json({ message: 'User id is required' });

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    //busco si el usuario es cliente
    const client = await Client.findOne({ where: { idUser: userId } });



    //busco si el usuario tiene rutinas asociadas
    if (client) {

    
      const userRoutines = await Routine.findAll({
        where: { idClient: client?.idClient },
      });
   

      if (userRoutines.length > 0) {
        for (const routine of userRoutines) {
          for (let groupExerciseIndex = 0; groupExerciseIndex < routine.GroupExercises.length; groupExerciseIndex++) {
            const promises = routine.GroupExercises[groupExerciseIndex].ExerciseConfigurations.map((config) =>
              ExerciseConfiguration.destroy({
                where: {
                  idExerciseConfiguration: config.idExerciseConfiguration,
                },
                transaction,
              })
            );
            
            await Promise.all(promises);
            
            await GroupExercise.destroy({
              where: { idGroupExercise: routine.GroupExercises[groupExerciseIndex].idGroupExercise },
              transaction,
            });
          }
        }
      }

      //busco si el usuario esta adherido a algun grupo
      const clientGroup = await ClientGroup.findAll({ where: { idClient: client.idClient } });

      if (clientGroup) {
        const promises = clientGroup.map((client) => client.destroy({ transaction: transaction }));
        await Promise.all(promises);
      }
    }

    await user.destroy({ transaction: transaction });

    await transaction.commit();
    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (error: any) {
    transaction.rollback();
    return res.status(500).json({ error: error.message });
  }
};

export const updatePassword = async (req: Request, res: Response) => {
  const { userId, newPassword } = req.body;

  if (!userId || !newPassword) {
    return res.status(400).json({ error: 'User ID and new password are required' });
  }

  const saltRounds: number = 10;
  const hashedPassword: string = await bcrypt.hash(newPassword, saltRounds);

  try {
    const [updatedRows] = await User.update(
      { password: hashedPassword },
      {
        where: { id: userId, provider: 'local' },
      }
    );

    if (updatedRows > 0) {
      return res.status(200).json({ message: 'Successful password update' });
    } else {
      return res.status(404).json({ error: 'User not found' });
    }
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export default { updatePassword, getUsers, getUser, getUserRoutines, updateUser, getClients, createClient, removeUser, markDayAsTrained, getTrainingDays, markDayAsUntrained};
