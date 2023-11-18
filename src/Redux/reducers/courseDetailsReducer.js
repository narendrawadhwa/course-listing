// courseDetailsReducer.js
import {
  FETCH_COURSE_REQUEST,
  FETCH_COURSE_SUCCESS,
  FETCH_COURSE_FAILURE,
  APPLY_COURSE_REQUEST,
  APPLY_COURSE_SUCCESS,
  APPLY_COURSE_FAILURE,
} from '../constants/courseDetailsconstant';


const initialState = {
  course: null,
  loading: false,
  error: '',
  applying: false,
  applyError: '',
};

const courseDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COURSE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_COURSE_SUCCESS:
      return {
        ...state,
        loading: false,
        course: action.payload,
        error: '',
      };
    case FETCH_COURSE_FAILURE:
      return {
        ...state,
        loading: false,
        course: null,
        error: action.payload,
      };
    case APPLY_COURSE_REQUEST:
      return {
        ...state,
        applying: true,
      };
    case APPLY_COURSE_SUCCESS:
      return {
        ...state,
        applying: false,
        applyError: '',
      };
    case APPLY_COURSE_FAILURE:
      return {
        ...state,
        applying: false,
        applyError: action.payload,
      };
    default:
      return state;
  }
};

export default courseDetailsReducer;
