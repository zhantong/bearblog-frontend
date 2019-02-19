import request from '../../../api/client'

export const actionTypes = {
    REQUEST_LATEST_COMMENTS: 'REQUEST_LATEST_COMMENTS',
    RECEIVE_LATEST_COMMENTS: 'RECEIVE_LATEST_COMMENTS'
};

// REDUCERS

export const reducer = (state = {}, action) => {
    switch (action.type) {
        case actionTypes.RECEIVE_LATEST_COMMENTS:
            return Object.assign({}, state, {
                latestComments: action.latestComments
            });
        default:
            return state
    }
};

// ACTIONS

export const requestLatestComments = () => async dispatch => {
    dispatch({type: actionTypes.REQUEST_LATEST_COMMENTS});
    const res = await request({
        url: 'plugin/comment/latestComments',
        method: 'GET'
    });
    dispatch({type: actionTypes.RECEIVE_LATEST_COMMENTS, latestComments: res.comments})
};

