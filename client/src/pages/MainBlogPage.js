import React, { Component } from "react"
import Navbar from "./Navbar"
import { store } from "../store"
import BlogEntry from "./BlogEntry"
import Mininavbar from "./Mininavbar"
import { saveABlog } from "../actions"

class MainBlogPage extends Component{

   componentDidMount(){
      // This writes over any previously selected blog 
      // so the Mininavbar resets properly
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