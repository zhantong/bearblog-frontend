import request from '../../../api/client'

export const actionTypes = {
    REQUEST_ARTICLE: 'REQUEST_ARTICLE',
    RECEIVE_ARTICLE: 'RECEIVE_ARTICLE'
};

// REDUCERS

export const reducer = (state = {}, action) => {
    switch (action.type) {
        case actionTypes.RECEIVE_ARTICLE:
            return Object.assign({}, state, {
                article: action.article
            });
        default:
            return state
    }
};

// ACTIONS

export const requestArticle = (number) => async dispatch => {
    dispatch({type: actionTypes.REQUEST_ARTICLE});
    const res = await request({
        url: `article/${number}`,
        method: 'GET'
    });
    dispatch({type: actionTypes.RECEIVE_ARTICLE, article: res})
};

