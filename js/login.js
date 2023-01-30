firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in
    if(user.emailVerified){
      window.location.replace("./Profile.html");
    } else {
      window.location.replace("./Email-Verification.html");
    }
  } else {
    // User is signed out
    document.getElementsByClassName("login_with_google_button")[0].onclick = function() { signInWithGooglePopup() };
    document.getElementsByName("login_form")[0].onsubmit = function() {signIn()};

  }
});


//log in by google
function signInWithGooglePopup() {
  
  var googleAuthProvider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().useDeviceLanguage();

  firebase.auth()
    .signInWithPopup(googleAuthProvider)
    .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
      var credential = result.credential;

      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      
      if(user.emailVerified){
        window.location.replace("./Profile.html");
      } else {
        window.location.replace("./Email-Verification.html");
      }
    }).catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;

      console.log(errorCode);
      console.log(errorMessage);

      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
}


//login with email and password
function signIn() {

  let email = document.getElementsByName("username")[0].value;
  let password = document.getElementsByName("password")[0].value;


  firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    
    if(user.emailVerified){
      window.location.replace("./Profile.html");
    } else {
      window.location.replace("./Email-Verification.html");
    }
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    
    console.log(errorCode);
    console.log(errorMessage);
  });
}
