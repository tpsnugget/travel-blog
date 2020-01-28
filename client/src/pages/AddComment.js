import React, { Component } from "react"
import { store } from "../store"
import { commentAdded, handleChange, handleComment, hasCommentsUpdate } from "../actions"
import { Button } from "../Atoms/Button/Button"
import { TextArea } from "../Atoms/TextArea/TextArea"
import "../css/AddComment.css"

class AddComment extends Component {

   handleChange = (e) => {
      store.dispatch(handleChange(e))
   }

   handleComment = () => {
      const { commentText } = store.getState()
      store.dispatch(handleComment(commentText))
   }

   handleSubmit = (e) => {
      e.preventDefault()

      const { blogId, commentText, hasComments, id, images, text, title, token,
              username } = store.getState()

      // console.log("Comment Component addedById is", id)
      // console.log("Comment Component addedByUsername is", username)
      // console.log("Comment Component blogId is", blogId)
      // console.log("Comment Component commentText is", commentText)

      // =======================================================================
      // POST a NEW COMMENT ====================================================
      fetch("http://localhost:9000/api/comments", {
         method: "POST",
         headers: {
            "Content-type": "application/json",
            "x-auth-token": token
         },
         body: JSON.stringify({
            addedById: id, addedByUsername: username,
            blogId: blogId, commentText: commentText
         })
      })
         .then(res => res.json())
         .then(res => {
            if (res.errors) {
               console.error("Comment Component 2nd .this errors are", res.errors)
            } else {
               // console.log("Comment Component 2nd .this res", res)

               // If there are no comments yet we now need to update this
               //  particular blog in the DB, hasComments: true
               if (!hasComments) {
                  console.log("Comment Component, sending true to store for hasComment")
                  store.dispatch(hasCommentsUpdate(true))

                  // ===========================================================
                  // UPDATE ONE BLOG ===========================================
                  fetch("http://localhost:9000/api/blogs/edit", {
                     method: "PUT",
                     headers: {
                        "Content-Type": "application/json",
                        "x-auth-token": token
                     },
                     body: JSON.stringify({ _id: blogId, hasComments: true, images: images, text: text, title: title })
                  })
                     .then( res => res.json() )
                     .then( res => {
                        if(res.msg){
                           console.error("Comment Component UPDATE ONE BLOG error", res.msg)
                        } else {

                        }
                     })
                  // UPDATE ONE BLOG ===========================================
                  // ===========================================================
               }
               store.dispatch(handleComment(commentText))
            }
            // store.dispatch(commentAdded(true))
            // store.dispatch(commentAdded(false))
            // console.log("Comment Component commentText is", commentText)
         })
      // POST a NEW COMMENT ====================================================
      // =======================================================================
   }

   render() {

      const { commentText } = store.getState()

      return (
         <div className="AddComment-main-container">
            <div className="AddComment-header">
               <h1>Add a Comment</h1>
            </div>
            <div className="AddComment-inner-container">
               <form onSubmit={this.handleSubmit}>
                  <div>
                     <TextArea
                        rows="3"
                        cols="110"
                        label="Comment"
                        name="commentText"
                        placeholder="Comment"
                        value={commentText}
                        handleChange={this.handleChange}
                     />
                  </div>
                  <div className="AddComment-submit-button">
                     <Button label="Submit" />
                  </div>
               </form>
            </div>
         </div>
      )
   }
}

export default AddComment