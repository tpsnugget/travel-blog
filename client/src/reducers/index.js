export default (state, action) => {

   switch(action.type){

      case "ADD_IMAGE":
      return {
         ...state,
         images: [action.images]
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
      
      case "LOGGED_IN_NAME":
      return {
         ...state,
         name: action.name
      }

      case "NEED_TO_SIGNUP":
      return {
         ...state,
         needToSignup: action.needToSignup
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