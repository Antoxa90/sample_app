import { sequelize } from '../sequelize';
import { Comments } from '../models/Comments';
import express from 'express';
import { User } from '../models/User';
import { RequestValidation } from '../validators/RequestValidation';

export class CommentsController {
  constructor() {
    sequelize.addModels( [Comments, User] );
  }

  public getAllComments( req: express.Request, res: express.Response ) {
    Comments.findAll( { include: [User] } )
      .then( comments => res.send( comments ) );
  }

  public getUserComments( req: express.Request, res: express.Response ) {
    Comments.findAll( {
      where: { userId: req.params.userId }
    } )
      .then( comments => res.send( comments ) );
  }

  public createComment( req: express.Request, res: express.Response ) {
    new RequestValidation().validate( req )
      .then( () => {
        const { userId, text } = req.body;
        Comments.create( { userId, text } )
          .then( comment => res.send( comment ) )
      } )
      .catch( errors => res.status( 400 ).json( errors ) );
  }
}
