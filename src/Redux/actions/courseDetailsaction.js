// courseActions.js
import {
    FETCH_COURSE_REQUEST,
    FETCH_COURSE_SUCCESS,
    FETCH_COURSE_FAILURE,
    APPLY_COURSE_REQUEST,
    APPLY_COURSE_SUCCESS,
    APPLY_COURSE_FAILURE
  } from '../constants/courseDetailsconstant';
  
  export const fetchCourseRequest = () => ({
    type: FETCH_COURSE_REQUEST,
  });
  
  export const fetchCourseSuccess = (course) => ({
    type: FETCH_COURSE_SUCCESS,
    payload: course,
  });
  
  export const fetchCourseFailure = (error) => ({
    type: FETCH_COURSE_FAILURE,
    payload: error,
  });
  
  export const fetchCourseDetails = (id) => {
    return (dispatch) => {
      dispatch(fetchCourseRequest());
      fetch(`https://mocki.io/v1/f46fd939-4449-42b8-bf81-9714ef9d3dee`)
        .then((response) => response.json())
        .then((data) => {
          const selectedCourse = data.courses.find((c) => c.id.toString() === id);
          if (!selectedCourse) {
            dispatch(fetchCourseFailure('Course not found.'));
          } else {
            dispatch(fetchCourseSuccess(selectedCourse));
          }
        })
        .catch((error) => {
          console.error('Error fetching course details:', error);
          dispatch(fetchCourseFailure('Error fetching course details.'));
        });
    };
  };
  

  export const applyCourseRequest = () => ({
    type: APPLY_COURSE_REQUEST,
  });
  
  export const applyCourseSuccess = () => ({
    type: APPLY_COURSE_SUCCESS,
  });
  
  export const applyCourseFailure = (error) => ({
    type: APPLY_COURSE_FAILURE,
    payload: error,
  });
  
  export const applyCourse = (courseId) => {
    return async (dispatch) => {
      dispatch(applyCourseRequest());
  
      try {
        const response = await fetch(`http://localhost:5000/api/courses/apply`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': localStorage.getItem('token'), 
          },
          body: JSON.stringify({ courseId }),
        });
  
        if (!response.ok) {
          throw new Error('Failed to apply for the course');
        }
  
        dispatch(applyCourseSuccess());
      } catch (error) {
        console.error('Error applying for the course:', error);
        dispatch(applyCourseFailure('Error applying for the course.'));
      }
    };
  };