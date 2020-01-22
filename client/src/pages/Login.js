import React, { Component } from "react"
import { store } from "../store"
import { handleChange, hasProfile, id, isLoggedIn, loggedInUsername, needToSignup, saveToken } from "../actions"
import { Button } from "../Atoms/Button/Button"
import { InputText } from "../Atoms/InputText/InputText"
import "../css/Login.css"

var password = ""

class Login extends Component {

   handleChange = (e) => {
      store.dispatch(handleChange(e))
   }

   handlePassword = (e) => {
      password = e.target.value
   }

   handleSubmit = (e) => {
      e.preventDefault()

      const { email } = store.getState()

      const url = `http://localhost:9000/api/auth?email=${email}&password=${password}`

      fetch(url, {
         method: "GET"
      })
         .then(res => res.json())
         .then(res => {
            if (res.errors) {
               console.log("There were", res.errors.length, "errors returned")
               console.log("This error was returned from the server: ", res.errors[0].msg)
            } else {
               // console.log("Login Component res is ", res)
               store.dispatch(saveToken(res.token))
               store.dispatch(loggedInUsername(res.username))
               store.dispatch(hasProfile(res.hasProfile))
               store.dispatch(id(res.id))
               store.dispatch(isLoggedIn(true))
               store.dispatch(needToSignup(false))
            }
         })
   }

   render() {

      return (
         <div className="Login-main-container">
            <h1>Login</h1>
            <form onSubmit={this.handleSubmit}>
               <div className="Login-input-container">
                  <InputText
                     label="E-mail"
                     name="email"
                     placeholder="E-mail"
                     type="text"
                     handleChange={this.handleChange}
                  />
                  <InputText
                     label="Password"
                     name="password"
                     placeholder="Password"
                     type="password"
                     handleChange={this.handlePassword}
                  />
               </div>
               <div className="Login-button-container">
                  <Button
                     className="Login-submit-button"
                     label="Submit"
                  />
               </div>
            </form>
         </div>
      )
   }
}

export default Login