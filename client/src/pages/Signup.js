import React, { Component } from "react"
import "../css/Signup.css"
import { store } from "../store"
import { Redirect } from "react-router-dom"
import { Button } from "../Atoms/Button/Button"
import { InputText } from "../Atoms/InputText/InputText"
import { LinkButton } from "../Atoms/LinkButton/LinkButton"
import { SnackbarRed } from "../Atoms/SnackbarRed/SnackbarRed"
import { SnackbarGreen } from "../Atoms/SnackbarGreen/SnackbarGreen"
import { clearSignupInfo, goodSignup, handleChange, needToSignup, snackBarGreenOpen, snackBarRedOpen } from "../actions"

var password = ""

class Signup extends Component {

   componentWillUnmount(){
      // console.log("Signup Component, entering componentWillUnmount()")
      store.dispatch(goodSignup(false))
      // console.log("Signup Component, exiting componentWillUnmount()")
   }


   handleSubmit = (e) => {
      e.preventDefault()

      const { email, username } = store.getState()

      const data = {
         "username": username,
         "email": email,
         "password": password
      }

      fetch("http://localhost:9000/api/users", {
         method: "POST",
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify(data)
      })
         .then(res => {
            // console.log("Signup Component 1st .this res is", res)
            return res.json()
         })
         .then(res => {
            // console.log("Signup Component 2nd .this res is", res)
            if (res.errors) {
               // console.log("There were", res.errors.length, "errors returned", res.status)
               // console.log("This error was returned from the server: ", res.errors[0].msg)
               store.dispatch(snackBarRedOpen(true, res.errors[0].msg))
               setTimeout(() => {
                  store.dispatch(snackBarRedOpen(false, ""))
               }, 3000)
            } else {
               store.dispatch(snackBarGreenOpen(true, `Good Signup, ${res.username}! Please login to continue.`))
               setTimeout(() => {
                  // store.dispatch(snackBarGreenOpen(false, ""))
                  // store.dispatch(goodSignup(true))
                  store.dispatch(clearSignupInfo())
               }, 3000)
            }
         })
   }

   handleCancel = () => {
      store.dispatch(needToSignup(false))
   }

   handleChange = (e) => {
      store.dispatch(handleChange(e))
   }

   handlePassword = (e) => {
      password = e.target.value
   }

   render() {

      // console.log("Signup Component, in render()")

      const { goodSignup, msg, snackBarGreenOpen, snackBarRedOpen } = store.getState()

      return (
         <div>
            {goodSignup && <Redirect to="/" />}
            <div className="Signup-main-container">
               <h1 className="Signup-h1">Sign Up</h1>
               <form onSubmit={this.handleSubmit}>
                  <div className="Signup-input-container">
                     <div>
                        <div className="Signup-name-container">
                           <div className="Signup-name">
                              <InputText
                                 label="Name"
                                 name="username"
                                 placeholder="Name"
                                 type="text"
                                 handleChange={this.handleChange}
                              />
                           </div>
                        </div>
                        <div className="Signup-login-data">
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
                     </div>
                  </div>
                  <div className="Signup-button-container">
                     <div>
                        <Button
                           className="Signup-submit-button"
                           label="Submit"
                        />
                     </div>
                     <div
                        className="Signup-cancel-button"
                        onClick={this.handleCancel}
                     >
                        <LinkButton
                           label="Cancel"
                           name="Cancel"
                           newPath="/"
                        />
                     </div>
                  </div>
               </form>
            </div>
            {snackBarRedOpen && <SnackbarRed msg={msg} />}
            {snackBarGreenOpen && <SnackbarGreen msg={msg} />}
         </div>
      )
   }
}

export default Signup