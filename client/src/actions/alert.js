//import { v4 as uuid } from "uuid";
import { SET_ALERT, REMOVE_ALERT } from "./types";

//We want to be able to dispatch more than one action at the same time
const { v4: uuidv4 } = require("uuid");
export const setAlert = (msg, alertType, timeout = 5000) => (dispatch) => {
  //we want to generate IDs randomly
  const id = uuidv4();
  //and call SET_ALERT
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id },
  });

  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout); //5seconds
};
