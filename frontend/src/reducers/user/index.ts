import { handleActions } from 'redux-actions';
import { acClearUser, acSetUser } from '../../actions/acUser';
import { IUser } from '../../interfaces/IReducerInterfaces';

const initialState: IUser = {
  isAuth: false,
  login: '',
};

interface IPayload {
  payload: any;
}

export default handleActions<IUser> ({
  [`${acSetUser}`]: ( state: IUser, { payload: { login } }: IPayload ) => ({
    ...state,
    isAuth: true,
    login,
  }),
  [`${acClearUser}`]: () => initialState
}, initialState);
