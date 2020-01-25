import React, { Component } from "react"
import { Redirect } from "react-router-dom"
import { store } from "../store"
import { handleChange, hasProfile } from "../actions"
import { Button } from "../Atoms/Button/Button"
import { TextArea } from "../Atoms/TextArea/TextArea"
import { InputText } from "../Atoms/InputText/InputText"
import "../css/Profile.css"

class Profile extends Component {

   handleChange = (e) => {
      store.dispatch(handleChange(e))
   }

   handleSubmit = (e) => {
      e.preventDefault()

      const { bio, id, location, token } = store.getState()

      // console.log("Profile Component handleSubmit is running...calling fetch on api/user with PUT")
      // console.log("Profile Component bio, id, location are: ", bio, id, location)
      // console.log("Profile Component token is ", token)

      fetch("http://localhost:9000/api/users", {
         method: "PUT",
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify({ id: id })
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

      fetch("http://localhost:9000/api/profile", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
            "x-auth-token": token
         },
         body: JSON.stringify({ bio: bio, location: location, id: id })
      })
         .then(res => res.json())
         .then(res => {
            if (res.errors) {
               console.log("There were", res.errors.length, "errors returned")
               console.log("This error was returned from the server: ", res.errors[0].msg)
            } else {
               console.log("newProfile from api is", res)
               store.dispatch(hasProfile(true))
               // store.dispatch(isLoggedIn(true))
               // store.dispatch(loggedInName(res.name))
            }
         })

      store.dispatch(hasProfile(true))
   }

   render() {

      const { hasProfile, isLoggedIn } = store.getState()

      return (
         <div className="Profile-main-container">
         { hasProfile && isLoggedIn && <Redirect to="/blog/main" />}
            <h1>Profile</h1>
            <h2>You must submit a profile before moving on</h2>
            <form onSubmit={this.handleSubmit}>
               <div>
                  <InputText
                     label="Location"
                     name="location"
                     placeholder="Location (City, State)"
                     type="text"
                     handleChange={this.handleChange}
                  />
               </div>
               <div>
                  <TextArea
                     rows="10"
                     cols="100"
                     label="Bio"
                     name="bio"
                     placeholder="Bio"
                     type="text"
                     handleChange={this.handleChange}
                  />
               </div>
               <div>
                  <Button label="Submit" />
               </div>
            </form>
         </div>
      )
   }
}

export default Profile