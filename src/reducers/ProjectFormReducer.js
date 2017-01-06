import {
  PROJECT_UPDATE,
  PROJECT_CREATE,
  PROJECT_SAVE_SUCCESS } from '../actions/types';

const INITIAL_STATE = {
  name: '',
  distrubances: {}
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PROJECT_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value };
    case PROJECT_CREATE:
      return INITIAL_STATE;
    case PROJECT_SAVE_SUCCESS:
      return INITIAL_STATE;
    default:
      return state;
  }
};