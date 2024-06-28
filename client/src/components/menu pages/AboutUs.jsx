//AboutUs.jsx
import React from 'react';
import './AboutUs.css';
import aboutUsImage from "../../img/chat.png";

const AboutUs = () => {
  return (
    <div className="about-us">
      <div className="container">
        <div className="about-content">
          <div className="about-text">
            <h1>About Us</h1>
            <p>
              Welcome to [Your Website Name], the ultimate destination for video sharing and viewing.
              Our mission is to provide a platform where creators can share their unique content and
              viewers can discover amazing videos from around the world. Unlike traditional platforms,
              we ensure our creators earn money from day one, making creativity more rewarding.
            </p>
            <p>
              Our team is dedicated to delivering the best user experience with high-quality video streaming,
              real-time analytics, and advanced video recommendations. We believe in empowering our users and
              fostering a community where everyone can express themselves freely and safely.
            </p>
            <p>
              Thank you for being a part of our journey. Let's create and discover together!
            </p>
          </div>
          <div className="about-image">
            <img src={aboutUsImage} alt="About Us" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
