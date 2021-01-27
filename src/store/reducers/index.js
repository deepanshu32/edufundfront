import { combineReducers } from "redux";
import authReducer from './auth';
import securitiesReducer from './securities';

export default combineReducers({
    auth: authReducer,
    securities: securitiesReducer
});