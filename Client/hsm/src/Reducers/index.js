import { combineReducers } from "redux";
import patients from "./patients";
import users from "./users";

export default combineReducers({
    patients: patients,
    users: users
})