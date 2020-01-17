import React, { Component } from "react"
import { store } from "./store"
import { handleChange, saveToken } from "./actions"
import { Button } from "./Atoms/Button/Button"
import { InputText } from "./Atoms/InputText/InputText"
import "./Login.css"

class Login extends Component {

   handleChange = (e) => {
      store.dispatch(handleChange(e))
   }

   handleSubmit = (e) => {
      e.preventDefault()

      const data = {
         "email": "mikegiebner@gmail.com",
         "password": "123456"
      }

      fetch("http://localhost:9000/api/auth", {
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
               store.dispatch(saveToken(res.token))
               // store.dispatch(isLoggedIn(true))
               // store.dispatch(loggedInName(res.name))
               // store.dispatch(saveToken(res.token))
            }
         })
   }

   render() {

      const { token } = store.getState()

      return (
         <div className="Login-main-container">
            <h1>Login is up Man!</h1>
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
                     name="passwork"
                     placeholder="Password"
                     type="password"
                     handleChange={this.handleChange}
                  />
               </div>
               <div className="Login-button-container">
                  <Button
                     className="Login-submit-button"
                     label="Submit"
                  />
               </div>
            </form>
            {`The token is: ${token}`}
         </div>
      )
   }
}

export default Login