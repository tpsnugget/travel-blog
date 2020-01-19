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
      return {
         ...state,
         images: [...state.images, action.images]
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

      case "SAVE_TOKEN":
      return {
         ...state,
         token: action.token
      }

      default:
      return state
   }
}