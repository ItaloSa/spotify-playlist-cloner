import { UPDATE_VALUE } from './actionTypes';

export const setAuthData = value => {
  console.log(value);
  return ({
    type: UPDATE_VALUE,
    accessToken: value.accessToken,
    tokenType: value.tokenType,
    error: value.error
  })
};
