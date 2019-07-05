import bcrypt from 'bcrypt';
import express from 'express';
import passport from 'passport';
import passportLocal from 'passport-local';
import { User } from '../models/User';

export default class AuthService {
  public static isAuthenticated = ( req: express.Request, res: express.Response, next: express.NextFunction ) => {
    if (req.isAuthenticated()) {
      return next();
    }
    return res.status( 401 ).json( { message: 'Unauthorized' } );
  }

  constructor() {
    const LocalStrategy = passportLocal.Strategy;
    passport.use( new LocalStrategy( {
      passwordField: 'password',
        usernameField: 'login',
      }, ( login, password, done ) => {
        User.findOne( { where: { login } } )
          .then( (user) => {
            bcrypt.compare( password, user.password, ( err, res ) => {
              if (!res) {
                return done( null, false, { message: 'Incorrect login or password!' } );
              }
              done( null, user );
            } );
          } )
          .catch( (error) => done( null, false, { message: 'Incorrect login or password!' } ) );
      }
    ) );

    this.serialize();
    this.deserialize();
  }

  public serialize() {
    passport.serializeUser( ( user: User, done ) => {
      done( null, user.id );
    } );
  }

  public deserialize() {
    passport.deserializeUser( ( id: number, done ) => {
      User.findByPk( id )
        .then( (user) => done( null, user ) );
    } );
  }
}
