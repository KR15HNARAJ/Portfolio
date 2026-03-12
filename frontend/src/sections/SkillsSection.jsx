import { useEffect, useMemo, useState } from "react";
import {
  BsCodeSlash, BsDiagram3, BsDatabase, BsGear, BsPhone, BsWindowSidebar
} from "react-icons/bs";
import Reveal from "../components/Reveal";
import SectionTitle from "../components/SectionTitle";
import { coreExpertise, defaultSkills } from "../data/siteData";
import { apiRequest } from "../utils/api";

const categoryIcons = {
  BsCodeSlash, BsWindowSidebar, BsDiagram3, BsPhone, BsDatabase, BsGear
};

const groupSkills = (items) =>
  items.reduce((acc, skill) => {
    const category = skill.category || "Other";
    if (!acc[category]) {
      const def = defaultSkills[category] || { icon: "BsGear", color: "#6366f1" };
      acc[category] = { icon: def.icon, color: def.color, items: [] };
    }
    acc[category].items.push({ name: skill.name, level: skill.level || 3 });
    return acc;
  }, {});

const ProficiencyDots = ({ level = 3, max = 4 }) => (
  <span className="proficiency-dots">
    {Array.from({ length: max }, (_, i) => (
      <span key={i} className={`proficiency-dot ${i < level ? "filled" : ""}`} />
    ))}
  </span>
);

const SkillCard = ({ category, catData }) => {
  const items = catData.items || [];
  const color = catData.color || "#6366f1";
  const iconKey = catData.icon || "BsGear";
  const IconComp = categoryIcons[iconKey] || BsGear;

  return (
    <article className="skill-category-card panel-card" style={{ "--cat-color": color }}>
      <div className="skill-category-header">
        <div className="skill-category-icon" style={{ background: `${color}18`, color }}>
          <IconComp size={18} />
        </div>
        <h3 className="card-title">{category}</h3>
      </div>
      <div className="skill-pills-wrap">
        {items.map((item) => (
          <div key={item.name} className="skill-pill">
            <span className="skill-pill-name">{item.name}</span>
            <ProficiencyDots level={item.level} />
          </div>
        ))}
      </div>
    </article>
  );
};

const SkillsSection = () => {
  const [skills, setSkills] = useState(defaultSkills);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const data = await apiRequest("/api/skills");
        if (Array.isArray(data.data) && data.data.length > 0) {
          setSkills(groupSkills(data.data));
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchSkills();
  }, []);

  const skillEntries = useMemo(() => Object.entries(skills), [skills]);

  return (
    <section id="skills" className="section section-alt">
      <div className="container">
        <Reveal>
          <SectionTitle
            title="Skills & Expertise"
            subtitle="Core expertise in Java and Spring Boot, with growing skills in React and Flutter."
          />
        </Reveal>

        <Reveal delay={0.06}>
          <div className="skills-marquee">
            <div className="skills-marquee-track">
              {/* Original set */}
              {skillEntries.map(([category, catData]) => (
                <SkillCard key={category} category={category} catData={catData} />
              ))}
              {/* Duplicate set for seamless loop */}
              {skillEntries.map(([category, catData]) => (
                <SkillCard key={`dup-${category}`} category={category} catData={catData} />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default SkillsSection;
