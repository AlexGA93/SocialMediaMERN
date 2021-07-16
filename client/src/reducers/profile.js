import { 
  GET_PROFILE, 
  PROFILE_ERROR, 
  CLEAR_PROFILE, 
  UPDATE_PROFILE, 
  GET_PROFILES,
  GET_REPOS 
} from "../actions/types";

// we need axios to get the profile and make the request to our backend

//initial state
const inisitalState = {
  //holding when we 're logged in
  profile: null,
  //if we visit another's profile we need to set a profiles array
  profiles: [],
  repos: [],
  loading: true,
  error: {},
};

//function to export
const profile = (state = inisitalState, action) => {
  //action structure
  const { type, payload } = action;

  //Depending about the type of the action we'll do something
  switch (type) {
    //Go to ../actions/type.js to define cases
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        //current state
        ...state,
        profile: payload,
        loading: false,
      };
      
    case GET_PROFILES:
      return {
        // i want to fill the initialState[] array with the profile from the server
        ...state,//curent state
        profiles: payload,
        loadingl: false
      }
      
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        repos: [],
        loading: false,
      };
    case GET_REPOS:
      return {
        ...state,
        repos: payload,
        loading:false
      };
    default:
      return state;
  }
}
export default profile;