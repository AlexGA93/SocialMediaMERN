//Reducer to diploy a alert banner
import { SET_ALERT, REMOVE_ALERT } from "../actions/types";
const initialSate = [];

export default function (state = initialSate, action) {
  //action contains two things: type and payload with data
  //we need to evaluate the type

  const { type, payload } = action;
  switch (type) {
    case "SET_ALERT":
      return [...state, payload]; //display array data
    case "REMOVE_ALERT":
      //we want to remove alert by its ID
      return state.filter((alert) => alert.id !== payload);
    default:
      return state;
  }
}
