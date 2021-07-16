//we need axios because this is where we make our request
import axios from "axios";

import {
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE,
} from "./types";

//We want to show an alert banner for each error
import { setAlert } from "./alert";
import setAuthToken from "../utils/setAuthToken";

//Load User
export const loadUser = () => async (dispatch) => {
  //check global header
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  //request
  try {
    const res = await axios.get("/api/auth");
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    console.log('SOMETHINF WENT WRONG!!!');
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

//Login User
//the function will take the name, email and password as arguments
export const login = (email, password) => async (dispatch) => {
  //config request
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  //config request body
  const body = JSON.stringify({ email, password });

  //making the request
  try {
    const res = await axios.post("/api/auth", body, config);

    dispatch({
      //connection to the back end to login with the credentials
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      //calling to setAlert component to any error of  the errors responsed by our request
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

//Register User
//the function will take the name, email and password as arguments
export const register = ({ name, email, password }) => async (dispatch) => {
  //config request
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  //config request body
  const body = JSON.stringify({ name, email, password });

  //making the request
  try {
    const res = await axios.post("/api/users", body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser()); //dispatching load user action
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      //calling to setAlert component to any error of  the errors responsed by our request
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: REGISTER_FAILED,
    });
  }
};

//Logut / Clear Profile
export const logout = () => (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT });
};
