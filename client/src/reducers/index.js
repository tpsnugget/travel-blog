export default (state, action) => {

   switch(action.type){

      case "ADD_IMAGE":
      return {
         ...state,
         images: [action.images]
      }

      case "ADD_COMMENT_TO_COMMENT_ARRAY":
      console.log("addCommentToCommentArray reducer res is", action.commentArray)
      return {
         ...state,
         commentArray: [...state.commentArray, action.commentArray],
         commentText: ""
      }

      case "BLOG_UPDATED":
      return {
         ...state,
         blogUpdated: action.blogUpdated
      }

      case "CLEAR_BLOG_DATA":
      return {
         ...state,
         blogId: "",
         hasComments: "",
         images: "",
         text: "",
         title: "",
      }

      case "CLEAR_SIGNUP_INFO":
      return {
         ...state,
         goodSignup: true,
         email: "",
         msg: "",
         snackBarGreenOpen: false,
         username: ""
      }

      case "COMMENT_ADDED":
      return {
         ...state,
         commentAdded: action.commentAdded
      }

      case "GOOD_DELETE":
      return {
         ...state,
         goodDelete: action.goodDelete
      }

      case "GOOD_SIGNUP":
      return {
         ...state,
         goodSignup: action.goodSignup
      }

      case "HANDLE_CHANGE":
      return {
         ...state,
         [action.label]: action.value
      }

      case "HANDLE_COMMENT":
      // console.log("HANDLE_COMMENT Reducer action.commentText is", action.commentText)
      return {
         ...state,
         commentAdded: true,
         commentArray: [...state.commentArray, action.commentText],
         commentText: ""
      }

      case "HANDLE_PHOTO":
      // console.log("reducer action.image is ", action.image)
      return {
         ...state,
         images: [...state.images, action.image],
         image: ""
      }

      case "HANDLE_PHOTO_EDIT":
      // console.log("HANDLE_PHOTO_EDIT Reducer array is", action.images)
      return {
         ...state,
         images: action.images
      }

      case "HAS_COMMENTS_UPDATE":
      // console.log("HAS_COMMENT reducer is", action.hasComment)
      return {
         ...state,
         hasComments: action.hasComments
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

      case "LOGGED_IN_DATA":
      return {
         ...state,
         hasProfile: true,
         id: action.id,
         isLoggedIn: true,
         lastLoggedInDate: action.lastLoggedInDate,
         loggedInDate: action.loggedInDate,
         msg: "",
         snackBarGreenOpen: false,
         token: action.token,
         username: action.username
      }
      
      case "LOGGED_IN_USERNAME":
      return {
         ...state,
         username: action.username
      }

      case "LOGOUT":
      return {
         ...state,
         isLoggedIn: false,
         lastLoggedInDate: "",
         loggedInDate: "",
         loggedInUsername: "",
         token: ""
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

      case "RESET_BLOG_DATA":
      return {
         ...state,
         blogId: "",
         images: [],
         text: "",
         title: "",
      }

      case "SAVE_A_BLOG":
      return {
         ...state,
         blog: action.blog
      }

      case "SAVE_BLOG_DATA":
      return {
         ...state,
         blogId: action.blogId,
         hasComments: action.hasComments,
         images: action.images,
         text: action.text,
         title: action.title,
      }

      case "SAVE_BLOG_ID":
      return {
         ...state,
         blogId: action.blogId
      }

      case "SAVE_BLOGS":
      return {
         ...state,
         blogs: action.blogs
      }

      case "SAVE_COMMENT_ARRAY":
      console.log("SAVE_COMMENT_ARRAY numComments is", action.commentArray.length)
      return {
         ...state,
         commentArray: action.commentArray,
         numComments: action.commentArray.length
      }

      case "SAVE_ERROS":
      return {
         ...state,
         errors: action.errors
      }

      case "SAVE_TOKEN":
      return {
         ...state,
         token: action.token
      }

      case "SNACK_BAR_GREEN_OPEN":
      // console.log("SNACK_BAR_GREEN_OPEN ", action)
      return {
         ...state,
         snackBarGreenOpen: action.snackBarGreenOpen,
         msg: action.msg
      }

      case "SNACK_BAR_RED_OPEN":
      return {
         ...state,
         snackBarRedOpen: action.snackBarRedOpen,
         msg: action.msg
      }

      default:
      return state
   }
}