import { UPDATE_VALUE } from '../actions/actionTypes';

const initialState = {
  accessToken: null,
  tokenType: null,
  error: null
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_VALUE:
      return {
        ...state,
        accessToken: action.accessToken,
        tokenType: action.tokenType,
        error: action.error
      };
    default:
      return state;
  }
}
