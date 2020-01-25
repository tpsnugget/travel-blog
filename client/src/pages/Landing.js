import React, { Component } from 'react'
import { store } from "../store"
// import { needToSignup } from "../actions"
import Login from "../pages/Login"
import Signup from "../pages/Signup"
import { LinkButton } from "../Atoms/LinkButton/LinkButton"
import "../css/Landing.css"

class Landing extends Component {

   // handleClick = () => {
   //    store.dispatch(needToSignup(true))
   // }

   render() {
      // const {  needToSignup } = store.getState()

      // // console.log("Landing component, errors are", errors)

      // const notLoggedIn = (
      //    <div>
      //       <div
      //          className="Landing-button-container"
      //          // onClick={this.handleClick}
      //       >
      //          <div className="Landing-button-div">
      //             <LinkButton
      //                className="Landing-button"
      //                label="Sign Up"
      //                name="Sign Up"
      //                newPath="/signup"
      //             />
      //          </div>
      //       </div>
      //       <Login />
      //    </div>
      // )

      // const clickSignup = (
      //    <div>
      //       <Signup />
      //    </div>
      // )

      return (
         <div className="Landing-main-container">
            <div>
               <div
                  className="Landing-button-container"
               // onClick={this.handleClick}
               >
                  <div className="Landing-button-div">
                     <LinkButton
                        className="Landing-button"
                        label="Sign Up"
                        name="Sign Up"
                        newPath="/signup"
                     />
                  </div>
               </div>
            </div>
            <Login />
         </div>
      )
   }
}

export default Landing