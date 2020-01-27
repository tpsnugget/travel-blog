import React, { Component } from "react"
import { store } from "../store"
import { commentAdded, handleChange, hasComment } from "../actions"
import { Button } from "../Atoms/Button/Button"
import { TextArea } from "../Atoms/TextArea/TextArea"
import "../css/Comment.css"

class Comment extends Component {

   handleChange = (e) => {
      store.dispatch(handleChange(e))
   }

   handleSubmit = (e) => {
      e.preventDefault()

      const { blogId, commentText, hasComments, id, token, username } = store.getState()

      console.log("Comment Component addedById is", id)
      console.log("Comment Component addedByUsername is", username)
      console.log("Comment Component blogId is", blogId)
      console.log("Comment Component commentText is", commentText)

      // POST a NEW COMMENT
      fetch("http://localhost:9000/api/comments", {
         method: "POST",
         headers: {
            "Content-type": "application/json",
            "x-auth-token": token
         },
         body: JSON.stringify({ addedById: id, addedByUsername: username,
                                blogId: blogId, commentText: commentText })
      })
         .then( res => res.json() )
         .then( res => {
            if(res.errors){
               console.error("Comment Component 2nd .this errors are", res.errors)
            } else {
               console.log("Comment Component 2nd .this res", res)

               // If there are no comments yet we now need to update this
               //  particular blog in the DB
               if(!hasComments){
                  console.log("Comment Component, sending true to store for hasComment")
                  store.dispatch(hasComment(true))
                  store.dispatch(commentAdded(true))
               }
            }
         })
   }

   render() {
      return (
         <div className="Comment-main-container">
            <div className="Comment-header">
               <h1>Add a Comment</h1>
            </div>
            <div className="Comment-inner-container">
               <form onSubmit={this.handleSubmit}>
                  <div>
                     <TextArea
                        rows="3"
                        cols="110"
                        label="Comment"
                        name="commentText"
                        placeholder="Comment"
                        handleChange={this.handleChange}
                     />
                  </div>
                  <div className="Comment-submit-button">
                     <Button label="Submit" />
                  </div>
               </form>
            </div>
         </div>
      )
   }
}

export default Comment