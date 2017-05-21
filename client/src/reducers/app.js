import {
    REQUEST_URL,
    RECEIVE_URL,
    FAILURE_URL,
    ON_CHANGE_URL,
    VALIDATE_URL1,
    VALIDATE_URL2,
    ON_SUBMIT
} from '../constants';

const initialState = {
    isFetching: false,
    error: null,
    htmls: [
        {
            "id": 1,
            "content": ""
        },
        {
            "id": 2,
            "content": ""
        }
    ],
    validateUrl1: "",
    validateUrl2: "",
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
                htmls: state.htmls.reduce(function (result, item) {
                    if (item.id === action.id) {
                        return result.concat([{
                            ...item,
                            content: action.content
                        }]);
                    }
                    return result.concat([ item ]);
                }, [])
            };
        case FAILURE_URL:
            return {
                ...state,
                isFetching: false,
                error: action.error
            };
        case ON_CHANGE_URL:
            return {
                ...state,
                isShowTable: false
            };
        case VALIDATE_URL1:
            return {
                ...state,
                validateUrl1: action.validateUrl1
            }
        case VALIDATE_URL2:
            return {
                ...state,
                validateUrl2: action.validateUrl2
            }
        case ON_SUBMIT:
            return {
                ...state,
                isShowTable: true,
                validateUrl1: "",
                validateUrl2: ""
            };
        default:
            return state ;
    }
}
