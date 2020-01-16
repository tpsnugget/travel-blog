export default (state, action) => {

   switch(action.type){
      case "name":
      return {
         ...state,
         key: action.value
      }
      default:
      return state
   }
}