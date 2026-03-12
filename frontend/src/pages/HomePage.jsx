import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import LoadingScreen from "../components/LoadingScreen";
import Navbar from "../components/Navbar";
import AboutSection from "../sections/AboutSection";
import ContactSection from "../sections/ContactSection";
import HeroSection from "../sections/HeroSection";
import LearningSection from "../sections/LearningSection";
import ProjectsSection from "../sections/ProjectsSection";
import SkillsSection from "../sections/SkillsSection";

const HomePage = ({ theme, toggleTheme }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="app-shell">
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <LearningSection />
          <ContactSection />
        </>
      )}
      <Footer />
    </div>
  );
};

export default HomePage;
