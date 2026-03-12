import { FiBookOpen, FiBriefcase, FiCode, FiTarget } from "react-icons/fi";
import Reveal from "../components/Reveal";
import SectionTitle from "../components/SectionTitle";
import { personalInfo } from "../data/siteData";

const iconMap = {
  FiTarget: FiTarget,
  FiCode: FiCode,
  FiBriefcase: FiBriefcase,
  FiBookOpen: FiBookOpen
};

const AboutSection = () => (
  <section id="about" className="section container">
    <Reveal>
      <SectionTitle
        title="About Me"
        subtitle={personalInfo.role}
      />
    </Reveal>

    <div className="about-layout">
      <Reveal delay={0.08}>
        <div className="about-intro-card panel-card">
          <span className="about-role-badge">{personalInfo.role}</span>
          <p className="about-tagline">{personalInfo.tagline}</p>
          <div className="about-summary">
            {personalInfo.summary.map((text, i) => (
              <p key={i}>{text}</p>
            ))}
          </div>
        </div>
      </Reveal>

      <div className="about-info-grid">
        {personalInfo.highlights.map((item, idx) => {
          const IconComp = iconMap[item.icon];
          return (
            <Reveal key={item.label} delay={0.12 + idx * 0.08}>
              <div className="about-highlight-card panel-card">
                <div className="about-highlight-icon-wrap">
                  {IconComp ? <IconComp size={20} /> : null}
                </div>
                <div className="about-highlight-content">
                  <p className="about-highlight-label">{item.label}</p>
                  <p className="about-highlight-value">{item.value}</p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  </section>
);

export default AboutSection;
