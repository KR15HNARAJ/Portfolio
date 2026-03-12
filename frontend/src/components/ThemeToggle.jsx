import { FiMoon, FiSun } from "react-icons/fi";

const ThemeToggle = ({ theme, onToggle }) => (
  <button onClick={onToggle} className="theme-toggle" aria-label="Toggle theme">
    {theme === "dark" ? <FiSun size={18} /> : <FiMoon size={18} />}
  </button>
);

export default ThemeToggle;
