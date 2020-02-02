import React, { Component } from 'react'
import { store } from "../store"
import { goodDelete } from "../actions"
import { Redirect } from "react-router-dom"

class DeleteBlog extends Component {

   componentDidMount() {

      const { blog, token } = store.getState()
      const { _id } = blog

      // console.log("DeleteBlog Component id and to delete are", _id, token)

      const url = `http://localhost:9000/api/blogs/delete/${_id}`

      fetch(url, {
         method: "delete",
         headers: {
            "x-auth-token": token
         }
      })
         .then(
            res => {
               return res.json()
            // console.log("res is ", res)
         })
         .then( json => {
            // console.log("DeleteBlog Component, from api res.json() json is", json)
            store.dispatch(goodDelete(true))
            store.dispatch(goodDelete(false))
            return
         })
   }

   render() {

      const { goodDelete } = store.getState()
      // console.log("goodDelete from store is ", goodDelete)

      return (
         <div>
            { goodDelete && <Redirect to="/blog/main" /> }
         </div>
      )
   }
}

export default DeleteBlog