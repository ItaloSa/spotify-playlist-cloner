import { UPDATE_VALUE } from '../actions/actionTypes';

const initialState = {
  authInfo: 'Atualizado via Redux!'
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_VALUE:
      return {
        ...state,
        authInfo: action.authInfo
      };
    default:
      return state;
  }
}
