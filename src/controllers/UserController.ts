import express from 'express';
import crypto from 'crypto';
import { sequelize } from '../sequelize';
import { User } from '../models/User';
import { RequestValidation } from '../validators/RequestValidation';

export class UserController {
  constructor() {
    sequelize.addModels( [User] );
  }

  public getAllUsers( req: express.Request, res: express.Response ) {
    User.findAll()
      .then( users => res.send(
        users.map( ( { id, login } ) => ({ id, login }) )
      ) );
  }

  public signUp( req: express.Request, res: express.Response ) {
    new RequestValidation().validate( req )
      .then( () => {
        const { login, password } = req.body;
        const hash = crypto.createHash( 'md5' ).update( password ).digest( 'hex' );
        User.create( { login, password: hash } )
          .then( ( { id, login } ) => res.send( { user: { id, login } } ) );
      } )
      .catch( errors => res.status( 400 ).json( errors ) );
  }
}
