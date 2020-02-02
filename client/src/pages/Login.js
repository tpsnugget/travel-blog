import React, { Component } from "react"
import "../css/Login.css"
import moment from "moment"
import { store } from "../store"
import { Redirect } from "react-router-dom"
import { Button } from "../Atoms/Button/Button"
import { InputText } from "../Atoms/InputText/InputText"
import { LinkButton } from "../Atoms/LinkButton/LinkButton"
import { SnackbarRed } from "../Atoms/SnackbarRed/SnackbarRed"
import { SnackbarGreen } from "../Atoms/SnackbarGreen/SnackbarGreen"
import { handleChange, loggedInData, snackBarGreenOpen, snackBarRedOpen } from "../actions"

var password = ""

class Login extends Component {

   componentWillUnmount() {
      password = ""
   }

   handleChange = (e) => {
      store.dispatch(handleChange(e))
   }

   handlePassword = (e) => {
      password = e.target.value
   }

   handleSubmit = (e) => {
      e.preventDefault()

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
               const { _id, lastLoggedInDate, loggedInDate, token, username } = res.user

               var timeSinceLastLogin = moment().from(lastLoggedInDate)
               store.dispatch(snackBarGreenOpen(true, `Good Login, ${username}, you last logged ${timeSinceLastLogin} ago!`))

               setTimeout(() => {
                  store.dispatch(loggedInData(_id, lastLoggedInDate, loggedInDate, token, username))
               }, 3000)
            }
         })
   }

   render() {

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