import React from "react";
import "../Styles/About.css"; // Ensure to import the CSS file for styling

const About = () => {
  return (
    <div className="about-content">
      <h1>About MRec</h1>
      <p>
        MRec is a state-of-the-art music recommendation application designed to
        offer a personalized listening experience. Our advanced algorithms
        analyze your listening patterns to suggest new tracks and artists that
        you might enjoy. Whether you’re a casual listener or a dedicated
        audiophile, MRec curates a playlist that evolves with your musical
        preferences.
      </p>
      <p>
        Our vision is to transform the way people discover and enjoy music. By
        leveraging cutting-edge technology and user-centric design, we aim to
        create a platform that provides not just recommendations but a whole new
        way to experience music.
      </p>
      <h2>Meet the Team</h2>
      <div className="team">
        <div className="team-member">
          <h3>Rahul Boney</h3>
          <a
            href="https://www.linkedin.com/in/rahul-boney-90b5021b0/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn Profile
          </a>
        </div>
        <div className="team-member">
          <h3>David George</h3>
          <a
            href="https://www.linkedin.com/in/dg042567/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn Profile
          </a>
        </div>
        <div className="team-member">
          <h3>Alvin Joseph</h3>
          <a
            href="https://www.linkedin.com/in/alvin-joseph-8b92522a2/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn Profile
          </a>
        </div>
      </div>
      <div className="footer">
        <p>Created by Rahul Boney, David George, and Alvin Joseph</p>
      </div>
    </div>
  );
};

export default About;
