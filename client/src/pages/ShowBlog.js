import React, { Component } from "react"
import "../css/ShowBlog.css"
import { store } from "../store"
import Moment from "react-moment"
import Mininavbar from "./Mininavbar"
import AddComment from "./AddComment"
import ShowComment from "./ShowComment"
import { LinkButton } from "../Atoms/LinkButton/LinkButton"
import { saveABlog, saveBlogData, clearBlogData } from "../actions"
import { ImageThumbnail } from "../Atoms/ImageThumbnail/ImageThumbnail"

class ShowBlog extends Component {

   componentDidMount() {

         var { id } = this.props.location.state

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
               // This saves into blog {} in the store
               store.dispatch(saveABlog(res))

               // This saves into individual key: value pairs in the store:
               // blogId, hasComments, id, images, text, title
               // for use by EditBlog
               store.dispatch(saveBlogData(res))
            }
         })
      // Get ONE BLOG ==========================================================
      // =======================================================================
   }

   componentWillUnmount(){
      store.dispatch(clearBlogData())
   }

   render() {

      const { blog, hasComments } = store.getState()
      var { addedByUsername, date, images, text, title } = blog

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