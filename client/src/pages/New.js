import React, { Component } from "react"
import { store } from "../store"
import { handleChange, handlePhoto } from "../actions"
import { Button } from "../Atoms/Button/Button"
import { TextArea } from "../Atoms/TextArea/TextArea"
import ImageEntry from "../Atoms/ImageEntry/ImageEntry"
import { ImageThumbnail } from "../Atoms/ImageThumbnail/ImageThumbnail"
import { InputTextTripleLength } from "../Atoms/InputTextTripleLength/InputTextTripleLength"
import { LinkButton } from "../Atoms/LinkButton/LinkButton"
import "../css/New.css"

class New extends Component {

   handlePhoto = (e) => {
      e.preventDefault()
      const { image } = store.getState()
      // console.log("New Component image", image)
      store.dispatch(handlePhoto(image))
   }

   handleChange = (e) => {
      store.dispatch(handleChange(e))
   }

   handleSubmit = (e) => {
      e.preventDefault()

      const { id, images, text, title } = store.getState()

      console.log("New Blog Component, images, text, title are ", images, text, title)

      fetch("http://localhost:9000/api/blogs", {
         method: "POST",
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify({ addedBy: id, images: images, text: text, title: title })
      })
         .then(res => res.json())
         .then(res => {
            if (res.errors) {
               console.log("There were", res.errors.length, "errors returned")
               console.log("This error was returned from the server: ", res.errors[0].msg)
            } else {
               // store.dispatch(isLoggedIn(true))
               // store.dispatch(loggedInName(res.name))
            }
         })
   }

   render() {

      const { images } = store.getState()

      var imagesToDisplay = []

      if (images.length > 0) {
         imagesToDisplay = images.map((image) =>
            <ImageThumbnail key={image} image={image} />
         )
      }

      return (
         <div className="New-main-container">

            <div className="New-header">
               <h1>New Blog</h1>
               <span><LinkButton name="Cancel" newPath={"/"} /></span>
            </div>

            <div className="New-blog-container">
               <form
                  className="New-form"
                  onSubmit={this.handleSubmit}
               >
                  <div className="New-submit-button-div">
                     <InputTextTripleLength
                        label="Title"
                        name="title"
                        placeholder="Title"
                        handleChange={this.handleChange}
                     />
                     <TextArea
                        rows="10"
                        cols="110"
                        label="Text"
                        name="text"
                        placeholder="New Blog Text"
                        handleChange={this.handleChange}
                     />
                     <ImageEntry handleChange={this.handleChange} />
                     <div
                        className="New-add-button"
                        onClick={this.handlePhoto}
                     >
                        <Button label="Add Photo" />
                     </div>
                     <div className="New-imagethumbnail">
                        {imagesToDisplay}
                     </div>
                     <div className="New-submit-button">
                        <Button label="Submit" />
                     </div>
                  </div>
               </form>
            </div>
         </div>
      )
   }
}

export default New