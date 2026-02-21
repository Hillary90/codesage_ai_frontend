import React from "react";
import { Link } from "react-router-dom";

const Privacy = () => {
  return (
    <div className="container" style={{ padding: "4rem 1rem" }}>
      <div className="card-surface" style={{ maxWidth: 900, margin: "0 auto" }}>
        <h1>Privacy Policy</h1>
        <p>
          This Privacy Policy describes how CodeSage AI collects, uses, and
          discloses information. We respect your privacy and are committed to
          protecting your personal data.
        </p>
        <h3>Data We Collect</h3>
        <p>
          We may collect the following information: account details, code
          submissions (when you submit code for review), and usage analytics.
        </p>

        <h3>How We Use Your Data</h3>
        <p>
          We use data to provide, maintain, and improve our services, to
          communicate with you, and to ensure security.
        </p>

        <p>
          For full details, please contact us via the{" "}
          <Link to="/contact">Contact</Link> page.
        </p>
      </div>
    </div>
  );
};

export default Privacy;
