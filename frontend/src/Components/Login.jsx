import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "./firebase";
import { toast } from "react-toastify";
import SignInWithGoogle from "./signInWithGoogle";
import "../Styles/Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in successfully:", user);
      const idToken = await user.getIdToken();
      console.log("User JWT token:", idToken);
      toast.success("User logged in Successfully", { position: "top-center" });
      window.location.href = "/home";
    } catch (error) {
      toast.error(error.message, { position: "bottom-center" });
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h3 className="form-title">Login</h3>

        <div className="form-group">
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-input"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-input"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-button">
            Submit
          </button>
        </div>

        <p className="form-footer">
          New user?{" "}
          <a href="/register" className="footer-link">
            Register Here
          </a>
        </p>

        <SignInWithGoogle />
      </form>
    </div>
  );
}

export default Login;
