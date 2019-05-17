import { expect } from 'chai';
import app from '../index';
import chai from 'chai';
import chaiHttp from 'chai-http';
import * as apiRoutes from '../../src/constants/routes';
import { sequelize } from '../sequelize';

chai.use( chaiHttp );

describe( 'CommentsController', () => {
  beforeEach( ( done ) => {
    // TODO: change to truncate all tables or to truncate by sequelize (via model)
    sequelize.query( "SET FOREIGN_KEY_CHECKS = 0; TRUNCATE `comments`; SET FOREIGN_KEY_CHECKS = 1;" )
      .then( () => done() )
  } );

  it( 'should get all comments', ( done ) => {
    chai.request( app.app ).get( apiRoutes.COMMENTS )
      .then( res => {
        chai.expect( res ).to.have.status( 200 );
        done();
      } )
      .catch( done );
  } );
} );