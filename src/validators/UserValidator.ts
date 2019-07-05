import { RequestHandlerParams } from 'express-serve-static-core';
import { check } from 'express-validator/check';
import { BaseValidator } from './BaseValidator';

export class UserValidator extends BaseValidator {
  public signUp(): RequestHandlerParams {
    return [
      super.requireValidator( 'login' ),
      super.requireValidator( 'password' ),
      check( 'password' )
        .isLength( { min: 8 } )
        .withMessage( 'Password is too short. It should have 8 character or more!' )
        .custom( ( password, { req: { body } } ) => {
          if (password !== body.confirmPassword) {
            throw new Error( 'Passwords must match' );
          }
          return Promise.resolve();
        } )
    ];
  }
}
