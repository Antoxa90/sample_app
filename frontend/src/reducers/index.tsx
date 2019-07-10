import { combineReducers, Reducer } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { IStoreState } from '../interfaces/IReducerInterfaces';
import user from './user';

const rootReducer: Reducer<IStoreState> = combineReducers<IStoreState>( {
  form: formReducer,
  user,
});

export default rootReducer;
