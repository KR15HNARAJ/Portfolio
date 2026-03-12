import { motion } from "framer-motion";
import { FiArrowRight, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";

const HeroSection = () => (
  <section id="home" className="hero-section">
    <div className="container hero-grid">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="hero-copy"
      >
        <p className="hero-chip">
          Java Developer
        </p>
        <h1 className="hero-title">
          Hi, I&apos;m <span>Krishnaraj</span>.
          <br />
          Crafting robust applications with Java&nbsp;&amp;&nbsp;Spring&nbsp;Boot.
        </h1>
        <p className="hero-text">
          I build reliable backend systems with Java and Spring Boot, create clean
          interfaces with React, and am currently expanding into cross-platform
          mobile development with Flutter.
        </p>

        <div className="hero-actions">
          <a href="#projects" className="btn btn-primary">
            View Projects <FiArrowRight />
          </a>
          <a href="#contact" className="btn btn-outline">
            Contact Me <FiMail />
          </a>
        </div>

        <div className="hero-socials">
          <a href="https://github.com/KR15HNARAJ" target="_blank" rel="noreferrer" aria-label="GitHub" className="icon-link">
            <FiGithub size={20} />
          </a>
          <a href="https://www.linkedin.com/in/krishnarajpackirisamy" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="icon-link">
            <FiLinkedin size={20} />
          </a>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        className="hero-panel"
      >
        <div className="hero-panel-content">
          <p className="hero-panel-label">At a Glance</p>
          <div className="hero-metrics">
            <div className="hero-metric-card">
              <p className="hero-metric-label">Stack</p>
              <p>Java · Spring Boot · React</p>
            </div>
            <div className="hero-metric-card">
              <p className="hero-metric-label">Currently Learning</p>
              <p>Flutter & Dart</p>
            </div>
            <div className="hero-metric-card">
              <p className="hero-metric-label">Focus</p>
              <p>Backend Engineering</p>
            </div>
            <div className="hero-metric-card">
              <p className="hero-metric-label">Open To</p>
              <p>Opportunities</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default HeroSection;
