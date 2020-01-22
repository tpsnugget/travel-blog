import { createStore } from "redux"
import reducer from "../reducers"

const initialState = {
   addedById: "",
   addedByUsername: "",
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
   newBlogAdded: false,
   text: "",
   title: "",
   token: ""
}

export const store = createStore(reducer, initialState)