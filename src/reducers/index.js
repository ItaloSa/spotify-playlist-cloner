import { authReducer } from './authReducer';
import { combineReducers } from 'redux';

export const Reducers = combineReducers({
  authState: authReducer
});
