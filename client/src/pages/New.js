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
               <form className="New-form">
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
                     <div className="New-imagethumbnail">
                        {imagesToDisplay}
                     </div>
                     <div
                        className="New-add-button"
                        onClick={this.handlePhoto}
                     >
                        <Button label="Add Photo" />
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