import React, { Component } from 'react'
import { store } from "../store"
import { needToSignup } from "../actions"
import Login from "../pages/Login"
import Signup from "../pages/Signup"
import { Button } from "../Atoms/Button/Button"
import "../css/Landing.css"

class Landing extends Component {

   handleClick = () => {
      store.dispatch(needToSignup(true))
   }

   render() {
      const { needToSignup } = store.getState()

      const notLoggedIn = (
         <div>
            <div
               className="Landing-button-container"
               onClick={this.handleClick}
            >
               <div className="Landing-button-div">
                  <Button
                     className="Landing-button"
                     label="Sign Up"
                  />
               </div>
            </div>
            <Login />
         </div>
      )

      const clickSignup = (
         <div>
            <Signup />
         </div>
      )

      return (
         <div className="Landing-main-container">
            {needToSignup ? clickSignup : notLoggedIn}
         </div>
      )
   }
}

export default Landing