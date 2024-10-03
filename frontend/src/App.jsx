import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./Components/Login";
import SignUp from "./Components/Register";
import PrivacyPolicy from "./pages/Privacy";
import About from "./pages/About";
import Home from "./pages/Home";
import GetStarted from "./pages/GetStarted"; // Import the new page
import Explore from "./pages/Explore";
import Songs from "./pages/Songs";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "./Components/firebase";
import SongReco from "./pages/SongReco";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={user ? <Navigate to="/home" /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={
              <div className="auth-wrapper">
                <div className="auth-inner">
                  <Login />
                </div>
              </div>
            }
          />
          <Route
            path="/register"
            element={
              <div className="auth-wrapper">
                <div className="auth-inner">
                  <SignUp />
                </div>
              </div>
            }
          />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/about" element={<About />} />
          <Route path="/home/explore" element={<Explore />} />
          <Route path="/home/explore/songs" element={<Songs />} />
          <Route
            path="/home"
            element={user ? <Home /> : <Navigate to="/login" />}
          />
          <Route path="/get-started" element={<GetStarted />} />
          <Route path="/get-started/recommendations" element={<SongReco />} />
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
