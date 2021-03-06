import React from "react"
import "./LinkButton.css"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"

export const LinkButton = ({ chosenId, buttonLabel, name, newPath, newStyle }) => {

   LinkButton.defaultProps = {
      chosenId: ""
   }

   LinkButton.propTypes = {
      /* Passed down from Mininavbar */
      chosenId: PropTypes.string,

      /* label for the button face (left side of the text) */
      label: PropTypes.string,

      /* label for the button face (right side of the text) */
      /* Beer, Recipe, Restaurant, RV */
      name: PropTypes.string,

      /* path for the Link from react-router-dom */
      newPath: PropTypes.string,

      /* Allows for changing Link css */
      newStyle: PropTypes.object
   }

   return (
      <div className="LinkButton-div">
         <Link
            to={{
               pathname: newPath,
               state: {
                  id: chosenId,
                  type: name
               }
            }}
            className="LinkButton-link-new"
            style={newStyle}
         >
            {buttonLabel} {name}
         </Link>
      </div>
   )
}