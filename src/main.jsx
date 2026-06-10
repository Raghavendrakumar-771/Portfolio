import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import profilePhoto from './profile.jpg';
import {
  ArrowUpRight,
  Award,
  BriefcaseBusiness,
  Code2,
  Database,
  GraduationCap,
  Mail,
  Menu,
  Phone,
  Sparkles,
  X
} from 'lucide-react';
import { achievements, education, experience, links, projects, skills, strengths } from './data';
import './styles.css';

const navItems = ['About', 'Experience', 'Projects', 'Skills', 'Contact'];

function useReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll('[data-reveal]');
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    elements.forEach(element => observer.observe(element));
    return () => observer.disconnect();
  }, []);
}

function useSpotlight() {
  useEffect(() => {
    const onMove = event => {
      document.documentElement.style.setProperty('--spot-x', `${event.clientX}px`);
      document.documentElement.style.setProperty('--spot-y', `${event.clientY}px`);
    };

    window.addEventListener('pointermove', onMove);
    return () => window.removeEventListener('pointermove', onMove);
  }, []);
}

function TiltCard({ className = '', children, ...props }) {
  const ref = useRef(null);

  const handlePointerMove = event => {
    const card = ref.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateX = ((y / rect.height) - 0.5) * -9;
    const rotateY = ((x / rect.width) - 0.5) * 9;

    card.style.setProperty('--rx', `${rotateX}deg`);
    card.style.setProperty('--ry', `${rotateY}deg`);
    card.style.setProperty('--mx', `${x}px`);
    card.style.setProperty('--my', `${y}px`);
  };

  const resetTilt = () => {
    const card = ref.current;
    if (!card) return;
    card.style.setProperty('--rx', '0deg');
    card.style.setProperty('--ry', '0deg');
  };

  return (
    <article
      ref={ref}
      className={`tilt-card ${className}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
      {...props}
    >
      {children}
    </article>
  );
}

function Header() {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  return (
    <header className="site-header">
      <a className="brand" href="#top" onClick={closeMenu} aria-label="Go to top">
        <span>RK</span>
      </a>

      <button className="icon-button menu-button" onClick={() => setOpen(!open)} aria-label="Toggle menu">
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      <nav className={open ? 'nav is-open' : 'nav'} aria-label="Primary navigation">
        {navItems.map(item => (
          <a key={item} href={`#${item.toLowerCase()}`} onClick={closeMenu}>
            {item}
          </a>
        ))}
      </nav>
    </header>
  );
}

