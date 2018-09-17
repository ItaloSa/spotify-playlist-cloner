import { UPDATE_VALUE } from './actionTypes';

export const authInfo = value => ({
  type: UPDATE_VALUE,
  authData: value
});
