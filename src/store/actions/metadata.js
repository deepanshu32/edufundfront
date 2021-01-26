import axios from "axios";

import {
   METADATA_SUCCESS,
   METADATA_ERROR,
   LOADING_METADATA,
   EQUITY_DATA_SUCCESS,
   EQUITY_DATA_ERROR,
   FILTER_EQUITY_DATA
} from "./types";

import {
    toast
} from "react-toastify";

// GET STOCKS AND ETFS METADATA
export const getMetadata = () => (dispatch, getState) => {
    dispatch({
        type: LOADING_METADATA
    });
    axios
        .get(process.env.REACT_APP_BACKEND_URL+"metadata", tokenConfig(getState))
        .then(res => {
            console.log(res.data.data);
            dispatch({
                type: METADATA_SUCCESS,
                payload: res.data
            });
        })
        .catch(err => {
            toast.error("Something went wrong. Please contact admin");
            console.log(err);
            dispatch({
                type: METADATA_ERROR
            });
        });
};

// GET STOCKS AND ETFS DATA
export const getEquityData = (metadataId) => (dispatch, getState) => {
    dispatch({
        type: LOADING_METADATA
    });
    axios
    .get(process.env.REACT_APP_BACKEND_URL+`metadata/${metadataId}`, tokenConfig(getState))
    .then(res => {
        console.log(res.data.data);
        dispatch({
            type: EQUITY_DATA_SUCCESS,
            payload: res.data
        });
    })
    .catch(err => {
        toast.error("Something went wrong. Please contact admin");
        console.log(err);
        dispatch({
            type: EQUITY_DATA_ERROR
        });
    });
}

// Filter Equity data
export const filterData = (startDate, endDate) => (dispatch) => { 
    dispatch({
        type: LOADING_METADATA
    });
    dispatch({
        type: FILTER_EQUITY_DATA,
        payload: {
            startDate,
            endDate
        }
    });
}

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