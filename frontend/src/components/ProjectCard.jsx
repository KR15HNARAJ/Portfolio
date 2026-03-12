import { useState } from "react";
import { FiChevronLeft, FiChevronRight, FiExternalLink, FiGithub } from "react-icons/fi";
import Reveal from "./Reveal";

const ProjectCard = ({ project, delay = 0, index = 0 }) => {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  const images = project.images && project.images.length > 0
    ? project.images
    : (project.image ? [project.image] : []);

  const hasMultiple = images.length > 1;

  const nextImg = (e) => {
    e.preventDefault();
    setCurrentImgIndex((prev) => (prev + 1) % images.length);
  };

  const prevImg = (e) => {
    e.preventDefault();
    setCurrentImgIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <Reveal delay={delay}>
      <article className="project-card project-card-row">
        <div className="project-image-wrap">
          <div className="project-carousel-container">
            {images.map((imgUrl, i) => (
              <img
                key={i}
                src={imgUrl}
                alt={`${project.title} - view ${i + 1}`}
                className={`project-image ${i === currentImgIndex ? "active" : ""}`}
                style={{ opacity: i === currentImgIndex ? 1 : 0, position: i === 0 ? "relative" : "absolute", top: 0, left: 0 }}
              />
            ))}
          </div>

          <div className="project-image-overlay" />

          <span className="project-number">
            {String(index + 1).padStart(2, "0")}
          </span>
          {project.type ? (
            <span className="project-type-badge">{project.type}</span>
          ) : null}

          {hasMultiple && (
            <>
              <button className="carousel-nav-btn prev" onClick={prevImg} aria-label="Previous image">
                <FiChevronLeft size={18} />
              </button>
              <button className="carousel-nav-btn next" onClick={nextImg} aria-label="Next image">
                <FiChevronRight size={18} />
              </button>
              <div className="carousel-dots">
                {images.map((_, i) => (
                  <span
                    key={i}
                    className={`carousel-dot ${i === currentImgIndex ? "active" : ""}`}
                    onClick={(e) => { e.preventDefault(); setCurrentImgIndex(i); }}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        <div className="project-body">
          <div>
            <h3 className="project-title">{project.title}</h3>
            <div className="badge-list">
              {project.techStack.map((tech) => (
                <span key={tech} className="tech-badge">
                  {tech}
                </span>
              ))}
            </div>
            <p className="project-description">{project.description}</p>
          </div>

          {project.features && project.features.length > 0 ? (
            <ul className="project-feature-list">
              {project.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          ) : null}

          <div className="project-actions">
            {project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline"
              >
                <FiGithub size={15} /> GitHub
              </a>
            ) : null}
            {project.liveUrl ? (
              <a href={project.liveUrl} target="_blank" rel="noreferrer" className="btn btn-primary">
                <FiExternalLink size={15} /> Live Demo
              </a>
            ) : null}
          </div>
        </div>
      </article>
    </Reveal>
  );
};

export default ProjectCard;
