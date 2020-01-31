import React, { Component } from "react"
import { Link } from "react-router-dom"
import { store } from "../store"
import { logout } from "../actions"
import "../css/Navbar.css"

class Navbar extends Component {

   handleLogout = () => {

      const { id, lastLoggedInDate, loggedInDate } = store.getState()
      // console.log("Navbar Component lastLoggedInDate is", lastLoggedInDate)
      // console.log("Navbar Component loggedInDate is", loggedInDate)

      fetch("http://localhost:9000/api/users/lastloggedindate", {
         method: "PUT",
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify({ id: id, lastLoggedInDate: lastLoggedInDate, loggedInDate: loggedInDate })
      })
         .then( res => res.json() )
         .then( res => {
            // console.log("Navbar Component res is", res)
         })

      store.dispatch(logout())
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