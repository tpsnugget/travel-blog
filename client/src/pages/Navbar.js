import React, { Component } from "react"
import { Link } from "react-router-dom"
import { store } from "../store"
import { isLoggedIn, loggedInUsername, saveToken } from "../actions"
import "../css/Navbar.css"

class Navbar extends Component {

   handleLogout = () => {
      store.dispatch(isLoggedIn(false))
      store.dispatch(loggedInUsername(""))
      store.dispatch(saveToken("false"))
   }

   render() {
      const { isLoggedIn, username } = store.getState()

      const logoutLink =
         <div className="Navbar-right">
            <Link to="/" className="Navbar-right-links" onClick={this.handleLogout}>Logout</Link>
         </div>

      return (
         <div className="Navbar">
            <div className="Navbar-left">
               {isLoggedIn ? <span>You are logged in as: {username} </span> : null}
            </div>
            {isLoggedIn ? logoutLink : null}
         </div >
      )
   }
}

export default Navbar