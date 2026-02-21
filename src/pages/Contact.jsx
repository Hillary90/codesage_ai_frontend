import React, { useState } from "react";

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="container" style={{ padding: "4rem 1rem" }}>
      <div className="card-surface" style={{ maxWidth: 720, margin: "0 auto" }}>
        <h1>Contact Us</h1>
        <p>
          If you have questions about Privacy, Terms, or need help, drop us a
          message.
        </p>

        {!submitted ? (
          <form onSubmit={handleSubmit} aria-label="Contact form">
            <div style={{ display: "grid", gap: "0.75rem" }}>
              <label>
                Name
                <input
                  name="name"
                  type="text"
                  required
                  style={{
                    width: "100%",
                    padding: "0.5rem",
                    marginTop: "0.25rem",
                  }}
                />
              </label>
              <label>
                Email
                <input
                  name="email"
                  type="email"
                  required
                  style={{
                    width: "100%",
                    padding: "0.5rem",
                    marginTop: "0.25rem",
                  }}
                />
              </label>
              <label>
                Message
                <textarea
                  name="message"
                  rows={6}
                  required
                  style={{
                    width: "100%",
                    padding: "0.5rem",
                    marginTop: "0.25rem",
                  }}
                />
              </label>
            </div>

            <div style={{ marginTop: "1rem", display: "flex", gap: "0.5rem" }}>
              <button type="submit" className="btn-primary">
                Send Message
              </button>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setSubmitted(true)}
              >
                Or Demo Submit
              </button>
            </div>
          </form>
        ) : (
          <div>
            <h3>Thanks — we'll get back to you soon.</h3>
            <p>If this was urgent, email hello@codesage.ai</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Contact;
