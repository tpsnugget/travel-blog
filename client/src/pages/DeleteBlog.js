import React, { Component } from 'react'
import { store } from "../store"
import { goodDelete } from "../actions"
import { Redirect } from "react-router-dom"

class DeleteBlog extends Component {

   componentDidMount() {

      const { blog, token } = store.getState()
      const { _id } = blog

      // console.log("DeleteBlog Component id to delete is", _id)

      const url = `http://localhost:9000/api/blogs/delete/${_id}`

      fetch(url, {
         method: "delete",
         headers: {
            "x-auth-token": token
         }
      })
         .then(
            res => res.text())
         .then( text => {
            console.log("text is", text)
            store.dispatch(goodDelete(true))
            // const { goodDelete } = store.getState()
            // console.log("goodDelete from store is ", goodDelete)
         } )
         // store.dispatch(goodDelete(true))
         // store.dispatch(goodDelete(false))
   }

   render() {

      const { goodDelete } = store.getState()
      console.log("goodDelete from store is ", goodDelete)

      return (
         <div>
            { goodDelete && <Redirect to="/blog/main" /> }
         </div>
      )
   }
}

export default DeleteBlog