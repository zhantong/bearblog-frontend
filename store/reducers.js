import {actionTypes} from "./action-types";

const exampleInitialState = {};
export const reducer = (state = exampleInitialState, action) => {

    switch (action.type) {
        case actionTypes.REQUEST_NAVBAR:
            return Object.assign({}, state, {
                navbarLoading: true,
                navbar: action.navbar
            });
        case actionTypes.RECEIVE_NAVBAR:
            return Object.assign({}, state, {
                navbarLoading: false,
                navbar: action.navbar
            });
        default:
            return state
    }
};