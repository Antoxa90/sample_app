import express from 'express';
import { CommentsController } from '../controllers/CommentsController';
import { UserController } from '../controllers/UserController';
import { UserValidator } from '../validators/UserValidator';
import { CommentValidator } from '../validators/CommentValidator';
import * as apiRoutes from '../constants/routes';

export const routes = ( app: express.Router ) => {
  app.get( '/', ( req: express.Request, res: express.Response ) => {
    res.send( 'Hello world!' );
  } );

  const commentsController: CommentsController = new CommentsController();
  const userController: UserController = new UserController();
  const commentValidator: CommentValidator = new CommentValidator();
  const userValidator: UserValidator = new UserValidator();

  app.get( apiRoutes.COMMENTS, commentsController.getAllComments );

  app.get( apiRoutes.USERS, userController.getAllUsers );

  app.post( apiRoutes.COMMENTS, commentValidator.createComment(), commentsController.createComment );

  app.post( apiRoutes.SIGN_UP, userValidator.signUp(), userController.signUp );
};
