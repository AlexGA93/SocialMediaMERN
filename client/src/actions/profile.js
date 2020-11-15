//Profile's action to manage requests
import axios from 'axios';

//setting alerts
import{setAlert} from "./alert";

import {
    GET_PROFILE,
    GET_PROFILES,
    GET_REPOS,
    PROFILE_ERROR,
    UPDATE_PROFILE,
    CLEAR_PROFILE,
    ACCOUNT_DELETED
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

// Get all Profiles
export const getProfiles =() => async dispatch => {
    /*
    When we move to profile list page i want to clear whatever is in the current profile
    */
    dispatch({type: CLEAR_PROFILE});
    try {
        //request
        const res = await axios.get('/api/profile');

        //dispatch action
        dispatch({
            type: GET_PROFILES,
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

// Get profile by ID
export const getProfileById =(userId) => async (dispatch) => {
    //console.log(userId);
   
    try {
        //request
        const res = await axios.get(`/api/profile/user/${userId}`);

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
};
// Get Github repos
export const getGithubRepos =(username) => async dispatch => {
    
    try {
        //request
        const res = await axios.get(`/api/profile/github/${username}`);

        //dispatch action
        dispatch({
            type: GET_REPOS,
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

//Delete Experience
/*
Hittind endpoint
making a DELETE requets to profile experience
*/
export const deleteExperience = id => async dispatch => {
    try {
        //making request to backend
        const res = await axios.delete(`/api/profile/experience/${id}`);

        //update profile
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        //Putting the alert
        dispatch(setAlert('Experience Removed','success'));
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        });
    }
};

//Delete Education
/*
Hittind endpoint
making a DELETE requets to profile experience
*/
export const deleteEducation = id => async dispatch => {
    try {
        const res = await axios.delete(`/api/profile/education/${id}`);

        //update profile
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        //Putting the alert
        dispatch(setAlert('Education Removed','success'));
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        });
    }
};

//Delete Account & Profile
export const deleteAccount = () => async dispatch => {
    // to delete our account we want a confirmation
    if(window.confirm('Are you sure? This cannot be undone!')) {
        try {
            await axios.delete('api/profile');
    
            //update profile WITHOUT DATA
            dispatch({type: CLEAR_PROFILE });
            dispatch({type: ACCOUNT_DELETED });
    
            //Putting the alert
            dispatch(setAlert('Your account has been permanantly removed'));
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
    
};