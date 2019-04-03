import { sequelize } from '../sequelize';
import { Comments } from '../models/Comments';
import express from 'express';
import { User } from '../models/User';
import { RequestValidation } from '../validators/RequestValidation';
import { CommentValidator } from '../validators/CommentValidator';
import * as apiRoutes from '../constants/routes';

export class CommentsController {
  public router: express.Router = express.Router();
  public commentValidator: CommentValidator = new CommentValidator();

  constructor() {
    sequelize.addModels( [Comments, User] );
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.get( apiRoutes.COMMENTS, this.getAllComments );
    this.router.post( apiRoutes.COMMENTS, this.commentValidator.createComment(), this.createComment );
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
