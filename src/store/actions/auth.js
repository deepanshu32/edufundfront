import axios from "axios";

import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from "./types";

import {
    toast
} from "react-toastify";

// CHECK TOKEN & LOAD USER
export const loadUser = () => (dispatch, getState) => {
    // User Loading

    dispatch({
        type: USER_LOADING
    });

    axios
        .get(process.env.REACT_APP_BACKEND_URL+"users/profile", tokenConfig(getState))
        .then(res => {
            console.log(res.data.user);
            dispatch({
                type: USER_LOADED,
                payload: res.data
            });
        })
        .catch(err => {
            console.log(err);
            if(localStorage.getItem('token')){
                toast.error("Session expired. Please login again");
            }
            dispatch({
                type: AUTH_ERROR
            });
        });
};

// LOGIN USER
export const login = (email, password) => (dispatch) => {
    // Headers
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    // Request Body
    let body = {
        email,
        password
    }

    axios
        .post(process.env.REACT_APP_BACKEND_URL+"users/login", body, config)
        .then(res => {
            if (res.data) {
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: res.data
                });
            }
        })
        .catch(err => {
            console.log(err.response.data);
            if(err.response && err.response.data && err.response.data.error){
                toast.error(err.response.data.error);
            }
            dispatch({
                type: LOGIN_FAIL
            });
        });
};

// REGISTER USER
export const register = (userData) => (dispatch) => {
    // Headers
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    // Request Body
    let body = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        mobile: userData.mobile,
        password: userData.password
    }

    axios
        .post(process.env.REACT_APP_BACKEND_URL+"users/register", body, config)
        .then(res => {
            console.log(res.data);
            if (res.data) {
                dispatch({
                    type: REGISTER_SUCCESS,
                    payload: res.data
                });
            } else {
                dispatch({
                    type: REGISTER_FAIL
                });
            }
        })
        .catch(err => {
            console.log(err.response);
            if(err.response.data.error)
                toast.error(err.response.data.error);
            dispatch({
                type: REGISTER_FAIL
            });
        });
};

// LOGOUT USER
export const logout = () => (dispatch) => {
    dispatch({
        type: LOGOUT_SUCCESS
    });
};


// Setup config with token - helper function
export const tokenConfig = getState => {
    // Get token from state
    const token = getState().auth.token;

    // Headers
    const config = {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    };

    // If token, add to headers config
    if (token) {
        config.headers["authorization"] = token;
    }

    return config;
};