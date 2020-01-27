import React, { Component } from "react"
import Moment from "react-moment"
import { uuid } from "uuidv4"
import { store } from "../store"
import { handleChange, handlePhoto, saveABlog, saveBlogData, saveCommentArray } from "../actions"
import { ImageThumbnail } from "../Atoms/ImageThumbnail/ImageThumbnail"
import { LinkButton } from "../Atoms/LinkButton/LinkButton"
import Mininavbar from "./Mininavbar"
import Comment from "./Comment"
import "../css/ShowBlog.css"

class ShowBlog extends Component {

   componentDidMount() {

      const { blogId } = store.getState()

      if (this.props.location.state === undefined) {
         var id = blogId
      }
      else {
         var { id } = this.props.location.state
      }

      // console.log("ShowBlog Blog Component id is ", id)

      var url = `http://localhost:9000/api/blogs/show/${id}`

      // console.log("ShowBlog Blog Component url is ", url)

      fetch(url, {
         method: "GET"
      })
         .then(res => res.json())
         .then(res => {
            if (res.errors) {
               console.log("There were", res.errors.length, "errors returned")
               console.log("This error was returned from the server: ", res.errors[0].msg)
            } else {
               // console.log("One Blog returned was ", res)
               store.dispatch(saveABlog(res))
               // This saves hasComments, id, images, text and title in the store for use by EditBlog
               store.dispatch(saveBlogData(res))

               // GET COMMENTS for this BLOG
               console.log("ShowBlog blogId is", id)
               url = `http://localhost:9000/api/comments/show/${id}`

               fetch(url, {
                  method: "GET"
               })
                  .then(res => res.json())
                  .then(res => {
                     // if(res.errors){
                     // console.error("ShowBlog Component, GET Comments error", res.errors)
                     // } else {
                     console.log("ShowBlog Component, GET res is", res)
                     store.dispatch(saveCommentArray(res))
                     // }
                  })
            }
         })
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

      console.log("ShowBlog Component, this blog has comments", hasComments)

      if (!images) { images = [] }

      var imagesToDisplay = []

      if (images.length > 0) {
         imagesToDisplay = images.map((image) =>
            <ImageThumbnail key={image} image={image} />
         )
      }

      const comments = commentArray.map(comment => {
         return (
            <div key={uuid()} className="ShowBlog-comment-container">
               <p><strong>{comment.commentText}</strong></p>
               <p>
                  <span className="SlowBlog-postedby">Posted by: {comment.addedByUsername},</span>
                  <span>on:
                     <Moment format="DD MMM, YYYY at HH:MM a">
                        {comment.date}
                     </Moment></span>
               </p>
            </div>
         )
      })

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
                     {hasComments && <h2>Comments:</h2>}
                     {hasComments && comments}
                  </div>
               </div>
            </div>
            <Comment />
         </div>
      )
   }
}

export default ShowBlog