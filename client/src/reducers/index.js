export default (state, action) => {

   switch(action.type){

      case "ADD_IMAGE":
      return {
         ...state,
         images: [action.images]
      }

      case "GOOD_DELETE":
      return {
         ...state,
         goodDelete: action.goodDelete
      }

      case "HANDLE_CHANGE":
      return {
         ...state,
         [action.label]: action.value
      }

      case "HANDLE_PHOTO":
      // console.log("reducer action.image is ", action.image)
      return {
         ...state,
         images: [...state.images, action.image],
         image: ""
      }

      case "HANDLE_PHOTO_EDIT":
      console.log("HANDLE_PHOTO_EDIT Reducer array is", action.images)
      return {
         ...state,
         blog: {...state.blog, images: action.images }
      }

      case "HAS_PROFILE":
      return {
         ...state,
         hasProfile: action.hasProfile
      }

      case "ID":
      return {
         ...state,
         id: action.id
      }

      case "IS_LOGGED_IN":
      return {
         ...state,
         isLoggedIn: action.isLoggedIn
      }
      
      case "LOGGED_IN_USERNAME":
      return {
         ...state,
         username: action.username
      }

      case "NEW_BLOG_ADDED":
      // console.log("Reducer NEW_BLOG_ADDED is running...")
      return {
         ...state,
         image: "",
         images: [],
         newBlogAdded: action.newBlogAdded,
         text: "",
         title: ""
      }

      case "NEED_TO_SIGNUP":
      return {
         ...state,
         needToSignup: action.needToSignup
      }

      case "SAVE_BLOG_ID":
      return {
         ...state,
         blogId: action.blogId
      }

      case "SAVE_A_BLOG":
      return {
         ...state,
         blog: action.blog
      }

      case "SAVE_BLOGS":
      return {
         ...state,
         blogs: action.blogs
      }

      case "SAVE_TOKEN":
      return {
         ...state,
         token: action.token
      }

      default:
      return state
   }
}