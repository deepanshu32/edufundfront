import {
    LOADING_METADATA,
    METADATA_SUCCESS,
    METADATA_ERROR,
    EQUITY_DATA_SUCCESS,
    EQUITY_DATA_ERROR,
    FILTER_EQUITY_DATA
} from "../actions/types";

const initialState = {
    loading: false,
    data: [],
    equityData: []
};

export default function metadataReducer(state = initialState, action) {
    switch (action.type) {
        case LOADING_METADATA:
            return {
                ...state,
                loading: true
            }
        case METADATA_SUCCESS:
            return {
                ...state,
                data: action.payload.data,
                loading: false
            };
        case METADATA_ERROR:
            return {
                ...state,
                data: [],
                loading: false
            };
        case EQUITY_DATA_SUCCESS:
            return {
                ...state,
                equityData: action.payload.data,
                loading: false
            }
        case EQUITY_DATA_ERROR:
            return {
                ...state,
                equityData: [],
                loading: false
            }
        case FILTER_EQUITY_DATA:
            if(action.payload.startDate && action.payload.endDate){
                return {
                    ...state,
                    equityData: state.equityData.filter(data => new Date(data.date).getTime() >= action.payload.startDate.getTime() && new Date(data.date).getTime() <= action.payload.endDate.getTime()),
                    loading: false
                }
            }else if(action.payload.startDate){
                return {
                    ...state,
                    equityData: state.equityData.filter(data => new Date(data.date).getTime() >= action.payload.startDate.getTime()),
                    loading: false
                }
            }else if(action.payload.endDate){
                return {
                    ...state,
                    equityData: state.equityData.filter(data => new Date(data.date).getTime() <= action.payload.endDate.getTime()),
                    loading: false
                }
            }
        default:
            return state;
    }
}