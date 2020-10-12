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

//Create or Update a Profile
export const createProfile = (formData, history, edit = false) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const  res = await axios.post('/api/profile', formData, config);
        //dispatch action
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });

        dispatch(setAlert(edit ? 'Profile updated' : 'Profile created', 'success'));

        if(!edit) {
            history.push('/dashboard');
        }

    } catch (err) {

        const errors = err.response.data.errors;
        if (errors) {
        //calling to setAlert component to any error of  the errors responsed by our request
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
        }


        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        });
    }
}