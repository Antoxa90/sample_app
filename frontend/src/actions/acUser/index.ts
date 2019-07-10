import Cookies from 'js-cookie';
import { Dispatch } from 'redux';
import { createActions } from 'redux-actions';
import Api from '../../integration/Api';
import { ThunkResult } from '../../types';

const {
  acClearUser,
  acSetUser
} = createActions( {
  AC_CLEAR_USER: null,
  AC_SET_USER: ( login ) => ({ login }),
} );

const acGetUser = (): ThunkResult<void> => ( dispatch: Dispatch ) => {
  Api.getUser().then( ( { user } ) => dispatch( acSetUser( user.login ) ) );
};

const acSignIn = ( login: string, password: string ): ThunkResult<Promise<any>> => ( dispatch: Dispatch ) => {
  return Api.signIn( login, password )
    .then( ( response: any ) => {
      Cookies.set( 'isAuth', 'true' );
      dispatch( acSetUser( response.user.login ) );
    } );
};

export {
  acSetUser,
  acClearUser,
  acGetUser,
  acSignIn,
};
