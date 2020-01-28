import React, { Component } from 'react'
import "../css/ShowComment.css"
import { store } from "../store"
import Moment from "react-moment"
import { saveCommentArray } from "../actions"

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
            // if(res.errors){
            // console.error("ShowBlog Component, GET Comments error", res.errors)
            // } else {
            // console.log("ShowBlog Component, GET res is", res)
            store.dispatch(saveCommentArray(res))
            // }
         })
      // GET COMMENTS for ONE BLOG =============================================
      // =======================================================================
   }

   handleDeleteComment = (e) => {
      e.preventDefault()

      const { commentArray, token } = store.getState()

      const newCommentArray = commentArray.filter( comment => e.target.id !== comment._id )
      store.dispatch(saveCommentArray(newCommentArray))

      const url = `http://localhost:9000/api/comments/delete/${e.target.id}`

      fetch(url, {
         method: "DELETE",
         headers: {
            "x-auth-token": token
         }
      })
         .then()
         .then()
   }

   render() {

      const { commentArray } = store.getState()

      const comments = commentArray.map(comment => {
         return (
            <div key={comment._id} className="ShowComment-comment-container">
               <div>
                  <p className="ShowComment-p"><strong>{comment.commentText}</strong></p>
                  <p className="ShowComment-p">
                     <span className="SlowBlog-postedby ShowComment-span">Posted by: {comment.addedByUsername},</span>
                     <span className="ShowComment-span">on:
                     <Moment format="DD MMM, YYYY at HH:MM a">
                           {comment.date}
                        </Moment></span>
                  </p>
               </div>
               <div id={comment._id} onClick={this.handleDeleteComment}>
                  ⌧
               </div>
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