import React, { Component } from "react"
import Moment from "react-moment"
import { store } from "../store"
import { handleChange, handlePhoto, saveABlog, saveBlogData } from "../actions"
import { ImageThumbnail } from "../Atoms/ImageThumbnail/ImageThumbnail"
import { LinkButton } from "../Atoms/LinkButton/LinkButton"
import Mininavbar from "../pages/Mininavbar"
import "../css/ShowBlog.css"

class ShowBlog extends Component {

   componentDidMount() {

      if(this.props.location.state === undefined){
         const { blogId } = store.getState()
         var id = blogId
      }
      else {
         var { id } = this.props.location.state

      }

      // console.log("ShowBlog Blog Component id is ", id)

      const url = `http://localhost:9000/api/blogs/show/${id}`

      // console.log("ShowBlog Blog Component url is ", url)

      fetch(url, {
         method: "GET"
      })
         .then(res => res.json())
         .then(res => {
            if (res.errors) {
               console.log("There were", res.errors.length, "errors returned")
               console.log("This error was returned from the server: ", res.errors[0].msg)
            } else {
               // console.log("One Blog returned was ", res)
               store.dispatch(saveABlog(res))
               // This saves id, images, text and title in the store for use by EditBlog
               store.dispatch(saveBlogData(res))
            }
         })
   }

   handlePhoto = (e) => {
      e.preventDefault()
      const { image } = store.getState()
      // console.log("ShowBlog Component image", image)
      store.dispatch(handlePhoto(image))
   }

   handleChange = (e) => {
      store.dispatch(handleChange(e))
   }

   render() {

      const { blog } = store.getState()
      var { addedByUsername, date, images, text, title } = blog

      if (!images) { images = [] }

      var imagesToDisplay = []

      if (images.length > 0) {
         imagesToDisplay = images.map((image) =>
            <ImageThumbnail key={image} image={image} />
         )
      }

      return (
         <div className="ShowBlog-main-container">

            <div className="ShowBlog-header">
               <h1>{title}</h1>
               <span><LinkButton name="Cancel" newPath={"/blog/main"} /></span>
            </div>

            <div className="ShowBlog-blog-container">

               <div className="ShowBlog-div">
               <Mininavbar />
                  <div>
                     <h2>{title}</h2>
                  </div>
                  <div>
                     <p>{text}</p>
                  </div>
                  <div className="ShowBlog-imagethumbnail">
                     {imagesToDisplay}
                  </div>
                  <div className="ShowBlog-addedby-date">
                     <div className="ShowBlog-bottom-container">
                        <strong>Added By:</strong>{"  "}{addedByUsername}
                     </div>
                     <div className="ShowBlog-bottom-container">
                        <strong>on:</strong>{"  "}
                        <Moment format="DD MMM, YYYY at HH:MM a">
                           {date}
                        </Moment>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      )
   }
}

export default ShowBlog