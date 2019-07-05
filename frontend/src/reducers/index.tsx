import { combineReducers, Reducer } from 'redux';
import { IStoreState } from '../interfaces/IReducerInterfaces';
import user from './user';

const rootReducer: Reducer<IStoreState> = combineReducers<IStoreState>( {
  user
});

export default rootReducer;
