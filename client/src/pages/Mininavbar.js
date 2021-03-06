import React, { Component } from "react"
import { store } from "../store"
// import PropTypes from "prop-types"
import { LinkButton } from "../Atoms/LinkButton/LinkButton"
import "../css/Mininavbar.css"

class Mininavbar extends Component {

   // Mininavbar.propTypes = {
   //    /* Passed down from one of the five main landing pages. Used to complete
   //       the path, and used on part of the button face on the LinkButton Atom.
   //       name options are Beer, Recipe, Restaurant, RV. */
   //    name: PropTypes.string,

   //    /* Passed down from one of the five main landing pages.
   //       Use to customize the Mininavbar. This is _id from the db. */
   //    chosenId: PropTypes.string,

   //    // /* Passed down from one of the five main landing pages.
   //    //    Used to customize the Mininavbar. Only the user who entered the data
   //    //    is allowed to Edit / Delete the data. */
   //    // allowedToModifySelection: PropTypes.bool
   // }

   render() {
      // const newPath = `/${name.toLowerCase()}/new`
      // const editPath = `/${name.toLowerCase()}/edit`

      // const { allowedToModifySelection } = store.getState()
      const { blog, id, username } = store.getState()
      const { _id, addedById } = blog
      const add = (username === "Mike Giebner" || username === "Shari Tonks")
      const edit = (addedById === id)
      // console.log("Mininavbar Component addedById is ", addedById)
      // console.log("Mininavbar Component id is ", id)

      return (
         <div className="Mininavbar-main-container">

            {add && <LinkButton buttonLabel="Add New Blog" newPath={"/blog/new"} />}
            {add && edit && <LinkButton buttonLabel="Edit Blog" chosenId={_id} newPath={`/blog/edit/${_id}`} />}
            {add && edit && <LinkButton buttonLabel="Delete Blog" chosenId={_id} newPath={`/blog/delete/${_id}`} />}

         </div>
      )
   }
}

export default Mininavbar