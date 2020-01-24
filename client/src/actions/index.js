export function addImage(e){
   return {
      type: "ADD_IMAGE",
      images: e.target.value
   }
}

export function goodDelete(BOOL){
   return {
      type: "GOOD_DELETE",
      goodDelete: BOOL
   }
}

export function handleChange(e){
   return {
      type: "HANDLE_CHANGE",
      label: e.target.name,
      value: e.target.value
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

export function saveBlogId(id){
   return {
      type: "SAVE_BLOG_ID",
      blogId: id
   }
}

export function saveABlog(blog){
   return {
      type: "SAVE_A_BLOG",
      blog: blog
   }
}

export function saveBlogs(blogs){
   return {
      type: "SAVE_BLOGS",
      blogs: blogs
   }
}

export function saveToken(token){
   return {
      type: "SAVE_TOKEN",
      token: token
   }
}