import React, { Component } from "react"
import { Redirect } from "react-router-dom"
import { store } from "../store"
import { goodSignup, handleChange, needToSignup, snackBarGreenOpen, snackBarRedOpen } from "../actions"
import { Button } from "../Atoms/Button/Button"
import { InputText } from "../Atoms/InputText/InputText"
import { LinkButton } from "../Atoms/LinkButton/LinkButton"
import { SnackbarRed } from "../Atoms/SnackbarRed/SnackbarRed"
import { SnackbarGreen } from "../Atoms/SnackbarGreen/SnackbarGreen"
import "../css/Signup.css"

var password = ""

class Signup extends Component {

   handleSubmit = (e) => {
      e.preventDefault()

      const { email, username } = store.getState()

      const data = {
         "username": username,
         "email": email,
         "password": password
      }

      // console.log("email", email)
      // console.log("username", username)
      // console.log("password", password)

      fetch("http://localhost:9000/api/users", {
         method: "POST",
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify(data)
      })
         .then(res => {
            console.log("Signup Component 1st .this res is", res)
            // if(res.status === 422){
            //    store.dispatch(snackBarRedOpen(true, "Red SnackBar is Open Man!"))
            // }
            return res.json()
         })
         .then(res => {
            console.log("Signup Component 2nd .this res is", res)
            if (res.errors) {
               console.log("There were", res.errors.length, "errors returned", res.status)
               console.log("This error was returned from the server: ", res.errors[0].msg)
               store.dispatch(snackBarRedOpen(true, res.errors[0].msg))
               setTimeout(() => {
                  store.dispatch(snackBarRedOpen(false, ""))
               }, 3000)
               // store.dispatch(saveErrors(res.errors))
            } else {
               store.dispatch(snackBarGreenOpen(true, `Good Signup, ${res.username}!`))
               setTimeout(() => {
                  store.dispatch(snackBarGreenOpen(false, ""))
                  store.dispatch(goodSignup(true))
                  store.dispatch(goodSignup(false))
               }, 3000)
               // store.dispatch(isLoggedIn(true))
               // store.dispatch(loggedInName(res.name))
               // store.dispatch(saveErrors(res))
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