import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Styles/GetStarted.css";
import { loginEndpoint } from "../Components/spotify";

const GetStarted = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    pref: "",
    artists: "", // Changed from languages to artists
    place: "",
    profilepic: null,
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, profilepic: e.target.files[0] });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("pref", formData.pref);
    data.append("artists", formData.artists); // Changed from languages to artists
    data.append("place", formData.place);
    if (formData.profilepic) {
      data.append("profilepic", formData.profilepic);
    }

    try {
      await axios.post("http://localhost:4000/user/register", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      window.location.href = loginEndpoint;
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
  };

  const handleLeave = () => {
    navigate("/home");
  };

  return (
    <div className="get-started-page">
      <h1>Get Ready !!</h1>
      <form onSubmit={handleFormSubmit} className="user-form">
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Preferences:
          <select
            name="pref"
            value={formData.pref}
            onChange={handleInputChange}
            required
          >
            <option value="">Select your preference</option>
            <option value="jazz">Jazz</option>
            <option value="hip-hop">Hip-hop</option>
            <option value="pop">Pop</option>
            <option value="country">Country</option>
            <option value="funk">Funk</option>
            <option value="classical">Classical</option>
            <option value="electronic">Electronic</option>
            <option value="soul">Soul</option>
            <option value="opera">Opera</option>
            <option value="folk">Folk</option>
            <option value="dance">Dance</option>
            <option value="party">Party</option>
            <option value="desi hip-hop">Desi Hip Hop</option>
          </select>
        </label>
        <label>
          Artists:
          <input
            type="text"
            name="artists" // Keep the name as artists
            value={formData.artists} // Update to reflect the artists field
            onChange={handleInputChange}
          />
        </label>
        <label>
          Place of Residence:
          <input
            type="text"
            name="place"
            value={formData.place}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Profile Picture:
          <input type="file" name="profilepic" onChange={handleFileChange} />
        </label>
        <button type="submit">Submit</button>
        <button type="button" className="leave-button" onClick={handleLeave}>
          Leave
        </button>
      </form>
    </div>
  );
};

export default GetStarted;
