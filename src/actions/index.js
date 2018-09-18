import { UPDATE_VALUE } from './actionTypes';

export const setAuthData = value => {
  console.log(value);
  const data = {
    type: UPDATE_VALUE,
    authData: value
  }
  console.log(data);
  return data;
};
