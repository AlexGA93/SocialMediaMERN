import uuid from "uuid";
import { SET_ALERT, REMOVE_ALERT } from "./types";

//We want to be able to dispatch more than one action at the same time

export const setAlert = (msg, alertType) => (dispatch) => {
  //we want to generate IDs randomly
  const id = uuid.v4();
  //and call SET_ALERT
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id },
  });
};
