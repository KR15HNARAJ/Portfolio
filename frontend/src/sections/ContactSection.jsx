import { useState } from "react";
import { FiGithub, FiLinkedin, FiSend } from "react-icons/fi";
import Reveal from "../components/Reveal";
import SectionTitle from "../components/SectionTitle";
import { apiRequest } from "../utils/api";

const initialState = {
  name: "",
  email: "",
  message: ""
};

const ContactSection = () => {
  const [formData, setFormData] = useState(initialState);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const onChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      await apiRequest("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      setStatus({ type: "success", message: "Thanks, your message has been sent." });
      setFormData(initialState);
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section container">
      <Reveal>
        <SectionTitle
          title="Contact"
          subtitle="Open to entry-level full stack opportunities, internships, and collaborative projects."
        />
      </Reveal>

      <div className="contact-layout">
        <Reveal delay={0.08}>
          <aside className="contact-info-card">
            <div>
              <p className="contact-side-label">
                Let&apos;s Connect
              </p>
              <h3 className="contact-side-title">Tell me about your opportunity</h3>
              <p className="contact-side-text">
                Reach out through the form or connect with me on social platforms.
              </p>
              <div className="contact-socials">
                <a href="https://github.com/KR15HNARAJ" target="_blank" rel="noreferrer" aria-label="GitHub" className="icon-link">
                  <FiGithub size={20} />
                </a>
                <a href="https://www.linkedin.com/in/krishnarajpackirisamy" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="icon-link">
                  <FiLinkedin size={20} />
                </a>
              </div>
            </div>
          </aside>
        </Reveal>

        <Reveal delay={0.14}>
          <form onSubmit={onSubmit} className="contact-form-card">
            <div className="contact-form-head">
              <h3>Send a Message</h3>
            </div>
            <div className="field">
              <label htmlFor="name">
                Name
              </label>
              <input
                id="name"
                name="name"
                value={formData.name}
                onChange={onChange}
                required
                className="input"
              />
            </div>
            <div className="field">
              <label htmlFor="email">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={onChange}
                required
                className="input"
              />
            </div>
            <div className="field">
              <label htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={onChange}
                required
                className="input"
              />
            </div>
            <button disabled={submitting} className="btn btn-primary contact-submit-btn">
              <FiSend size={15} />
              {submitting ? "Sending..." : "Send Message"}
            </button>
            {status.message ? (
              <p className={status.type === "success" ? "status-msg status-success" : "status-msg status-error"}>
                {status.message}
              </p>
            ) : null}
          </form>
        </Reveal>
      </div>
    </section>
  );
};

export default ContactSection;
