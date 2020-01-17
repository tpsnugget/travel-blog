export default (state, action) => {

   switch(action.type){

      case "HANDLE_CHANGE":
      return {
         ...state,
         [action.label]: action.value
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

      case "SAVE_TOKEN":
      return {
         ...state,
         token: action.token
      }

      default:
      return state
   }
}