import React, { Component } from "react"
import "../css/Login.css"
import { store } from "../store"
import { Redirect } from "react-router-dom"
import { Button } from "../Atoms/Button/Button"
import { LinkButton } from "../Atoms/LinkButton/LinkButton"
import { InputText } from "../Atoms/InputText/InputText"
import { SnackbarRed } from "../Atoms/SnackbarRed/SnackbarRed"
import { SnackbarGreen } from "../Atoms/SnackbarGreen/SnackbarGreen"
import {
   handleChange, loggedInData, snackBarGreenOpen, snackBarRedOpen } from "../actions"

var password = ""
// const saltRounds = 10

console.log("Login Component, outside the class")

class Login extends Component {

   handleChange = (e) => {
      store.dispatch(handleChange(e))
   }

   handlePassword = (e) => {
      password = e.target.value
   }

   handleSubmit = (e) => {
      e.preventDefault()

      console.log("Login Component, in handleSubmit()")

      const { email } = store.getState()

      fetch("http://localhost:9000/api/auth", {
         method: "POST",
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify({ email: email, password: password })
      })
         .then(res => res.json())
         .then(res => {
            if (res.errors) {
               console.log("There were", res.errors.length, "errors returned")
               console.log("This error was returned from the server: ", res.errors[0].msg)
               store.dispatch(snackBarRedOpen(true, res.errors[0].msg))
               setTimeout(() => {
                  store.dispatch(snackBarRedOpen(false, ""))
               }, 3000)
            }
            else if (res.status) {
               console.log(res.text)
            }
            else {
               store.dispatch(snackBarGreenOpen(true, `Good Login, ${res.username}!`))
               setTimeout(() => {
                  // store.dispatch(snackBarGreenOpen(false, ""))

                  // This replaces the 1 dispatch above and the 5 dispatches below and reduces the number
                  // of renders after handleSubmit from 7 renders to 2
                  store.dispatch(loggedInData(res.id, res.token, res.username))

                  // store.dispatch(saveToken(res.token))
                  // store.dispatch(loggedInUsername(res.username))
                  // store.dispatch(hasProfile(res.hasProfile))
                  // store.dispatch(id(res.id))
                  // store.dispatch(isLoggedIn(true))
               }, 3000)
            }
         })
   }

   render() {

      // console.log("Login Component, in render()")

      const { hasProfile, isLoggedIn, msg, snackBarGreenOpen, snackBarRedOpen } = store.getState()

      return (
         <div>
            {isLoggedIn && hasProfile && <Redirect to="/blog/main" />}
            {isLoggedIn && !hasProfile && <Redirect to="/profile" />}
            <div className="Login-main-container">
               <div
                  className="Login-button-container"
               >
                  <div className="Login-button-div">
                     <LinkButton
                        className="Login-button"
                        label="Sign Up"
                        name="Sign Up"
                        newPath="/signup"
                     />
                  </div>
               </div>
               <h1 className="Login-h1">Login</h1>
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
                  <div className="Login-submit-button">
                     <Button
                        className="Login-submit-button"
                        label="Submit"
                     />
                  </div>
               </form>
            </div>
            {snackBarRedOpen && <SnackbarRed msg={msg} />}
            {snackBarGreenOpen && <SnackbarGreen msg={msg} />}
         </div>
      )
   }
}

export default Login