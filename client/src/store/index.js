import { createStore } from "redux"
import reducer from "../reducers"

const initialState = {
   bio: "",
   blogId: "",
   blogs: [],
   email: "",
   hasProfile: true,
   id: "",
   image: "",
   images: [
      // "https://images.unsplash.com/photo-1470478417147-2a2294c38e8c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
      // "https://images.unsplash.com/photo-1543519501-cb513aebdbe6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1334&q=80"
   ],
   isLoggedIn: false,
   location: "",
   name: "",
   needToSignup: false,
   text: "",
   title: "",
   token: ""
}

export const store = createStore(reducer, initialState)