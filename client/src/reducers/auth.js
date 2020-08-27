// This reducer is going to have a lot of more than we hadin our alert reducer

import { REGISTER_SUCCESS, REGISTER_FAILED } from "../actions/types";

//initial state
const initialState = {
  token: localStorage.getItem("token"), //vanilla javascript
  isAuthenticated: null, //null 'cause when we make a request to register or login and we geta a successful response == 'true'
  loading: true, //we want to know if loading state is done or not
  user: null, //when we make a request to the backend to that API, it will send users data here
};

//export function
export default function (state = initialState, action) {
  //action
  const { type, payload } = action;

  switch (type) {
    case REGISTER_SUCCESS:
      //setting into state token
      localStorage.setItem("token", payload.token);

      return {
        //When Authentication is done, we have returned an updated state
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };

      break;
    case REGISTER_FAILED:
      //If Registration is failed, we want to remove anything'is in the local state
      localStorage.removeItem("token");
      return {
        //When Authentication is done, we have returned an updated state
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
      break;

    default:
      return state;
  }
}
