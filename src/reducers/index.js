import { authReducer } from './auth.reducer';
import { combineReducers } from 'redux';

export const Reducers = combineReducers({
  authState: authReducer
});
