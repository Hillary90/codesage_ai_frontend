import React from "react";
import { Link } from "react-router-dom";

const Terms = () => {
  return (
    <div className="container" style={{ padding: "4rem 1rem" }}>
      <div className="card-surface" style={{ maxWidth: 900, margin: "0 auto" }}>
        <h1>Terms of Service</h1>
        <p>
          These Terms govern your use of CodeSage AI. By accessing or using the
          service you agree to be bound by these terms.
        </p>

        <h3>Use of the Service</h3>
        <p>
          Use the platform responsibly. Do not upload sensitive information you
          do not own or have permission to share.
        </p>

        <h3>Limitation of Liability</h3>
        <p>
          To the fullest extent permitted by law, CodeSage AI is not liable for
          indirect damages arising from use of the service.
        </p>

        <p>
          Questions? See our <Link to="/contact">Contact</Link> page.
        </p>
      </div>
    </div>
  );
};

export default Terms;
