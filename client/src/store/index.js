import { createStore } from "redux"
import reducer from "../reducers"

const initialState = {
   email: "",
   isLoggedIn: false,
   name: "",
   needToSignup: false,
   token: ""
}

export const store = createStore(reducer, initialState)