import axios from 'axios';

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
} from '../constants/authConstants';

// Action creators for login
export const loginRequest = () => ({
  type: LOGIN_REQUEST,
});

export const loginSuccess = (userData) => ({
  type: LOGIN_SUCCESS,
  payload: userData,
});

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

// Action creator for login user
export const loginUser = (credentials) => {
  return async (dispatch) => {
    dispatch(loginRequest());

    try {
    // Setting the token after successful login
const response = await axios.post('http://localhost:5000/api/auth/login', credentials);
const userData = response.data;
const token = userData.token;

localStorage.setItem('token', token);
console.log(token);
dispatch(loginSuccess(userData));
axios.defaults.headers.common['authorization'] = `${token}`;
console.log('Headers:', axios.defaults.headers);



      
    } catch (error) {
      console.error('Error logging in:', error);
      dispatch(loginFailure('Login failed. Please check your credentials.'));
    }
  };
};

// Action creators for logout
export const logoutRequest = () => ({
  type: LOGOUT_REQUEST,
});

export const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
});

export const logoutFailure = (error) => ({
  type: LOGOUT_FAILURE,
  payload: error,
});

// Action creator for logout user
export const logoutUser = () => {
  return async (dispatch) => {
    dispatch(logoutRequest());

    try {
      await axios.get('http://localhost:5000/api/auth/logout');
console.log('logout successful');

// Clear the token from localStorage
localStorage.removeItem('token');

// Remove the Authorization header
delete axios.defaults.headers.common['Authorization'];

dispatch(logoutSuccess());

    } catch (error) {
      console.error('Error logging out:', error);
      dispatch(logoutFailure('Logout failed. Please try again.'));
    }
  };
};
