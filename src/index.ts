import dotenv from 'dotenv';
import App from './App';
import { CommentsController } from './controllers/CommentsController';
import { UserController } from './controllers/UserController';
import './sequelize';

let port: number = 8080;
if (process.env.NODE_ENV !== 'production') {
  // initialize configuration
  dotenv.config();
  port = +process.env.SERVER_PORT;
}

const app = new App( [new UserController(), new CommentsController()], port );
app.listen();
