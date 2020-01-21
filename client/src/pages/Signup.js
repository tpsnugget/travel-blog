import React, { Component } from "react"
import { store } from "../store"
import { handleChange, needToSignup } from "../actions"
import { Button } from "../Atoms/Button/Button"
import { InputText } from "../Atoms/InputText/InputText"
import "../css/Signup.css"

var password = ""

class Signup extends Component {

   handleSubmit = () => {

      const { email, name } = store.getState()

      const data = {
         "name": name,
         "email": email,
         "password": password
      }

      // console.log("email", email)
      // console.log("name", name)
      // console.log("password", password)

      fetch("http://localhost:9000/api/users", {
         method: "POST",
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify(data)
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

      return (
         <div className="Signup-main-container">
            <h1>Sign Up</h1>
            <form onSubmit={this.handleSubmit}>
               <div className="Signup-input-container">
                  <div className="Signup-name-container">
                     <div className="Signup-name">
                        <InputText
                           label="Name"
                           name="name"
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
                        name="passwork"
                        placeholder="Password"
                        type="password"
                        handleChange={this.handlePassword}
                     />
                  </div>
               </div>
               <div className="Signup-button-container">
                  <Button
                     className="Signup-submit-button"
                     label="Submit"
                  />
                  <div
                     className="Signup-cancel-button"
                     onClick={this.handleCancel}
                  >
                     <Button
                        label="Cancel"
                     />
                  </div>
               </div>
            </form>
         </div>
      )
   }
}

export default Signup