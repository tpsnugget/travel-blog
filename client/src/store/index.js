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
   commentAdded: false,
   commentArray: [],
   commentText: "",
   email: "",
   errors: [],
   goodDelete: false,
   goodSignup: false,
   hasComments: false,
   hasProfile: false,
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