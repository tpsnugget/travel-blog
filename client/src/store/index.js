import { createStore } from "redux"
import reducer from "../reducers"

const initialState = {
   bio: "",
   blogId: "",
   blog: {},
   blogs: [],
   email: "",
   hasProfile: true,
   id: "",
   image: "",
   images: [],
   isLoggedIn: false,
   location: "",
   username: "",
   needToSignup: false,
   text: "",
   title: "",
   token: ""
}

export const store = createStore(reducer, initialState)