import { Action } from 'redux';
import { ThunkAction, ThunkDispatch as Dispatch } from 'redux-thunk';
import { IStoreState } from '../interfaces/IReducerInterfaces';

export type ThunkResult<R> = ThunkAction<R, IStoreState, null, Action>;

export type ThunkDispatch = Dispatch<IStoreState, null, Action>;
