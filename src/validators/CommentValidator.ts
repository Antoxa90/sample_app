import { RequestHandlerParams } from 'express-serve-static-core';
import { check } from 'express-validator/check';
import { User } from '../models/User';
import { BaseValidator } from './BaseValidator';

export class CommentValidator extends BaseValidator {
  public createComment(): RequestHandlerParams {
    return [
      super.requireValidator( 'userId' ),
      super.requireValidator( 'text' ),
      check( 'userId' )
        .custom( (userId) => {
          return User.findOne( { where: { id: userId } } );
        } )
        .withMessage('No such user!')
    ];
  }
}
