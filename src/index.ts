import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import './sequelize';
import express from 'express';
import { routes } from './routes';

const app = express();

let port: string = '8080';
if (process.env.NODE_ENV !== 'production') {
  // initialize configuration
  dotenv.config();
  port = process.env.SERVER_PORT;
}

app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: true } ) );


app.listen( port, () => {
  // tslint:disable-next-line:no-console
  console.log( `server started at http://localhost:${port}` );
} );

routes( app );
