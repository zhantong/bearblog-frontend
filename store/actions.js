import {actionTypes} from "./action-types";
import request from "../api/client";


export const requestNavbar = () => async dispatch => {
    dispatch({type: actionTypes.REQUEST_NAVBAR});
    const res = await request({
        url: 'navbar',
        method: 'GET'
    });
    dispatch({type: actionTypes.RECEIVE_NAVBAR, navbar: res})
};