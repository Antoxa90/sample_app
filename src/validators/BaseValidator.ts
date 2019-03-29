import { check } from 'express-validator/check';

export class BaseValidator {
  public requireValidator( field: string ) {
    return check( field )
      .exists( { checkNull: true, checkFalsy: true } )
      .withMessage( 'This value should not be blank!' );
  }
}
