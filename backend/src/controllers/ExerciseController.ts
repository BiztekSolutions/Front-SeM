import { Request, Response } from 'express';
import { list, get } from '../services/ExerciseService';
import Exercise from '../models/Exercise';
// import aws from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';
import { S3Client } from '@aws-sdk/client-s3';
import { awsS3id, awsS3secret, awsS3BucketName } from '../configs/db';
import { CustomError } from '../utils/interfaces';

const s3 = new S3Client({
  region: 'us-east-1',
  credentials: {
    accessKeyId: awsS3id,
    secretAccessKey: awsS3secret,
  },
});

export const getExercises = async (req: Request, res: Response) => {
  try {
    const exercises = await list();
    return res.status(200).json({ exercises });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const getExercise = async (req: Request, res: Response) => {
  try {
    const exerciseId = parseInt(req.params.exerciseId as string);
    if (!exerciseId || isNaN(exerciseId)) return res.status(400).json({ message: 'Exercise id is required' });

    const exercise = await get(exerciseId);
    if (!exercise) return res.status(404).json({ message: 'Exercise not found' });
    return res.status(200).json({ exercise });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateExercise = async (req: Request, res: Response) => {
  try {
    const { exerciseId } = req.params;

    const { name, description, video, image1, image2, type } = req.body;

    // Buscar el ejercicio por ID
    const exercise = await Exercise.findByPk(exerciseId);

    // Si no se encuentra el ejercicio, devolver un error
    if (!exercise) {
      return res.status(404).json({ message: 'Ejercicio no encontrado' });
    }

    exercise.name = name || exercise.name;
    exercise.description = description || exercise.description;
    exercise.video = video || exercise.video;
    exercise.image1 = image1 || exercise.image1;
    exercise.image2 = image2 || exercise.image2;
    exercise.type = type || exercise.type;

    // Guardar los cambios en la base de datos
    await exercise.save();

    // Devolver el ejercicio actualizado
    return res.status(200).json(exercise);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const createExercise = async (req: Request, res: Response) => {
  try {
    const { name, description, video, image1, image2, type } = req.body;

    const newExercise = await Exercise.create({
      name,
      description,
      video,
      image1,
      image2,
      type,
    });

    return res.status(201).json(newExercise);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};


const uploadImageToS3 = multer({
  fileFilter: (_req, file, cb) => {
    if (['jpg', 'png', 'jpeg', 'gif'].some(ext => file.originalname.endsWith('.' + ext))) {
      console.log('file***********************', file);
      return cb(null, true);
    }
    const error = new CustomError(
      400,
      `Only ${['jpg', 'png', 'jpeg', 'gif'].join(', ')} files are allowed!`,
    );
    return cb(error); 
  },
  storage: multerS3({
    s3: s3,
    // acl: 'public-read',
    bucket: awsS3BucketName,
    key: (req: any, _file, cb) => {
      console.log(req, 'req');
      cb(null, `${req.params.imageFolder}/${req.params.imageName}`);
    },
  }),
  
});

export const uploadToS3 = uploadImageToS3.single('image');
export const uploadImage = async (req: Request, res: Response) => {
  // Verifica si el archivo fue cargado
  if (!req.file) {
    return res.status(400).send({ error: 'No file uploaded.' });
  }

  try {
    // Aquí puedes realizar operaciones adicionales si es necesario
    // Por ejemplo, guardar la URL del archivo en una base de datos

    // Envía la URL del archivo como respuesta
    return res.status(200).send({ payload: (req.file as any).location });
  } catch (e: any) {
    console.error(e);
    if (e.name === 'CustomError') {
      res.status(e.status).send({ error: e.message });
    } else {
      res.status(500).send({ error: 'The API is not responding' });
    }
  }
};




module.exports = { getExercises, getExercise, createExercise, updateExercise, uploadToS3, uploadImage };








// TODO: bucket name into env file

