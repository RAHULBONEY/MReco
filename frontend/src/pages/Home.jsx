import React, { useEffect, useState } from "react";
import { auth } from "../Components/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import "../Styles/Home.css";

const Home = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout Error: ", error);
    }
  };

  return (
    <>
      <Header />
      <div className="home-content">
        <h1>Welcome to MRec</h1>
        {user ? (
          <div>
            <p>Hello, {user.displayName || user.email}!</p>
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <p>Welcome to MRec! Please log in to enjoy personalized features.</p>
        )}
        <p>
          Discover new music based on your listening patterns and enjoy a
          curated experience like never before.
        </p>
        <div className="cta-buttons">
          <button
            className="cta-button"
            onClick={() => navigate("/get-started")}
          >
            Get Started
          </button>
          <a href="/home/explore">
            <button className="cta-button">Explore Music</button>
          </a>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
