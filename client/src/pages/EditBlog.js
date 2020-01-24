import React, { Component } from "react"
import { Redirect } from "react-router-dom"
import { store } from "../store"
// import { blogUpdated, handleChange, handlePhoto, handlePhotoEdit, saveABlog } from "../actions"
import { blogUpdated, handleChange, handlePhoto, handlePhotoEdit } from "../actions"
import { Button } from "../Atoms/Button/Button"
import { TextArea } from "../Atoms/TextArea/TextArea"
import ImageEntry from "../Atoms/ImageEntry/ImageEntry"
import { ImageThumbnail } from "../Atoms/ImageThumbnail/ImageThumbnail"
import { InputTextTripleLength } from "../Atoms/InputTextTripleLength/InputTextTripleLength"
import { LinkButton } from "../Atoms/LinkButton/LinkButton"
import "../css/EditBlog.css"

class EditBlog extends Component {

   handlePhoto = (e) => {
      e.preventDefault()
      const { image } = store.getState()
      // console.log("EditBlog Component image", image)
      store.dispatch(handlePhoto(image))
   }

   handleChange = (e) => {
      store.dispatch(handleChange(e))
   }

   handleClick = (e) => {
      // console.log("I clicked on the Blog Delete X", e.target.id)
      const { blog } = store.getState()
      // console.log("blog is", blog)
      var { images } = blog
      // console.log("images array is", images)
      images = images.filter( image => image !== e.target.id )
      // console.log("images array is", images)
      store.dispatch(handlePhotoEdit(images))
   }

   handleSubmit = (e) => {
      e.preventDefault()

      const { blog, images, text, title, token } = store.getState()
      // const { _id, addedById, addedByUsername, images, text, title } = blog
      const { _id } = blog

      // console.log("Edit Blog Component, images, text, title are ", images, text, title)

      // const url = `http://localhost:9000/api/blogs/edit/${_id}`

      fetch("http://localhost:9000/api/blogs/edit", {
         method: "PUT",
         headers: {
            "Content-Type": "application/json",
            "x-auth-token": token
         },
         // body: JSON.stringify({ _id: _id, addedById: addedById, addedByUsername: addedByUsername, images: images, text: text, title: title })
         body: JSON.stringify({ _id: _id, images: images, text: text, title: title })
      })
         .then(res => res.text())
         // .then(text => console.log(text))
         .then(res => {
            if (res.errors) {
               console.log("There were", res.errors.length, "errors returned")
               console.log("This error was returned from the server: ", res.errors[0].msg)
            } else {
               store.dispatch(blogUpdated(true))
               store.dispatch(blogUpdated(false))
               // var { images } = store.getState()
               // console.log("EditBlog Components, images should be [] but are ", images)
               // store.dispatch(loggedInName(res.name))
            }
         })
   }

   render() {

      const { blogUpdated, images, text, title } = store.getState()

      // console.log("images array is", images)

      var imagesToDisplay = []

      if (images.length > 0) {
         imagesToDisplay = images.map((image) =>
            <div id={image} key={image} onClick={this.handleClick}>X
               <ImageThumbnail id={image} image={image} />
            </div>
         )
      }

      return (
         <div className="EditBlog-main-container">

            <div className="EditBlog-header">
               <h1>Edit Blog</h1>
               <span><LinkButton name="Cancel" newPath={"/"} /></span>
            </div>

            <div className="EditBlog-blog-container">
               {blogUpdated && <Redirect to="/blog/main" />}
               <form
                  className="EditBlog-form"
                  onSubmit={this.handleSubmit}
               >
                  <div className="EditBlog-submit-button-div">
                     <InputTextTripleLength
                        label="Title"
                        name="title"
                        value={title}
                        handleChange={this.handleChange}
                     />
                     <TextArea
                        rows="10"
                        cols="110"
                        label="Text"
                        name="text"
                        value={text}
                        handleChange={this.handleChange}
                     />
                     <ImageEntry handleChange={this.handleChange} />
                     <div
                        className="EditBlog-add-button"
                        onClick={this.handlePhoto}
                     >
                        <Button label="Add Photo" />
                     </div>
                     <div className="EditBlog-imagethumbnail">
                        {imagesToDisplay}
                     </div>
                     <div className="EditBlog-submit-button">
                        <Button label="Submit" />
                     </div>
                  </div>
               </form>
            </div>
         </div>
      )
   }
}

export default EditBlog