firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in
      if(user.emailVerified){
        updateUI(user);
      } else {
        window.location.replace("./Email-Verification.html");
      }
    } else {
      // User is signed out
      window.location.replace("./Login.html");
    }
  });
  
  
  document.getElementsByClassName("log_out_button")[0].onclick = function() {
    firebase.auth().signOut().then(() => {
      // Sign-out successful.
      window.location.replace("./Login.html");
    }).catch((error) => {
      // An error happened.
      console.log(error);
    });
  };
  
  function updateUI(user){
    const emailVerified = user.emailVerified;
  
    document.getElementsByClassName("email_text")[0].innerText = user.email;
    document.getElementsByClassName("name_text")[0].innerText = user.displayName;
    document.getElementsByClassName("profile_photo")[0].src = user.photoURL;
  
    
  
  
  
    console.log("  UID: " + user.uid);
    console.log("  Name: " + user.displayName);
    console.log("  Email: " + user.email);
    console.log("  Photo URL: " + user.photoURL);
  }
  
  
  
  