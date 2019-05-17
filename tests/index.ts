import dotenv from 'dotenv';
import './sequelize';
import App from '../src/App';
import { UserController } from '../src/controllers/UserController';
import { CommentsController } from '../src/controllers/CommentsController';

let port: number = 8080;
if (process.env.NODE_ENV !== 'production') {
  // initialize configuration
  dotenv.config();
  port = +process.env.SERVER_PORT;
}

const app = new App( [new UserController(), new CommentsController()], port );
app.listen();

export default app;