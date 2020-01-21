import React, { Component } from "react"
import { store } from "../store"
import { saveBlogs } from "../actions"
import "../css/BlogEntry.css"

class BlogEntry extends Component{

   componentDidMount(){
      fetch("http://localhost:9000/api/blogs", {
         method: "GET"
      })
         .then(res => res.json())
         .then(res => {
            if (res.errors) {
               console.log("There were", res.errors.length, "errors returned")
               console.log("This error was returned from the server: ", res.errors[0].msg)
            } else {
               console.log("All Blogs res is ", res)
               store.dispatch(saveBlogs(res))
               // store.dispatch(saveToken(res.token))
               // store.dispatch(loggedInName(res.name))
               // store.dispatch(hasProfile(res.hasProfile))
               // store.dispatch(id(res.id))
               // store.dispatch(isLoggedIn(true))
               // store.dispatch(needToSignup(false))
            }
         })
   }

   render(){

      const { blogs } = store.getState()

      const blogTitles = blogs.map( blog => <p>{blog.title}</p> )
      
      return(
         <div className="BlogEntry-main-container">
            <h1>Blog Entry is up Man!</h1>
            Titles: {blogTitles}
         </div>
      )
   }
}

export default BlogEntry