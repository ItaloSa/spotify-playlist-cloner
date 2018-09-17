import { UPDATE_VALUE } from '../actions/actionTypes';

const initialState = {
  data: 'Atualizado via Redux!'
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_VALUE:
      return {
        ...state,
        data: action.data
      };
    default:
      return state;
  }
}
