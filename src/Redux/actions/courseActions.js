import {
  FETCH_COURSES_REQUEST,
  FETCH_COURSES_SUCCESS,
  FETCH_COURSES_FAILURE,
} from '../constants/courseConstants';

export const fetchCoursesRequest = () => ({
  type: FETCH_COURSES_REQUEST,
});

export const fetchCoursesSuccess = (courses) => ({
  type: FETCH_COURSES_SUCCESS,
  payload: courses,
});

export const fetchCoursesFailure = (error) => ({
  type: FETCH_COURSES_FAILURE,
  payload: error,
});

export const fetchCourses = () => {
  return (dispatch) => {
    dispatch(fetchCoursesRequest());
    fetch('https://mocki.io/v1/f46fd939-4449-42b8-bf81-9714ef9d3dee')
      .then((response) => response.json())
      .then((data) => dispatch(fetchCoursesSuccess(data.courses)))
      .catch((error) => {
        console.error('Error fetching data:', error);
        dispatch(fetchCoursesFailure('Error fetching courses.'));
      });
  };
};
