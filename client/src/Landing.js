import React, { Component } from "react"
import { store } from "./store"
import { isLoggedIn, loggedInName, saveToken } from "./actions"

class Landing extends Component {

   componentDidMount() {

      const data = {
         "name": "Mike Giebner",
         "email": "mikegiebner@gmail.com",
         "password": "123456"
      }

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
               store.dispatch(isLoggedIn(true))
               store.dispatch(loggedInName(res.name))
               store.dispatch(saveToken(res.token))
            }
         })
   }

   render() {

      const { isLoggedIn, name } = store.getState()

      return (
         <div>
            <h1>Landing is up Man!</h1>
            {isLoggedIn ? <h2>{`${name} is Logged In!`}</h2> : <h2>Login Not Successful...</h2>}
         </div>
      )
   }
}

export default Landing