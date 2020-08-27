//we need axios because this is where we make our request
import axios from "axios";

import { REGISTER_SUCCESS, REGISTER_FAILED } from "./types";

//We want to show an alert banner for each error
import { setAlert } from "./alert";

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
