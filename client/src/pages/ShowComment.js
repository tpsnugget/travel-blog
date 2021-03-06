import React, { Component } from 'react'
import "../css/ShowComment.css"
import { store } from "../store"
import Moment from "react-moment"
import { hasCommentsUpdate, saveCommentArray } from "../actions"

class ShowComment extends Component {

   componentDidMount() {
      // =======================================================================
      // GET COMMENTS for ONE BLOG =============================================
      // console.log("ShowBlog blogId is", id)
      const { blogId } = store.getState()

      const url = `http://localhost:9000/api/comments/show/${blogId}`

      fetch(url, {
         method: "GET"
      })
         .then(res => res.json())
         .then(res => {
            store.dispatch(saveCommentArray(res))
         })
      // GET COMMENTS for ONE BLOG =============================================
      // =======================================================================
   }

   handleDeleteComment = (e) => {
      e.preventDefault()

      const { blogId, commentArray, images, numComments, text, title, token } = store.getState()

      const newCommentArray = commentArray.filter(comment => e.target.id !== comment._id)
      store.dispatch(saveCommentArray(newCommentArray))

      const url = `http://localhost:9000/api/comments/delete/${e.target.id}`

      fetch(url, {
         method: "DELETE",
         headers: {
            "x-auth-token": token
         }
      })
         .then()
         .then(res => {
            if (numComments === 1) {
               // ===========================================================
               // UPDATE ONE BLOG ===========================================
               fetch("http://localhost:9000/api/blogs/edit", {
                  method: "PUT",
                  headers: {
                     "Content-Type": "application/json",
                     "x-auth-token": token
                  },
                  body: JSON.stringify({ _id: blogId, hasComments: false, images: images, text: text, title: title })
               })
                  .then(res => { return res.json() })
                  .then(res => {
                     if (res.msg) {
                        console.error("Comment Component UPDATE ONE BLOG error", res.msg)
                     } else {
                        store.dispatch(hasCommentsUpdate(false))
                     }
                  })
               // UPDATE ONE BLOG ===========================================
               // ===========================================================
            }
         }
         )
   }

   render() {

      const { commentArray, id } = store.getState()

      const comments = commentArray.map(comment => {
         return (
            <div key={comment._id} className="ShowComment-comment-container">
               <div>
                  <p className="ShowComment-p"><strong>{comment.commentText}</strong></p>
                  <p className="ShowComment-p">
                     <span className="SlowBlog-postedby ShowComment-span">Posted by: {comment.addedByUsername},</span>
                     <span className="ShowComment-span">on:{" "}
                        <Moment format="DD MMM, YYYY at HH:MM a">
                           {comment.date}
                        </Moment></span>
                  </p>
               </div>
               {comment.addedById === id ?
                  <div id={comment._id} onClick={this.handleDeleteComment}>
                     ⌧
                </div> : null}
            </div>
         )
      })

      return (
         <div>
            <hr className="ShowBlog-hr" />
            <h2>Comments:</h2>
            {comments}
         </div>
      )
   }
}

export default ShowComment