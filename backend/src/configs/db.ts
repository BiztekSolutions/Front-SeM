import dotenv from 'dotenv';
dotenv.config();

import { Sequelize } from 'sequelize';

const { DB_DEPLOY } = process.env;

export const awsS3id = process.env.AWS_S3_ID as string;
export const awsS3secret = process.env.AWS_S3_SECRET as string;
export const awsS3BucketName = process.env.AWS_S3_BUCKET_NAME as string;

const sequelize = new Sequelize(DB_DEPLOY!, {
  dialect: 'postgres',
});

export default sequelize;
