import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
import session from 'express-session';
import AuthService from './services/AuthService';

export default class App {
  public app: express.Application;
  public port: number;

  constructor( controllers: any[], port: number ) {
    this.app = express();
    this.port = port;

    new AuthService();

    this.initializeMiddlewares();
    this.initializeControllers( controllers );
    this.initializeApiLogger();
  }

  private initializeMiddlewares() {
    this.app.use( bodyParser.json() );
    this.app.use( bodyParser.urlencoded( { extended: true } ) );
    this.app.use( session( { secret: 'shmecret', resave: true, saveUninitialized: true } ) );
    this.app.use( passport.initialize() );
    this.app.use( passport.session() );
  }

  private initializeControllers( controllers: any[] ) {
    controllers.forEach( ( controller ) => {
      this.app.use( '/', controller.router );
    } );
  }

  private initializeApiLogger() {
    this.app.use( ( req: express.Request, res: express.Response, next: express.NextFunction ) => {
      console.log( `${req.method} ${req.path}` );
      next();
    } );
  }

  public listen() {
    this.app.listen( this.port, () => {
      // tslint:disable-next-line:no-console
      console.log( `Server started at http://localhost:${this.port}` );
    } );
  }
}