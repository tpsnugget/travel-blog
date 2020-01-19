import React, { Component } from "react"
import Navbar from "./Navbar"
import Mininavbar from "./Mininavbar"
import BlogEntry from "./BlogEntry"

class MainBlogPage extends Component{

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