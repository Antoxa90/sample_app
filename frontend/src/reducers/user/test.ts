import { Action } from 'redux-actions';
import { acClearUser, acSetUser } from '../../actions/acUser';
import { IUser } from '../../interfaces/IReducerInterfaces';
import userReducer from './';

const userLogin = 'user';

const initialState: IUser = {
  isAuth: false,
  login: '',
};

describe( 'user reducer', () => {
  it( 'should set user in state', () => {
    const action: Action<{login: string}> = {
      payload: { login: userLogin },
      type: acSetUser.toString()
    };
    const newState = userReducer( initialState, action );
    expect( newState ).toEqual( { isAuth: true, login: userLogin } );
  } );

  it( 'should clear state', () => {
    const state: IUser = {
      isAuth: true,
      login: 'user',
    };
    const action: Action<{}> = {
      payload: null,
      type: acClearUser.toString()
    };
    const newState = userReducer( state, action );
    expect( newState ).toEqual( initialState );
  } );
} );
