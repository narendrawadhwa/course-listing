// userActions.js
import * as types from '../constants/userActionTypes';
import axios from 'axios';

export const registerUser = (userData) => {
  return async (dispatch) => {
    try {
      dispatch({ type: types.REGISTER_USER });

      const response = await axios.post('http://localhost:5000/api/user/register', userData);
      console.log('Registration successful:', response.data);
    } catch (error) {
      console.error('Error registering user:', error);
      dispatch({ type: types.REGISTER_USER_ERROR, payload: error.message });
    }
  };
};

export const getUserCourses = () => async (dispatch) => {
  try {
    // Assuming you have an authenticated user with token available
    const token = localStorage.getItem('token');

    // Make an API call to fetch user courses
    const response = await axios.get('http://localhost:5000/api/user/courses-applied', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({ type: types.SET_USER_COURSES, payload: response.data.courses });
  } catch (error) {
    console.error('Error fetching user courses:', error);
  }
};
