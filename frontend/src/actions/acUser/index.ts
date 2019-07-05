import { Dispatch } from 'redux';
import { createActions } from 'redux-actions';
import { ThunkResult } from '../../types';

const {
  acClearUser,
  acSetUser
} = createActions( {
  AC_CLEAR_USER: null,
  AC_SET_USER: ( login ) => ({ login }),
} );

const acGetUser = (): ThunkResult<void> => ( dispatch: Dispatch ) => {
  const staticUserLogin = 'guest';
  dispatch( acSetUser( staticUserLogin ) );
};

export {
  acSetUser,
  acClearUser,
  acGetUser,
};
