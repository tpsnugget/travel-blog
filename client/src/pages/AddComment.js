import React, { Component } from "react"
import "../css/AddComment.css"
import { store } from "../store"
import { Button } from "../Atoms/Button/Button"
import { TextArea } from "../Atoms/TextArea/TextArea"
import { addCommentToCommentArray, commentAdded, handleChange, hasCommentsUpdate } from "../actions"

class AddComment extends Component {

   componentWillUnmount(){
      store.dispatch(commentAdded(false))
   }

   handleChange = (e) => {
      store.dispatch(handleChange(e))
   }

   handleSubmit = (e) => {
      e.preventDefault()

      const { blogId, commentText, hasComments, id, images, text, title, token,
              username } = store.getState()

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
               store.dispatch(addCommentToCommentArray(res))

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
                     .then( res => { return res.json() })
                     .then( res => {
                        if(res.msg){
                           console.error("Comment Component UPDATE ONE BLOG error", res.msg)
                        } else {
                           
                        }
                     })
                  // UPDATE ONE BLOG ===========================================
                  // ===========================================================
               }
            }
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