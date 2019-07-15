import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Api from '../../integration/Api';
import { IUser } from '../../interfaces/IReducerInterfaces';
import { acGetUser, acSetUser, acSignIn } from './';

const middlewares = [thunk];
const mockStore = configureStore( middlewares );

const user = {
  login: 'user',
  password: 'password'
};

describe( 'acUser', () => {
  const initialState: IUser = { isAuth: false, login: '' };
  const store = mockStore( initialState );
  beforeEach( () => {
    store.clearActions();
  } );

  it( 'should be set user action', () => {
    const expectedAction = {
      payload: { login: user.login },
      type: acSetUser.toString(),
    };
    Api.getUser = jest.fn().mockImplementation( () => Promise.resolve( { user: { login: user.login } } ) );
    store.dispatch<any>( acGetUser() )
      .then( () => {
        const actions = store.getActions();
        expect( actions.length ).toBe( 1 );
        expect( actions[0] ).toEqual( expectedAction );
      } );
  } );

  it( 'should be set user action after sign in', () => {
    const expectedAction = {
      payload: { login: user.login },
      type: acSetUser.toString(),
    };
    Api.signIn = jest.fn().mockImplementation( () => Promise.resolve( { user: { login: user.login } } ) );
    store.dispatch<any>( acSignIn( user.login, user.password ) )
      .then( () => {
        const actions = store.getActions();
        expect( actions.length ).toBe( 1 );
        expect( actions[0] ).toEqual( expectedAction );
      } );
  } );
} );
