import { LOGIN_TEXT } from "../_actions/types";

export default function(state="", action) {
  switch (action.type) {
    case LOGIN_TEXT:
      return action.payload;
      break;
    default:
      return state;
      break;
  }
}