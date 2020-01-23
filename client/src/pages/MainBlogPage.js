import React, { Component } from "react"
import { store } from "../store"
import { saveABlog } from "../actions"
import Navbar from "./Navbar"
import Mininavbar from "./Mininavbar"
import BlogEntry from "./BlogEntry"

class MainBlogPage extends Component{

   // This writes over any previously selected blog so the Mininavbar resets properly
   componentDidMount(){
      store.dispatch(saveABlog(""))
   }

   render(){
      return(
         <div>
            <Navbar />
            <Mininavbar />
            <BlogEntry />
         </div>
      )
   }
}

export default MainBlogPage