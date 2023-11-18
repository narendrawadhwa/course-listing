// store.js
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import courseDetailsReducer from './reducers/courseDetailsReducer';
import courseReducer from './reducers/courseReducer';
import authReducer from './reducers/authReducer';

const rootReducer = combineReducers({
  courseDetails: courseDetailsReducer,
  courses: courseReducer,
  auth: authReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default store;
