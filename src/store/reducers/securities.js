import {
    LOADING_METADATA,
    METADATA_SUCCESS,
    METADATA_ERROR,
    EQUITY_DATA_SUCCESS,
    EQUITY_DATA_ERROR
} from "../actions/types";

const initialState = {
    loading: false,
    securities: [],
    security: null,
    sessions: [],
    oneDaySession: [],
    oneMonthSessions: [],
    oneYearSessions: [],
    threeYearSessions: [],
    fiveYearSessions: [],
    oneDayDeviation: null,
    oneDayReturns: null,
    oneMonthDeviation: null,
    oneMonthReturns: null,
    oneYearDeviation: null,
    oneYearReturns: null,
    threeYearDeviation: null,
    threeYearReturns: null,
    fiveYearDeviation: null,
    fiveYearReturns: null,
};

export default function securitiesReducer(state = initialState, action) {
    switch (action.type) {
        case LOADING_METADATA:
            return {
                ...state,
                loading: true
            }
        case METADATA_SUCCESS:
            return {
                ...state,
                securities: action.payload.securities,
                loading: false
            };
        case METADATA_ERROR:
            return {
                ...state,
                securities: [],
                loading: false
            };
        case EQUITY_DATA_SUCCESS:
            return {
                ...state,
                security: action.payload.security,
                sessions: action.payload.sessions,
                oneDaySession: action.payload.oneDaySession,
                oneMonthSessions: action.payload.oneMonthSessions,
                oneYearSessions: action.payload.oneYearSessions,
                threeYearSessions: action.payload.threeYearSessions,
                fiveYearSessions: action.payload.fiveYearSessions,
                oneDayDeviation: action.payload.oneDayDeviation,
                oneDayReturns: action.payload.oneDayReturns,
                oneMonthDeviation: action.payload.oneMonthDeviation,
                oneMonthReturns: action.payload.oneMonthReturns,
                oneYearDeviation: action.payload.oneYearDeviation,
                oneYearReturns: action.payload.oneYearReturns,
                threeYearDeviation: action.payload.threeYearDeviation,
                threeYearReturns: action.payload.threeYearReturns,
                fiveYearDeviation: action.payload.fiveYearDeviation,
                fiveYearReturns: action.payload.fiveYearReturns,
                loading: false
            }
        case EQUITY_DATA_ERROR:
            return {
                ...state,
                sessions: [],
                oneDaySession: [],
                oneMonthSessions: [],
                oneYearSessions: [],
                threeYearSessions: [],
                fiveYearSessions: [],
                security: null,
                oneDayDeviation: null,
                oneDayReturns: null,
                oneMonthDeviation: null,
                oneMonthReturns: null,
                oneYearDeviation: null,
                oneYearReturns: null,
                threeYearDeviation: null,
                threeYearReturns: null,
                fiveYearDeviation: null,
                fiveYearReturns: null,
                loading: false
            }
        default:
            return state;
    }
}