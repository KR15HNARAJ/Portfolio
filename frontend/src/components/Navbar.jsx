import { FiGithub, FiLinkedin, FiMenu, FiX } from "react-icons/fi";
import { useState } from "react";
import { Link } from "react-router-dom";
import { navLinks } from "../data/siteData";
import KrishnaPhoto from "../assets/KrishnaPhoto.jpg";
import ThemeToggle from "./ThemeToggle";

const Navbar = ({ theme, toggleTheme }) => {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container nav-inner">
        <a href="#home" className="brand-link" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img src={KrishnaPhoto} alt="Krishnaraj" className="nav-avatar" />
          Krishnaraj
        </a>

        <nav className="desktop-nav">
          {navLinks.map((item) => (
            <a key={item.id} href={`#${item.id}`} className="nav-link">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="desktop-actions">
          <a href="https://github.com/KR15HNARAJ" target="_blank" rel="noreferrer" className="icon-link" aria-label="GitHub">
            <FiGithub size={18} />
          </a>
          <a href="https://www.linkedin.com/in/krishnarajpackirisamy" target="_blank" rel="noreferrer" className="icon-link" aria-label="LinkedIn">
            <FiLinkedin size={18} />
          </a>
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </div>

        <div className="mobile-menu-toggle">
          <button onClick={() => setOpen((prev) => !prev)} className="menu-btn" aria-label="Toggle menu">
            {open ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="mobile-nav">
          <div className="mobile-nav-links">
            {navLinks.map((item) => (
              <a key={item.id} href={`#${item.id}`} onClick={() => setOpen(false)} className="mobile-link">
                {item.label}
              </a>
            ))}
            <div className="mobile-icons">
              <ThemeToggle theme={theme} onToggle={toggleTheme} />
              <a href="https://github.com/KR15HNARAJ" target="_blank" rel="noreferrer" className="icon-link">
                <FiGithub size={18} />
              </a>
              <a href="https://www.linkedin.com/in/krishnarajpackirisamy" target="_blank" rel="noreferrer" className="icon-link">
                <FiLinkedin size={18} />
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
};

export default Navbar;
