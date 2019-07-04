import { expect } from 'chai';
import app from '../index';
import chai from 'chai';
import chaiHttp from 'chai-http';
import * as apiRoutes from '../../src/constants/routes';
import { sequelize } from '../sequelize';
import bcrypt from 'bcrypt';
import { User } from '../../src/models/User';
import { getPasswordHash } from '../../src/utils/userUtils';

chai.use( chaiHttp );

describe( 'UserController', () => {
  beforeEach( ( done ) => {
    // TODO: change to truncate all tables or to truncate by sequelize (via model)
    sequelize.query( "SET FOREIGN_KEY_CHECKS = 0; TRUNCATE `User`; SET FOREIGN_KEY_CHECKS = 1;" )
      .then( () => done() )
  } );

  it( 'should sign up and log in user', ( done ) => {
    const request = chai.request( app.app ).keepOpen();
    // Sign up
    request.post( apiRoutes.SIGN_UP )
      .send( { login: 'test1', password: '12345678', confirmPassword: '12345678' } )
      .then( res => expect( res ).to.have.status( 200 ) )
      .then( () =>
        request.post( apiRoutes.LOGIN )
          .send( { login: 'test1', password: '12345678' } )
          .then( res => {
            expect( res ).to.have.status( 200 );
            expect( res.body.message ).to.equal( 'success' );
            request.close();
            done();
          } )
          .catch( done )
      )
  } );

  describe( 'access after authorization', () => {
    const user = {
      login: 'test',
      password: '12345678'
    };
    const agent = chai.request.agent( app.app ).keepOpen();
    beforeEach( ( done ) => {
      // Authorize user
      getPasswordHash( user.password ).then( hash =>
        User.create( { login: user.login, password: hash } )
      ).then( () => agent.post( apiRoutes.LOGIN )
        .send( { login: user.login, password: user.password } )
        .then( () => done() )
      )
    } );

    it( 'should get all users', ( done ) => {
      agent.get( apiRoutes.USERS )
        .then( res => {
          expect( res ).to.have.status( 200 );
          expect( res.body ).to.eql( [{ id: 1, login: user.login }] );
          agent.close();
          done();
        } )
        .catch( done );
    } );
  } );

  describe( 'sing up validation', () => {
    const assertions = [
      {
        password: '12345678', confirmPassword: '12345678', result: {
          propertyPath: 'login',
          message: 'This value should not be blank!'
        }, codeStatus: 400
      },
      {
        login: 'test1', result: {
          propertyPath: 'password',
          message: 'This value should not be blank!'
        }, codeStatus: 400
      },
      {
        login: 'test1', password: '12345678', result: {
          propertyPath: 'password',
          message: 'Passwords must match'
        }, codeStatus: 400
      },
      {
        login: 'test1', password: '12345678', confirmPassword: '12344321', result: {
          propertyPath: 'password',
          message: 'Passwords must match'
        }, codeStatus: 400
      },
      {
        login: 'test1', password: '123456', confirmPassword: '1234', result: {
          propertyPath: 'password',
          message: 'Password is too short. It should have 8 character or more!'
        }, codeStatus: 400
      }
    ];
    assertions.forEach( ( { login, password, confirmPassword, result, codeStatus } ) => {
      it( `should return message: ${result.message}`, ( done ) => {
        chai.request( app.app ).post( apiRoutes.SIGN_UP )
          .send( { login, password, confirmPassword } )
          .then( res => {
            expect( res ).to.have.status( codeStatus );
            expect( res.body ).to.deep.include( result );
            done();
          } )
          .catch( done );
      } );
    } );
  } )
} );