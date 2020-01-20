export function addImage(e){
   return {
      type: "ADD_IMAGE",
      images: e.target.value
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

export function isLoggedIn(BOOL){
   return {
      type: "IS_LOGGED_IN",
      isLoggedIn: BOOL
   }
}

export function loggedInName(name){
   return {
      type: "LOGGED_IN_NAME",
      name: name
   }
}

export function needToSignup(BOOL){
   return {
      type: "NEED_TO_SIGNUP",
      needToSignup: BOOL
   }
}

export function saveToken(token){
   return {
      type: "SAVE_TOKEN",
      token: token
   }
}