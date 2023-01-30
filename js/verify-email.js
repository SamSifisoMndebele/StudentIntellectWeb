firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // User is signed in
        if(user.emailVerified){
            window.location.replace("./Profile.html");
        } else {
            //verify here
            document.getElementsByClassName("cancel_verification")[0].onclick = function() {
                firebase.auth().signOut().then(() => {
                    // Sign-out successful.
                    window.location.replace("./Login.html");
                }).catch((error) => {
                    // An error happened.
                    console.log(error);
                });
            };
            
            user.sendEmailVerification()
                .then(() => {
                    // Email verification sent!
                    document.getElementsByClassName("email_sent_text")[0].textContent = "A verification email is sent to "+ user.email +", please verify your email address and/or continue bellow.";
                });
            document.getElementsByClassName("sent_verification_email_button")[0].onclick = function() {
                user.sendEmailVerification()
                .then(() => {
                    // Email verification sent!
                    document.getElementsByClassName("email_sent_text")[0].textContent = "A verification email is resent to "+ user.email +", please verify your email address and/or continue bellow.";
                });
            };

            document.getElementsByClassName("continue_button")[0].onclick = function() {
                if(user.emailVerified){
                    window.location.replace("./Profile.html");
                }
            };
            
        }
    } else {
        // User is signed out
        window.location.replace("./Login.html");
    }
  });