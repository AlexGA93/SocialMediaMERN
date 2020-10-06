//Profile's action to manage requests
import axios from 'axios';

//setting alerts
import{setAlert} from "./alert";

import {
    GET_PROFILE,
    PROFILE_ERROR
} from './types';


//Get current user's profiles
export const getCurrentProfile =() => async dispatch => {
    try {
        //request
        const res = await axios.get('/api/profile/me');

        //dispatch action
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
        
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        });
    }
}