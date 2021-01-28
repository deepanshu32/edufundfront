import axios from "axios";
import moment from "moment";

import {
   METADATA_SUCCESS,
   METADATA_ERROR,
   LOADING_METADATA,
   EQUITY_DATA_SUCCESS,
   EQUITY_DATA_ERROR
} from "./types";

import {
    toast
} from "react-toastify";

const getStandardDeviation = (array) => {
    const n = array.length
    const mean = array.reduce((a, b) => a + b) / n
    return Math.sqrt(array.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n)
}

const getOneDayStandardDeviation = (session) => {
    let array = [session.open, session.close];
    let standardDeviation = getStandardDeviation(array);
    return standardDeviation;
}

const getNDaysStandardDeviation = (sessions) => {
    let array = sessions.map(x => {
        return x.close;
    });
    let standardDeviation = getStandardDeviation(array);
    return standardDeviation;
}

const getReturns = (initialValue, finalValue) => {
    return ((finalValue - initialValue)/initialValue)*100
}

// GET STOCKS AND ETFS METADATA
export const getSecurities = () => (dispatch, getState) => {
    dispatch({
        type: LOADING_METADATA
    });
    axios
        .get(process.env.REACT_APP_BACKEND_URL+"securities", tokenConfig(getState))
        .then(res => {
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
export const getSecurityData = (metadataId, startDate, endDate) => (dispatch, getState) => {
    dispatch({
        type: LOADING_METADATA
    });

    let url;
    if(startDate && endDate){
        url = process.env.REACT_APP_BACKEND_URL+`securities/${metadataId}?startDate=${startDate}&endDate=${endDate}`
    }else if(startDate){
        url = process.env.REACT_APP_BACKEND_URL+`securities/${metadataId}?startDate=${startDate}`
    }else if(endDate){
        url = process.env.REACT_APP_BACKEND_URL+`securities/${metadataId}?endDate=${endDate}`
    }else{
        url = process.env.REACT_APP_BACKEND_URL+`securities/${metadataId}`
    }
    axios
    .get(url, tokenConfig(getState))
    .then(res => {
        let data = res.data;
        data.oneDaySession = data.sessions[0];
        data.oneDayDeviation = getOneDayStandardDeviation(data.oneDaySession);
        data.oneDayReturns = getReturns(data.oneDaySession.open, data.oneDaySession.close);

        let oneMonthEndDate = moment(data.oneDaySession.date);
        let oneMonthStartDate = moment(data.oneDaySession.date).subtract(1, 'months');
        data.oneMonthSessions = data.sessions.filter(session => 
                    new Date(session.date).getTime() >= oneMonthStartDate.toDate().getTime() && 
                    new Date(session.date).getTime() <= oneMonthEndDate.toDate().getTime());

        data.oneMonthDeviation = getNDaysStandardDeviation(data.oneMonthSessions);
        data.oneMonthReturns = getReturns(data.oneMonthSessions[data.oneMonthSessions.length - 1].open, data.oneMonthSessions[0].close);

        let oneYearEndDate  = moment(data.oneDaySession.date);
        let oneYearStartDate = moment(data.oneDaySession.date).subtract(1, 'years');
        data.oneYearSessions = data.sessions.filter(session => 
                    new Date(session.date).getTime() >= oneYearStartDate.toDate().getTime() && 
                    new Date(session.date).getTime() <= oneYearEndDate.toDate().getTime());
        data.oneYearDeviation = getNDaysStandardDeviation(data.oneYearSessions);
        data.oneYearReturns = getReturns(data.oneYearSessions[data.oneYearSessions.length - 1].open, data.oneYearSessions[0].close);

        let threeYearEndDate  = moment(data.oneDaySession.date);
        let threeYearStartDate = moment(data.oneDaySession.date).subtract(3, 'years');
        data.threeYearSessions = data.sessions.filter(session => 
                    new Date(session.date).getTime() >= threeYearStartDate.toDate().getTime() && 
                    new Date(session.date).getTime() <= threeYearEndDate.toDate().getTime());
        data.threeYearDeviation = getNDaysStandardDeviation(data.threeYearSessions);
        data.threeYearReturns = getReturns(data.threeYearSessions[data.threeYearSessions.length - 1].open, data.threeYearSessions[0].close);

        let fiveYearEndDate  = moment(data.oneDaySession.date);
        let fiveYearStartDate = moment(data.oneDaySession.date).subtract(5, 'years');
        data.fiveYearSessions = data.sessions.filter(session => 
                    new Date(session.date).getTime() >= fiveYearStartDate.toDate().getTime() && 
                    new Date(session.date).getTime() <= fiveYearEndDate.toDate().getTime());
        data.fiveYearDeviation = getNDaysStandardDeviation(data.fiveYearSessions);
        data.fiveYearReturns = getReturns(data.fiveYearSessions[data.fiveYearSessions.length - 1].open, data.fiveYearSessions[0].close);

        data.oneDaySession = [data.sessions[0]];
        
        dispatch({
            type: EQUITY_DATA_SUCCESS,
            payload: data
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