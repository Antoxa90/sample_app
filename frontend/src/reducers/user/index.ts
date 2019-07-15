import { handleActions } from 'redux-actions';
import { acClearUser, acSetUser } from '../../actions/acUser';
import { IUser } from '../../interfaces/IReducerInterfaces';

const initialState: IUser = {
  isAuth: false,
  login: '',
};

interface IUserPayload {
  login?: string;
}

interface IPayload {
  payload: IUserPayload;
}

export default handleActions<IUserPayload> ({
  [`${acSetUser}`]: ( state: IUser, { payload: { login } }: IPayload ) => ({
    ...state,
    isAuth: true,
    login,
  }),
  [`${acClearUser}`]: () => initialState
}, initialState);
