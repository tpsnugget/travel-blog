import React, { Component } from "react"
import { store } from "../store"
import { saveBlogs } from "../actions"
import { LinkButton } from "../Atoms/LinkButton/LinkButton"
import "../css/BlogEntry.css"

class BlogEntry extends Component {

   componentDidMount() {
      fetch("http://localhost:9000/api/blogs", {
         method: "GET"
      })
         .then(res => res.json())
         .then(res => {
            if (res.errors) {
               console.log("There were", res.errors.length, "errors returned")
               console.log("This error was returned from the server: ", res.errors[0].msg)
            } else {
               // console.log("All Blogs res is ", res)
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

   // handleClick = (e) => {
   //    console.log("BlogEntry Component handleClick getting ready to saveBlogId", e.target)
   //    store.dispatch(saveBlogId(e.target.id))
   // }

   render() {

      const { blogs } = store.getState()

      const blogTitles = blogs.map(blog => {
         // console.log(blog)
         return (
            <LinkButton
               className="BlogEntry-linkbutton"
               chosenId={blog._id}
               key={blog._id}
               name={blog.title}
               newPath={`/blog/show/${blog._id}`}
            >
               {blog.title}
            </LinkButton>
            )})
      return (
         <div className="BlogEntry-main-container">
            <h1 className="BlogEntry-h1">Blogs</h1>
            <ul className="BlogEntry-ul">
               <div>
                  {blogTitles}
               </div>
            </ul>
         </div>
      )
   }
}

export default BlogEntry