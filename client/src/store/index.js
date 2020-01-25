import { createStore } from "redux"
import reducer from "../reducers"

const initialState = {
   addedById: "",
   addedByUsername: "",
   bio: "",
   blogId: "",
   blog: {},
   blogs: [],
   blogUpdated: false,
   email: "",
   errors: [],
   goodDelete: false,
   goodSignup: false,
   hasProfile: true,
   id: "",
   image: "",
   images: [],
   isLoggedIn: false,
   location: "",
   msg: "",
   needToSignup: false,
   newBlogAdded: false,
   snackBarGreenOpen: false,
   snackBarRedOpen: false,
   text: "",
   title: "",
   token: "",
   username: "",
}

export const store = createStore(reducer, initialState)