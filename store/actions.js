import {actionTypes} from "./action-types";
import request from "../api/client";


export const requestNavbar = () => async dispatch => {
    dispatch({type: actionTypes.REQUEST_NAVBAR});
    const res = await request({
        url: 'pages',
        method: 'GET'
    });
    dispatch({type: actionTypes.RECEIVE_NAVBAR, pages: res.pages})
};


export const configWidgets = (widgets) => async dispatch => {
    dispatch({type: actionTypes.CONFIG_WIDGETS, widgets: widgets})
};