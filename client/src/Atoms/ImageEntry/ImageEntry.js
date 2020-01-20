import React, { Component } from 'react'
import PropTypes from "prop-types"
import { store } from "../../store"
import { InputTextTripleLength } from "../../Atoms/InputTextTripleLength/InputTextTripleLength"
import "./ImageEntry.css"

class ImageEntry extends Component {

   static propTypes = {
      /* Passed down from New.js */

      /* To updated the store with an image URL */
      handleChange: PropTypes.func

      // /* In case the store images array has more than one picture in the parent */
      // image: PropTypes.string
   }

   render() {

      const { image } = store.getState()

      return (
         <div className="ImageEntry-main-container">
            <div >
               <InputTextTripleLength
                  label="Image URL"
                  name="image"
                  placeholder="Image URL"
                  value={image}
                  handleChange={this.props.handleChange}
               />
            </div>
            {/* <div className="ImageEntry-image-div">
            <a href={this.props.image} target="_blank" rel="noopener noreferrer">
               <img
                  alt="new landscape"
                  src={this.props.image}
                  className="ImageEntry-image"
               />
               </a>
            </div> */}
         </div>
      )
   }
}

export default ImageEntry