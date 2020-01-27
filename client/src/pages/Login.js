import React, { Component } from "react"
import { store } from "../store"
// import bcrypt from "bcryptjs"
import { Redirect } from "react-router-dom"
import {
   handleChange, hasProfile, id, isLoggedIn, loggedInUsername, saveToken,
   snackBarGreenOpen, snackBarRedOpen
} from "../actions"
import { Button } from "../Atoms/Button/Button"
import { LinkButton } from "../Atoms/LinkButton/LinkButton"
import { InputText } from "../Atoms/InputText/InputText"
import { SnackbarRed } from "../Atoms/SnackbarRed/SnackbarRed"
import { SnackbarGreen } from "../Atoms/SnackbarGreen/SnackbarGreen"
import "../css/Login.css"

var password = ""
// const saltRounds = 10

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

      // var salt = bcrypt.genSaltSync(saltRounds)
      // var hash = bcrypt.hashSync(password, salt)
      // console.log("Login Component hash is", hash)

      // const url = `http://localhost:9000/api/auth?email=${email}&password=${password}`

      // fetch(url, {
      //    method: "GET"
      // })
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
               // console.log("Login Component res is ", res)
               store.dispatch(snackBarGreenOpen(true, `Good Login, ${res.username}!`))
               setTimeout(() => {
                  store.dispatch(snackBarGreenOpen(false, ""))
                  store.dispatch(saveToken(res.token))
                  store.dispatch(loggedInUsername(res.username))
                  store.dispatch(hasProfile(res.hasProfile))
                  store.dispatch(id(res.id))
                  store.dispatch(isLoggedIn(true))
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
               // onClick={this.handleClick}
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