import React from "react";
import "../Styles/Privacy.css";

const PrivacyPolicy = () => {
  return (
    <div className="privacy-content">
      <h1>Privacy Policy</h1>
      <p>
        Welcome to MRec's Privacy Policy. We are committed to protecting your
        personal information and your right to privacy. This Privacy Policy
        explains how we collect, use, and disclose your information when you use
        our website and services.
      </p>
      <h2>1. Information We Collect</h2>
      <p>
        We may collect personal information that you provide to us, including
        but not limited to your name, email address, and preferences. We may
        also collect non-personal information such as usage data and analytics.
      </p>
      <h2>2. How We Use Your Information</h2>
      <p>We use the information we collect to:</p>
      <ul>
        <li>Provide and improve our services</li>
        <li>Communicate with you</li>
        <li>Personalize your experience</li>
        <li>Analyze usage patterns</li>
      </ul>
      <h2>3. How We Share Your Information</h2>
      <p>
        We do not sell or rent your personal information to third parties. We
        may share your information with service providers who assist us in
        operating our website and services.
      </p>
      <h2>4. Data Security</h2>
      <p>
        We implement reasonable measures to protect your information from
        unauthorized access, use, or disclosure. However, no data transmission
        over the internet can be guaranteed to be completely secure.
      </p>
      <h2>5. Your Choices</h2>
      <p>
        You may update or delete your personal information by contacting us. You
        may also opt-out of receiving promotional communications from us by
        following the unsubscribe instructions provided in those communications.
      </p>
      <h2>6. Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. We will notify you
        of any significant changes by posting the new policy on our website.
      </p>
      <h2>7. Contact Us</h2>
      <p>
        If you have any questions about this Privacy Policy, please contact us
        at support@mrec.com.
      </p>
      <div className="footer">
        <p>© {new Date().getFullYear()} MRec. All rights reserved.</p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
