export function addImage(e){
   return {
      type: "ADD_IMAGE",
      images: e.target.value
   }
}

export function addCommentToCommentArray(res){
   console.log("addCommentToCommentArray action creator res is", res)
   return {
      type: "ADD_COMMENT_TO_COMMENT_ARRAY",
      commentArray: res
   }
}

export function blogUpdated(BOOL){
   return {
      type: "BLOG_UPDATED",
      blogUpdated: BOOL
   }
}

export function clearBlogData(){
   return {
      type: "CLEAR_BLOG_DATA"
   }
}

export function clearSignupInfo(){
   return {
      type: "CLEAR_SIGNUP_INFO"
   }
}

export function commentAdded(BOOL){
   return {
      type: "COMMENT_ADDED",
      commentAdded: BOOL
   }
}

export function goodDelete(BOOL){
   return {
      type: "GOOD_DELETE",
      goodDelete: BOOL
   }
}

export function goodSignup(BOOL){
   return {
      type: "GOOD_SIGNUP",
      goodSignup: BOOL
   }
}

export function handleChange(e){
   return {
      type: "HANDLE_CHANGE",
      label: e.target.name,
      value: e.target.value
   }
}

export function handleComment(commentText) {
   return {
      type: "HANDLE_COMMENT",
      commentText: commentText
   }
}

export function handlePhoto(image){
   // console.log("action creator image is ", image)
   return {
      type: "HANDLE_PHOTO",
      image: image
   }
}

export function handlePhotoEdit(images){
   return {
      type: "HANDLE_PHOTO_EDIT",
      images: images
   }
}

export function hasCommentsUpdate(BOOL){
   return {
      type: "HAS_COMMENTS_UPDATE",
      hasComments: BOOL
   }
}

export function hasProfile(BOOL){
   return {
      type: "HAS_PROFILE",
      hasProfile: BOOL
   }
}

export function id(id){
   return {
      type: "ID",
      id: id
   }
}

export function isLoggedIn(BOOL){
   return {
      type: "IS_LOGGED_IN",
      isLoggedIn: BOOL
   }
}

export function loggedInData(id, token, username){
   return {
      type: "LOGGED_IN_DATA",
      id: id,
      token: token,
      username: username
   }
}

export function loggedInUsername(username){
   return {
      type: "LOGGED_IN_USERNAME",
      username: username
   }
}

export function needToSignup(BOOL){
   return {
      type: "NEED_TO_SIGNUP",
      needToSignup: BOOL
   }
}

export function newBlogAdded(BOOL){
   return {
      type: "NEW_BLOG_ADDED",
      newBlogAdded: BOOL
   }
}

export function resetBlogData(){
   return {
      type: "RESET_BLOG_DATA"
   }
}

export function saveABlog(blog){
   return {
      type: "SAVE_A_BLOG",
      blog: blog
   }
}

export function saveBlogId(id){
   return {
      type: "SAVE_BLOG_ID",
      blogId: id
   }
}

export function saveBlogData(blog){
   return {
      type: "SAVE_BLOG_DATA",
      blogId: blog._id,
      hasComments: blog.hasComments,
      images: blog.images,
      text: blog.text,
      title: blog.title
   }
}

export function saveBlogs(blogs){
   return {
      type: "SAVE_BLOGS",
      blogs: blogs
   }
}

export function saveCommentArray(array){
   return {
      type: "SAVE_COMMENT_ARRAY",
      commentArray: array
   }
}

export function saveErrors(errors){
   console.log("saveErrors action creator errers are", errors)
   return {
      type: "SAVE_ERRORS",
      errors: errors
   }
}

export function saveToken(token){
   return {
      type: "SAVE_TOKEN",
      token: token
   }
}

export function snackBarGreenOpen(BOOL, msg){
   return {
      type: "SNACK_BAR_GREEN_OPEN",
      snackBarGreenOpen: BOOL,
      msg: msg
   }
}

export function snackBarRedOpen(BOOL, msg){
   return {
      type: "SNACK_BAR_RED_OPEN",
      snackBarRedOpen: BOOL,
      msg: msg
   }
}