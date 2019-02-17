import {actionTypes} from "./action-types";

const exampleInitialState = {};
export const reducer = (state = exampleInitialState, action) => {

    switch (action.type) {
        case actionTypes.REQUEST_NAVBAR:
            return Object.assign({}, state, {
                navbarLoading: true
            });
        case actionTypes.RECEIVE_NAVBAR:
            return Object.assign({}, state, {
                navbarLoading: false,
                navbar: action.navbar
            });
        case actionTypes.REQUEST_ARTICLE_LIST:
            return Object.assign({}, state, {
                articles: action.articles
            });
        default:
            return state
    }
};