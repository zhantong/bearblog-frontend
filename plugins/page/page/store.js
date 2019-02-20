import request from '../../../api/client'

export const actionTypes = {
    REQUEST_PAGE: 'REQUEST_PAGE',
    RECEIVE_PAGE: 'RECEIVE_PAGE'
};

// REDUCERS

export const reducer = (state = {}, action) => {
    switch (action.type) {
        case actionTypes.RECEIVE_PAGE:
            return Object.assign({}, state, {
                page: action.page
            });
        default:
            return state
    }
};

// ACTIONS

export const requestPage = (slug) => async dispatch => {
    dispatch({type: actionTypes.REQUEST_PAGE});
    const res = await request({
        url: `page/${slug}`,
        method: 'GET'
    });
    dispatch({type: actionTypes.RECEIVE_PAGE, page: res})
};

