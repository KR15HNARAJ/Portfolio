import { useEffect, useState } from "react";
import ProjectCard from "../components/ProjectCard";
import Reveal from "../components/Reveal";
import SectionTitle from "../components/SectionTitle";
import { apiRequest } from "../utils/api";

const ProjectsSection = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await apiRequest("/api/projects");
        setProjects(Array.isArray(data.data) ? data.data : []);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section id="projects" className="section container">
      <Reveal>
        <SectionTitle
          title="Projects"
          subtitle="Hands-on projects that reflect my progress in full stack development and practical UI/UX execution."
        />
      </Reveal>

      {loading ? (
        <div className="projects-list">
          <div className="skeleton skeleton-card skeleton-row" />
          <div className="skeleton skeleton-card skeleton-row" />
        </div>
      ) : null}

      {!loading && projects.length === 0 ? (
        <div className="empty-state-card panel-card">
          <p className="empty-state">No projects yet. Add projects from the admin panel.</p>
        </div>
      ) : null}

      {!loading && projects.length > 0 ? (
        <div className="projects-list">
          {projects.map((project, index) => (
            <ProjectCard
              key={project._id || project.id}
              project={project}
              index={index}
              delay={index * 0.08}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
};

export default ProjectsSection;
