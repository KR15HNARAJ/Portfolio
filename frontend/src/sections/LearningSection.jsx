import { useState, useRef, useEffect } from "react";
import { BsSignTurnRightFill } from "react-icons/bs";
import { useInView } from "framer-motion";
import Reveal from "../components/Reveal";
import SectionTitle from "../components/SectionTitle";
import KrishnaPhoto from "../assets/KrishnaPhoto.jpg";

const roadmapSteps = [
  { title: "Java & Algorithms", desc: "Core Logic & Syntax Start", x: 15, y: 75, align: "top" },
  { title: "Spring Boot", desc: "Backend Enterprise Concepts", x: 38, y: 25, align: "bottom" },
  { title: "System Design", desc: "Scalability & Architecture", x: 62, y: 75, align: "top" },
  { title: "Flutter & Dart", desc: "Cross-Platform Mobile Peak", x: 85, y: 25, align: "bottom" },
];

const LearningSection = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "0px", amount: 0.3 });
  const [showAvatar, setShowAvatar] = useState(false);
  const pathRef = useRef(null);
  const avatarRef = useRef(null);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setShowAvatar(true);
        if (pathRef.current && avatarRef.current) {
          const path = pathRef.current;
          const avatar = avatarRef.current;
          const length = path.getTotalLength();
          const duration = 5500;
          let startTime = null;

          const easeInOutCubic = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

          const animate = (time) => {
            if (!startTime) startTime = time;
            const elapsed = time - startTime;
            let progress = Math.min(elapsed / duration, 1);

            progress = Math.max(0, Math.min(1, easeInOutCubic(progress)));
            const pt = path.getPointAtLength(progress * length);

            if (avatar) {
              avatar.style.left = `${pt.x}%`;
              avatar.style.top = `${pt.y}%`;
            }

            if (elapsed < duration) {
              requestAnimationFrame(animate);
            }
          };
          requestAnimationFrame(animate);
        }
      }, 1500); // Wait 1.5 seconds after it's in view
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  return (
    <section id="learning" className="section section-alt">
      <div className="container" ref={containerRef}>
        <Reveal>
          <SectionTitle
            title="Learning Journey"
            subtitle="Continuously growing as a developer — an evolving roadmap from backend fundamentals to mobile mastery."
          />
        </Reveal>

        <div className="learning-desktop-view">
          <div className="roadmap-container">
            <svg className="roadmap-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
              {/* Road Outer Border */}
              <path
                className="road-border"
                d="M -10,50 C 0,50 5,75 15,75 C 26.5,75 26.5,25 38,25 C 50,25 50,75 62,75 C 73.5,75 73.5,25 85,25 C 97.5,25 100,50 110,50"
                fill="none"
                vectorEffect="non-scaling-stroke"
              />
              {/* Road Surface */}
              <path
                className="road-surface"
                d="M -10,50 C 0,50 5,75 15,75 C 26.5,75 26.5,25 38,25 C 50,25 50,75 62,75 C 73.5,75 73.5,25 85,25 C 97.5,25 100,50 110,50"
                fill="none"
                vectorEffect="non-scaling-stroke"
              />
              {/* Road Centerline */}
              <path
                className="road-centerline"
                d="M -10,50 C 0,50 5,75 15,75 C 26.5,75 26.5,25 38,25 C 50,25 50,75 62,75 C 73.5,75 73.5,25 85,25 C 97.5,25 100,50 110,50"
                fill="none"
                vectorEffect="non-scaling-stroke"
              />
              {/* Invisible exact route for the car */}
              <path
                id="car-route"
                ref={pathRef}
                d="M -20,50 C 0,50 5,75 15,75 C 26.5,75 26.5,25 38,25 C 50,25 50,75 62,75 C 73.5,75 73.5,25 85,25"
                fill="none"
                stroke="none"
              />
            </svg>

            {/* Traveling Avatar HTML Element overlaid on top */}
            <div
              ref={avatarRef}
              style={{
                position: "absolute",
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                border: "3px solid var(--brand)",
                backgroundColor: "var(--card)",
                boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
                left: "-20%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 1000,
                opacity: showAvatar ? 1 : 0,
                transition: "opacity 0.5s ease",
                pointerEvents: "none"
              }}
            >
              <img
                src={KrishnaPhoto}
                alt="Me"
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  objectFit: "cover",
                  display: "block"
                }}
              />
            </div>

            <div className="roadmap-nodes">
              {roadmapSteps.map((step, i) => (
                <Reveal key={i} delay={i * 0.15}>
                  <div className="roadmap-node" style={{ left: `${step.x}%`, top: `${step.y}%` }}>
                    <div className="roadmap-pin">
                      <BsSignTurnRightFill size={18} />
                    </div>
                    <div className={`roadmap-label label-${step.align}`}>
                      <h4 className="roadmap-title">{step.title}</h4>
                      <p className="roadmap-desc">{step.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        <div className="learning-mobile-view">
          <div className="timeline-container">
            {roadmapSteps.map((step, idx) => (
              <Reveal key={idx} delay={idx * 0.1}>
                <div className="timeline-item">
                  <div className="timeline-marker" />
                  <div className="timeline-content panel-card">
                    <h3 className="timeline-title">{step.title}</h3>
                    <p className="timeline-desc">{step.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

      </div>
    </section >
  );
};

export default LearningSection;
