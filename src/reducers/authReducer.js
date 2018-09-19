import { UPDATE_VALUE } from '../actions/actionTypes';

const initialState = {
  accessToken: null,
  tokenType: null,
  error: null
};

export const authReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case UPDATE_VALUE:
      console.log('aq', action.authData.access_token);
      return {
        ...state,
        accessToken: action.authData.access_token,
        tokenType: action.authData.token_type,
        error: action.authData.error
      };
    default:
      return state;
  }
}
