import React, { Component } from "react"
import { store } from "../store"
import "../css/BlogEntry.css"

class BlogEntry extends Component{

   render(){

      const { id } = store.getState()
      return(
         <div className="BlogEntry-main-container">
            <h1>Blog Entry is up Man!</h1>
            <h2>ID: {id}</h2>
         </div>
      )
   }
}

export default BlogEntry