import React from 'react'
import PropTypes from "prop-types"
import "./ImageThumbnail.css"

export const ImageThumbnail = ({ edit, handleDeletePhoto, handleMouseOver, id, image }) => {

   ImageThumbnail.propTypes = {
      /* Passed down from New.js or EditBlog.js */

      /* edit is true when passed down from an Edit form, this adds to the
         className so :hover can be used */
      edit: PropTypes.bool,

      /* Used in handleMouseOver */
      id: PropTypes.string,

      /* Passed down from EditBlog.js */
      handleDeletePhoto: PropTypes.func,

      /* Passed down from EditBlog.js */
      handleMouseOver: PropTypes.func,

      /* Used to generate image thumbnails */
      image: PropTypes.string
   }

   const display = (
      edit
         ?
         <a href={image} target="_blank" rel="noopener noreferrer">
            <img
               alt="new landscape"
               id={id}
               src={image}
               className={edit ? "ImageThumbnail-image ImageThumbnail-image-edit" : "ImageThumbnail-image"}
               onClick={handleDeletePhoto}
               onMouseOver={handleMouseOver}
            />
         </a>
         :
         <a href={image} target="_blank" rel="noopener noreferrer">
            <img
               alt="new landscape"
               src={image}
               className={edit ? "ImageThumbnail-image ImageThumbnail-image-edit" : "ImageThumbnail-image"}
            />
         </a>
   )

   return (
      <div className="ImageThumbnail-main-container">
         <div className="ImageThumbnail-image-div">
            {display}
         </div>
      </div>
   )
}
