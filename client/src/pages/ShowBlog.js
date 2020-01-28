import React, { Component } from "react"
import "../css/ShowBlog.css"
import { store } from "../store"
import Moment from "react-moment"
import Mininavbar from "./Mininavbar"
import AddComment from "./AddComment"
import ShowComment from "./ShowComment"
import { LinkButton } from "../Atoms/LinkButton/LinkButton"
import { ImageThumbnail } from "../Atoms/ImageThumbnail/ImageThumbnail"
import { handleChange, handlePhoto, saveABlog, saveBlogData } from "../actions"


class ShowBlog extends Component {

   componentDidMount() {

      const { blogId } = store.getState()

      if (this.props.location.state === undefined) {
         var id = blogId
      }
      else {
         var { id } = this.props.location.state
      }

      // =======================================================================
      // Get ONE BLOG ==========================================================
      var url = `http://localhost:9000/api/blogs/show/${id}`

      fetch(url, {
         method: "GET"
      })
         .then(res => res.json())
         .then(res => {
            if (res.errors) {
               console.log("There were", res.errors.length, "errors returned")
               console.log("This error was returned from the server: ", res.errors[0].msg)
            } else {
               store.dispatch(saveABlog(res))
               // This saves:
               //    blogId
               //    hasComments
               //    id
               //    images
               //    text
               //    title
               // in the store for use by EditBlog
               store.dispatch(saveBlogData(res))
            }
         })
      // Get ONE BLOG ==========================================================
      // =======================================================================

   }

   handlePhoto = (e) => {
      e.preventDefault()
      const { image } = store.getState()
      // console.log("ShowBlog Component image", image)
      store.dispatch(handlePhoto(image))
   }

   handleChange = (e) => {
      store.dispatch(handleChange(e))
   }

   render() {

      const { blog, commentArray, hasComments } = store.getState()
      var { addedByUsername, date, images, text, title } = blog

      // console.log("ShowBlog Component, this blog has comments", hasComments)

      if (!images) { images = [] }

      var imagesToDisplay = []

      if (images.length > 0) {
         imagesToDisplay = images.map((image) =>
            <ImageThumbnail key={image} image={image} />
         )
      }

      return (
         <div className="ShowBlog-main-container">

            <div className="ShowBlog-header">
               <h1>{title}</h1>
               <span><LinkButton name="All Blogs" newPath={"/blog/main"} /></span>
            </div>

            <div className="ShowBlog-blog-container">

               <div className="ShowBlog-div">
                  <Mininavbar />
                  <div>
                     <h2 className="ShowBlog-h2">{title}</h2>
                  </div>
                  <div>
                     <p>{text}</p>
                  </div>
                  <div className="ShowBlog-imagethumbnail">
                     {imagesToDisplay}
                  </div>
                  <div className="ShowBlog-addedby-date">
                     <div className="ShowBlog-bottom-container">
                        <strong>Added By:</strong>{"  "}{addedByUsername}
                     </div>
                     <div className="ShowBlog-bottom-container">
                        <strong>on:</strong>{"  "}
                        <Moment format="DD MMM, YYYY at HH:MM a">
                           {date}
                        </Moment>
                     </div>
                     {hasComments && <ShowComment />}
                  </div>
               </div>
            </div>
            <AddComment />
         </div>
      )
   }
}

export default ShowBlog