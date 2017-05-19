import {
    REQUEST_URL,
    RECEIVE_URL,
    FAILURE_URL,
    ON_SUBMIT,
    ON_CHANGE_URL
} from '../constants';

const initialState = {
    isFetching: false,
    error: null,
    html: [],
    iShowTable: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_URL:
            return {
                ...state,
                isFetching: true
            };
        case RECEIVE_URL:
            return {
                ...state,
                isFetching: false,
                html: state.html.concat(action.html)
            };
        case FAILURE_URL:
            return {
                ...state,
                isFetching: false,
                error: action.error
            };
        
        case ON_SUBMIT: 
            return {
                ...state,
                isShowTable: true,
                html: []
            };
        case ON_CHANGE_URL:    
            return {
                ...state,
                 isShowTable: false
            };
        default:
            return state ;
    }
}
