//Profile's action to manage requests
import axios from 'axios';

//setting alerts
import{setAlert} from "./alert";

import {
    GET_PROFILE,
    PROFILE_ERROR,
    UPDATE_PROFILE
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
/**We'll use the 'history' object wich has a method called 'push' that will redirect us to a client side route 
 * 'edit' parameter will serve us to know if we're updating,editing or creating a profile [false by default]
*/
 export const createProfile = (formData, history, edit = false) => async dispatch => {
    try {
        //config header
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        //make a request
        const  res = await axios.post('/api/profile', formData, config);

        //dispatch action
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });

        //if edit is true then say profile is updated, else than say profile is created
        dispatch(setAlert(edit ? 'Profile updated' : 'Profile created', 'success'));
        
        //redirecting
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

//Add Experience
export const addExperience = (formData, history) => async dispatch => {
    try {
        //config header
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        //make a request
        const  res = await axios.put('/api/profile/experience', formData, config);

        //dispatch action
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        //if edit is true then say profile is updated, else than say profile is created
        dispatch(setAlert('Experience Added', 'success'));
        history.push('/dashboard');
        

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

//Add Education
export const addEducation = (formData, history) => async dispatch => {
    try {
        //config header
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        //make a request
        const  res = await axios.put('/api/profile/education', formData, config);

        //dispatch action
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        //if edit is true then say profile is updated, else than say profile is created
        dispatch(setAlert('Education Added', 'success'));
        history.push('/dashboard');
        

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