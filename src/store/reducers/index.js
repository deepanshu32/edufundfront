import { combineReducers } from "redux";
import authReducer from './auth';
import metadataReducer from './metadata';

export default combineReducers({
    auth: authReducer,
    metadata: metadataReducer
});