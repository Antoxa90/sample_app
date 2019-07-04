import dotenv from 'dotenv';
import { Sequelize } from 'sequelize-typescript';

dotenv.config();

export const sequelize = new Sequelize( {
  database: process.env.NODE_ENV !== 'test' ? process.env.DATABASE_NAME : process.env.TEST_DATABASE_NAME,
  dialect: 'mysql',
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
  port: parseInt( process.env.PORT ),
  operatorsAliases: { $gt: Sequelize.Op.gt },
  dialectOptions: {
    multipleStatements: true
  }
} );
