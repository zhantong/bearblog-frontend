import request from '../../../api/client'

export const actionTypes = {
    REQUEST_ARTICLE_LIST: 'REQUEST_ARTICLE_LIST',
    RECEIVE_ARTICLE_LIST: 'RECEIVE_ARTICLE_LIST'
};

// REDUCERS

export const reducer = (state = {}, action) => {
    switch (action.type) {
        case actionTypes.RECEIVE_ARTICLE_LIST:
            return Object.assign({}, state, {
                articles: action.articles
            });
        default:
            return state
    }
};

// ACTIONS

export const requestArticleList = () => async dispatch => {
    dispatch({type: actionTypes.REQUEST_ARTICLE_LIST});
    const res = await request({
        url: 'articles',
        method: 'GET'
    });
    dispatch({type: actionTypes.RECEIVE_ARTICLE_LIST, articles: res.articles})
};

