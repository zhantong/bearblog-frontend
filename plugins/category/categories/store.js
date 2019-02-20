import request from '../../../api/client'

export const actionTypes = {
    REQUEST_CATEGORIES: 'REQUEST_CATEGORIES',
    RECEIVE_CATEGORIES: 'RECEIVE_CATEGORIES'
};

// REDUCERS

export const reducer = (state = {}, action) => {
    switch (action.type) {
        case actionTypes.RECEIVE_CATEGORIES:
            return Object.assign({}, state, {
                categories: action.categories
            });
        default:
            return state
    }
};

// ACTIONS

export const requestCategories = () => async dispatch => {
    dispatch({type: actionTypes.REQUEST_CATEGORIES});
    const res = await request({
        url: 'categories',
        method: 'GET'
    });
    dispatch({type: actionTypes.RECEIVE_CATEGORIES, categories: res.categories})
};

