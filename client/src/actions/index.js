import {
    REQUEST_URL,
    RECEIVE_URL,
    FAILURE_URL,
    ON_SUBMIT,
    ON_CHANGE_URL
} from '../constants';

function requestURL() {
    return {
        type: REQUEST_URL
    };
}

function receiveURL(html) {
    return {
        type: RECEIVE_URL,
        html
    };
}

// why do you return function here?
function failureURL() {
    return function(error) {
        return {
            type: FAILURE_URL,
            error
        };
    };
}

export function fetchURL(url) {
    return (dispatch) => {
        dispatch(requestURL());
        fetch(`/api?url=${encodeURI(url)}`)
            .then(response => response.text())
            .then(function(html) {
                dispatch(receiveURL(html));
            })
            .catch((err) => {
                dispatch(failureURL()(err));
            })
    };
}

export function onSubmit() {
    return {
        type: ON_SUBMIT
    };
}

export function onChangeUrl() {
    return {
        type: ON_CHANGE_URL
    };
}
