import express from 'express';
import passport from 'passport';
import { IVerifyOptions } from 'passport-local';
import * as apiRoutes from '../constants/routes';
import { Comments } from '../models/Comments';
import { User } from '../models/User';
import { sequelize } from '../sequelize';
import AuthService from '../services/AuthService';
import { getPasswordHash } from '../utils/userUtils';
import { RequestValidation } from '../validators/RequestValidation';
import { UserValidator } from '../validators/UserValidator';

export class UserController {
  public router: express.Router = express.Router();
  public userValidator: UserValidator = new UserValidator();

  constructor() {
    sequelize.addModels( [User, Comments] );
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.get( apiRoutes.USER, AuthService.isAuthenticated, this.getCurrentUser );
    this.router.get( apiRoutes.USERS, AuthService.isAuthenticated, this.getAllUsers );
    this.router.post( apiRoutes.SIGN_UP, this.userValidator.signUp(), this.signUp );
    this.router.post( apiRoutes.LOGIN, this.logIn );
    this.router.get( apiRoutes.LOGOUT, this.logOut );
  }

  public getCurrentUser( req: express.Request, res: express.Response ) {
    const { dataValues: { password, ...userData } }: User = req.user;
    return res.status( 200 ).json( { user: userData } );
  }

  public getAllUsers( req: express.Request, res: express.Response ) {
    User.findAll()
      .then( (users) => res.send(
        users.map( ( { id, login } ) => ({ id, login }) )
      ) );
  }

  public signUp( req: express.Request, res: express.Response ) {
    new RequestValidation().validate( req )
      .then( () => {
        const { login, password } = req.body;
        getPasswordHash( password ).then( (hash) =>
          User.create( { login, password: hash } )
        ).then( ( { id, login: userLogin } ) => res.send( { user: { id, login: userLogin } } ) );
      } )
      .catch( (errors) => res.status( 400 ).json( errors ) );
  }

  public logIn( req: express.Request, res: express.Response, next: express.NextFunction ) {
    passport.authenticate( 'local', ( err: Error, user: User, info: IVerifyOptions ) => {
      if (err) {
        return next( err );
      }
      if (!user) {
        return res.status( 400 ).json( info );
      }
      req.login( user, ( loginError ) => {
        if (loginError) {
          return next( loginError );
        }

        return res.status( 200 ).json( { message: 'success', user: { login: user.login } } );
      } );
    } )( req, res, next );
  }

  public logOut( req: express.Request, res: express.Response ) {
    passport.authenticate( 'local', { session: false } );
    req.logout();
    res.send( { message: 'success' } );
  }
}
