import { FormStateMap } from 'redux-form';

export interface IUser {
  login: string;
  isAuth: boolean;
}

export interface IStoreState {
  user: IUser;
  form: FormStateMap;
}
