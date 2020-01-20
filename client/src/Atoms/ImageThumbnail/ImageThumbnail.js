import React from 'react'
import PropTypes from "prop-types"
import "./ImageThumbnail.css"

export const ImageThumbnail = (props) => {

   ImageThumbnail.propTypes = {
      /* Passed down from New.js
         Used to generate image thumbnails */
      image: PropTypes.string
   }

   return (
      <div className="ImageThumbnail-main-container">
         <div className="ImageThumbnail-image-div">
            <a href={props.image} target="_blank" rel="noopener noreferrer">
               <img
                  alt="new landscape"
                  src={props.image}
                  className="ImageThumbnail-image"
               />
            </a>
         </div>
      </div>
   )
}
