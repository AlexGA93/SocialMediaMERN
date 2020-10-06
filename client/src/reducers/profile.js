import {GET_PROFILE, PROFILE_ERROR} from '../actions/types';

// we need axios to get the profile and make the request to our backend

//initial state
const inisitalState ={
    //holding when we 're logged in
    profile:null,
    //if we visit another's profile we need to set a profiles array
    profiles:[],
    repos:[],
    loading:true,
    error:{}
}

//function to export 
export default function( state = inisitalState, action){
    //action structure
    const {type, payload} =action;

    //Depending about the type of the action we'll do something
    switch(type) {
        //Go to ../actions/type.js to define cases
        case GET_PROFILE:
            return {
                //current state
                ...state,
                profile:payload,
                loading: false
            };
        case PROFILE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        default:
            return state;
    }
}