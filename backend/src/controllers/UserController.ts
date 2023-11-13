import { Request, Response } from 'express';
import UserModel from '../models/UserModel';
import RoutineModel from '../models/Routine';

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserModel.findAll();
    return res.status(200).json({ users });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId as string);
    console.log(userId);

    if (!userId || isNaN(userId)) return res.status(400).json({ message: 'User id is required' });

    const user = await UserModel.findByPk(userId);
    return res.status(200).json({ user });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const getUserRoutines = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId as string);
    if (!userId || isNaN(userId)) return res.status(400).json({ message: 'User id is required' });

    const user = await UserModel.findByPk(userId, {
      include: [
        {
          model: RoutineModel,
          as: 'routines',
        },
      ],
    });

    if (!user) return res.status(400).json({ message: 'User not found' });

    const routines = user;
    return res.status(200).json({ routines });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId as string);
    if (!userId || isNaN(userId)) return res.status(400).json({ message: 'User id is required' });

    // Assuming you have some logic to update the user based on the request body
    const updatedUser = await UserModel.update(req.body, {
      where: { idUser: userId },
    });

    return res.status(200).json({ message: 'User updated successfully' });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export default { getUsers, getUser, getUserRoutines, updateUser };
