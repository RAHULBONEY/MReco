import React from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "./firebase";
import { toast } from "react-toastify";
import { setDoc, doc } from "firebase/firestore";
import "../Styles/SignIn.css";

function SignInWithGoogle() {
  const googleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("User logged in with Google:", user);
      const idToken = await user.getIdToken();
      console.log("User JWT token:", idToken);

      // Save user data to Firestore
      await setDoc(doc(db, "Users", user.uid), {
        email: user.email,
        firstName: user.displayName || "",
        photo: user.photoURL || "",
        lastName: "",
      });

      toast.success("User logged in Successfully", {
        position: "top-center",
      });

      // Redirect to home page or perform other actions
      window.location.href = "/home";
    } catch (error) {
      toast.error(error.message, { position: "bottom-center" });
    }
  };

  return (
    <div className="google-signin-container">
      <p className="continue-p">--Or continue with--</p>
      <div className="google-icon-container" onClick={googleLogin}>
        <img src="/google.png" alt="Google Sign In" className="google-icon" />
      </div>
    </div>
  );
}

export default SignInWithGoogle;
