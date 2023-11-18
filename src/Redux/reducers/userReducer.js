// userReducer.js
import * as types from '../constants/userActionTypes';

const initialState = {
  courses: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_USER_COURSES:
      return { ...state, courses: action.payload };
    default:
      return state;
  }
};

export default userReducer;