function Hero() {
  const [photoReady, setPhotoReady] = useState(true);

  return (
    <section id="top" className="hero">
      <div className="hero-copy" data-reveal>
        <span className="eyebrow">
          <Sparkles size={16} />
          CSE Student + MERN Developer
        </span>
        <h1>Parvathareddy Raghavendra Kumar</h1>
        <p>
          Hi, I am Raghavendra, a Computer Science Engineering student focused on machine learning,
          full-stack development, and practical products. I enjoy building real-world projects that
          solve clear problems and show clean engineering.
        </p>

        <div className="hero-actions">
          <a className="primary-button" href="#projects">
            View Projects
            <ArrowUpRight size={18} />
          </a>
          <a className="ghost-button" href={`mailto:${links.email}`}>
            Contact Me
          </a>
        </div>

        <div className="hero-metrics" aria-label="Portfolio highlights">
          <div>
            <strong>9.15</strong>
            <span>CGPA</span>
          </div>
          <div>
            <strong>MERN</strong>
            <span>Stack</span>
          </div>
          <div>
            <strong>AI/NLP</strong>
            <span>Projects</span>
          </div>
        </div>
      </div>

      <div className="hero-panel" data-reveal>
        <div className="portrait-card">
          <div className="portrait-frame">
            {photoReady ? (
              <img src={profilePhoto} alt="Parvathareddy Raghavendra Kumar" onError={() => setPhotoReady(false)} />
            ) : (
              <div className="portrait-fallback">
                <span>RK</span>
                <small>Add public/profile.jpg</small>
              </div>
            )}
          </div>
          <div className="portrait-info">
            <span>Computer Science Engineering</span>
            <h2>Full Stack Developer</h2>
            <p>React, Node.js, Machine Learning, and NLP.</p>
          </div>
          <div className="floating-skill skill-one">React</div>
          <div className="floating-skill skill-two">NLP</div>
          <div className="floating-skill skill-three">MERN</div>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="section about">
      <div className="section-heading" data-reveal>
        <span>About</span>
        <h2>Developer with a strong academic base and product mindset.</h2>
      </div>

      <div className="about-grid">
        <TiltCard className="about-card" data-reveal>
          <h3>Current Focus</h3>
          <p>
            Pursuing B.Tech in Computer Science and Engineering at Koneru Lakshmaiah Education Foundation, with
            practical experience in full-stack web development, machine learning, and conversational AI.
          </p>
        </TiltCard>

        <div className="stats-grid" data-reveal>
          <div>
            <strong>2023-27</strong>
            <span>B.Tech CSE</span>
          </div>
          <div>
            <strong>8 Weeks</strong>
            <span>MERN Internship</span>
          </div>
          <div>
            <strong>3+</strong>
            <span>Major Projects</span>
          </div>
          <div>
            <strong>B2</strong>
            <span>Lingua Skills</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="section">
      <div className="section-heading" data-reveal>
        <span>Experience</span>
        <h2>Hands-on internship experience across the MERN stack.</h2>
      </div>

      <div className="timeline" data-reveal>
        <div className="timeline-line" />
        {experience.map(item => (
          <TiltCard className="timeline-item" key={item.role}>
            <div className="timeline-dot" />
            <div className="timeline-meta">
              <BriefcaseBusiness size={18} />
              <span>{item.company}</span>
            </div>
            <h3>{item.role}</h3>
            <p>{item.summary}</p>
            <ul>
              {item.points.map(point => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </TiltCard>
        ))}
      </div>
    </section>
  );
}

function Projects() {
  const [active, setActive] = useState(0);
  const touchStart = useRef(0);

  const visibleProjects = useMemo(() => {
    return projects.map((project, index) => ({
      ...project,
      offset: (index - active + projects.length) % projects.length
    }));
  }, [active]);

  const goTo = index => setActive((index + projects.length) % projects.length);

  const onTouchStart = event => {
    touchStart.current = event.touches[0].clientX;
  };

  const onTouchEnd = event => {
    const diff = touchStart.current - event.changedTouches[0].clientX;
    if (Math.abs(diff) > 45) {
      goTo(active + (diff > 0 ? 1 : -1));
    }
  };

  return (
    <section id="projects" className="section projects-section">
      <div className="section-heading" data-reveal>
        <span>Projects</span>
        <h2>Selected builds across AI, NLP, and full-stack development.</h2>
      </div>

      <div className="project-stage" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} data-reveal>
        {visibleProjects.map((project, index) => (
          <TiltCard
            className={`project-card ${index === active ? 'is-active' : ''}`}
            key={project.title}
            style={{ '--offset': project.offset }}
          >
            <div className="project-number">0{index + 1}</div>
            <div>
              <span className="project-type">{project.type}</span>
              <h3>{project.title}</h3>
              <p>{project.summary}</p>
            </div>
            <div className="chip-row">
              {project.tags.map(tag => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <a className="project-link" href={project.link} aria-label={`Open ${project.title}`}>
              Project Link
              <ArrowUpRight size={16} />
            </a>
          </TiltCard>
        ))}
      </div>

      <div className="project-controls" aria-label="Project selector">
        {projects.map((project, index) => (
          <button
            key={project.title}
            className={index === active ? 'is-active' : ''}
            onClick={() => goTo(index)}
            aria-label={`Show ${project.title}`}
          />
        ))}
      </div>
    </section>
  );
}

function Skills() {
  const skillIcons = {
    Programming: <Code2 size={18} />,
    Development: <Code2 size={18} />,
    Databases: <Database size={18} />,
    'CS Subjects': <GraduationCap size={18} />,
    'Machine Learning': <Sparkles size={18} />
  };

  return (
    <section id="skills" className="section skills-section">
      <div className="section-heading" data-reveal>
        <span>Skills</span>
        <h2>A practical toolkit for full-stack and AI-focused applications.</h2>
      </div>

      <div className="skills-grid">
        {skills.map(group => (
          <TiltCard className="skill-card" key={group.name} data-reveal>
            <div className="skill-title">
              {skillIcons[group.name]}
              <h3>{group.name}</h3>
            </div>
            <div className="chip-row">
              {group.items.map(item => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </TiltCard>
        ))}
      </div>
    </section>
  );
}

function EducationAchievements() {
  return (
    <section className="section split-section">
      <div data-reveal>
        <div className="section-heading compact">
          <span>Education</span>
          <h2>Academic journey.</h2>
        </div>
        <div className="stack-list">
          {education.map(item => (
            <TiltCard className="list-card" key={item.school}>
              <GraduationCap size={19} />
              <div>
                <h3>{item.school}</h3>
                <p>{item.detail}</p>
                <span>{item.period}</span>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>

      <div data-reveal>
        <div className="section-heading compact">
          <span>Achievements</span>
          <h2>Certifications and strengths.</h2>
        </div>
        <div className="stack-list">
          {achievements.map(item => (
            <TiltCard className="list-card" key={item}>
              <Award size={19} />
              <div>
                <h3>{item}</h3>
                <p>Verified achievement from resume.</p>
              </div>
            </TiltCard>
          ))}
        </div>
        <div className="strengths">
          {strengths.map(strength => (
            <span key={strength}>{strength}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="contact-section">
      <div className="contact-content" data-reveal>
        <span className="eyebrow">Available for internships and projects</span>
        <h2>Let's build something useful, fast, and clean.</h2>
        <div className="contact-actions">
          <a href={`mailto:${links.email}`} className="primary-button">
            <Mail size={18} />
            Email
          </a>
          <a href={`tel:${links.phone}`} className="ghost-button">
            <Phone size={18} />
            Call
          </a>
          <a href={links.linkedin} className="icon-link" target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <BriefcaseBusiness size={20} />
          </a>
          <a href={links.github} className="icon-link" target="_blank" rel="noreferrer" aria-label="GitHub">
            <Code2 size={20} />
          </a>
        </div>
      </div>
    </section>
  );
}

function App() {
  useReveal();
  useSpotlight();

  return (
    <>
      <div className="spotlight" aria-hidden="true" />
      <Header />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <EducationAchievements />
        <Contact />
      </main>
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
