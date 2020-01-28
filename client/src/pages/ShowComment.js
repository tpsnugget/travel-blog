import React, { Component } from 'react'
import "../css/ShowComment.css"
import { store } from "../store"
import Moment from "react-moment"

class ShowComment extends Component {

   handleDeleteComment = (e) => {
      e.preventDefault()

      const { token } = store.getState()

      console.log("ShowBlog Component, delete comment", e.target.id)

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