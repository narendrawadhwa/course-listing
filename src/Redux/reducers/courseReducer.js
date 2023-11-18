import {
  FETCH_COURSES_REQUEST,
  FETCH_COURSES_SUCCESS,
  FETCH_COURSES_FAILURE,
} from '../constants/courseConstants';

const initialState = {
  courses: [],
  loading: false,
  error: '',
};

const courseReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COURSES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_COURSES_SUCCESS:
      return {
        ...state,
        loading: false,
        courses: action.payload,
        error: '',
      };
    case FETCH_COURSES_FAILURE:
      return {
        ...state,
        loading: false,
        courses: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default courseReducer;
