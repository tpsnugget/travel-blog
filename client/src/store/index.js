import { createStore } from "redux"
import reducer from "../reducers"

const initialState = {
   email: "",
   isLoggedIn: false,
   name: "",
   token: ""
}

export const store = createStore(reducer, initialState)