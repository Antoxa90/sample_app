import express from 'express';
import { validationResult } from 'express-validator/check';

export class RequestValidation {
  public validate( req: express.Request ): Promise<object> {
    const errors = validationResult( req );
    return new Promise( ( resolve, reject ) => {
      if (!errors.isEmpty()) {
        const mappedErrors = errors.array( { onlyFirstError: true } )
          .map( error => ({
            // @ts-ignore
            propertyPath: error.param,
            // @ts-ignore
            message: error.msg
          }) );
        reject( mappedErrors );
      }
      resolve();
    } );
  }
}
