import dotenv from 'dotenv';
import { Sequelize } from 'sequelize-typescript';

dotenv.config();

export const sequelize = new Sequelize( {
  database: process.env.NODE_ENV !== 'test' ? process.env.DATABASE_NAME : process.env.TEST_DATABASE_NAME,
  dialect: 'mysql',
  dialectOptions: {
    multipleStatements: true
  },
  host: process.env.DATABASE_HOST,
  operatorsAliases: { $gt: Sequelize.Op.gt },
  password: process.env.DATABASE_PASSWORD,
  port: parseInt( process.env.PORT, 10 ),
  username: process.env.DATABASE_USERNAME,
} );
