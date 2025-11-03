import React, { useState, useEffect } from 'react';
import './portfolio.css';

const Portfolio: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const typingTexts = [
    'Software Developer',
    'Cybersecurity Enthusiast',
    'Fullstack Developer',
    'Problem Solver'
  ];

  useEffect(() => {
    const typeSpeed = 100;
    const deleteSpeed = 50;
    const pauseDuration = 2000;

    const type = () => {
      const currentText = typingTexts[currentTextIndex];
      
      if (!isDeleting) {
        if (typedText.length < currentText.length) {
          setTypedText(currentText.slice(0, typedText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), pauseDuration);
          return;
        }
      } else {
        if (typedText.length > 0) {
          setTypedText(currentText.slice(0, typedText.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentTextIndex((prev) => (prev + 1) % typingTexts.length);
          return;
        }
      }
    };

    const timer = setTimeout(type, isDeleting ? deleteSpeed : typeSpeed);
    return () => clearTimeout(timer);
  }, [typedText, currentTextIndex, isDeleting, typingTexts]);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  // initialize theme from localStorage or system preference
  useEffect(() => {
    try {
      const stored = localStorage.getItem('theme');
      if (stored === 'dark') {
        document.documentElement.classList.add('dark');
        return;
      }
    } catch (e) {}

    // fallback to system preference
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) document.documentElement.classList.add('dark');
  }, []);

  const projects = [
    {
      title: "Ride sharing Platform",
      description: "A full-stack ride sharing solution with modern UI/UX, payment integration, and admin dashboard.",
      technologies: ["React", "Node.js", "NestJs", "Typescript"],
      image: "/rideeasy.jpeg",
      link: "https://github.com/Colkimi/Ride-share"
    },
    {
      title: "System penetration tool",
      description: "A collaborative pentesting tool that does Encryption & Decryption, hash cracking and network scanning.",
      technologies: ["Python", "Bash", "Shell Script"],
      image: "/defendx.jpeg",
      link: "https://github.com/Colkimi/Defend_X"
    },
    {
      title: "CTFORGE",
      description: "A powerful command-line tool for generating Capture The Flag (CTF) challenges across multiple categories.",
      technologies: ["Python", "Bash", "Shell"],
      image: "/ctforge.jpeg",
      link: "https://github.com/Colkimi/CTFORGE"
    }
  ];

  const skills = [
    { name: "React", level: 90 },
    { name: "TypeScript", level: 85 },
    { name: "Node.js", level: 80 },
    { name: "Python", level: 95 },
    { name: "CSS/SCSS", level: 90 },
    { name: "Git", level: 85 },
    { name: "Bash", level: 95 },
    {name: "nestJs", level: 80},
    {name: "Tanstack", level: 75}
  ];

  return (
    <div className="portfolio">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <h2>Colkimi</h2>
          </div>
          <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            {['home', 'about', 'skills', 'projects', 'contact'].map((item) => (
              <button
                key={item}
                className={`nav-link ${activeSection === item ? 'active' : ''}`}
                onClick={() => scrollToSection(item)}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </button>
            ))}
          </div>
          {/* Theme toggle + mobile menu toggle */}
          <div className="nav-actions">
            <button
              className="theme-toggle"
              aria-label="Toggle theme"
              onClick={() => {
                // toggle theme and persist
                const current = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
                const next = current === 'dark' ? 'light' : 'dark';
                if (next === 'dark') document.documentElement.classList.add('dark');
                else document.documentElement.classList.remove('dark');
                try { localStorage.setItem('theme', next); } catch (e) {}
              }}
            >
              <span className="theme-icon">🌓</span>
            </button>

            <div className="nav-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                Hello, I'm <span className="highlight">Collins Mibey</span>
              </h1>
              <h2 className="hero-subtitle typing-container">
                <span className="typing-text">{typedText}</span>
                <span className="cursor">|</span>
              </h2>
              <p className="hero-description">
                Passionate about creating beautiful, functional, and user-centered digital experiences.
                Specialized in modern web technologies and always eager to learn new skills.
              </p>
              <div className="hero-buttons">
                <button className="btn-primary" onClick={() => scrollToSection('projects')}>
                  View My Work
                </button>
                <button className="btn-secondary" onClick={() => scrollToSection('contact')}>
                  Get In Touch
                </button>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-resume"
                  aria-label="Open resume in a new tab"
                >
                  View Resume
                </a>
              </div>
            </div>
            <div className="hero-image">
              <div className="image-container">
                <img 
                  src="/colkimi.jpeg" 
                  alt="Profile" 
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="container">
          <h2 className="section-title animate-on-scroll">About Me</h2>
          <div className="about-content animate-on-scroll">
            <div className="about-text">
              <p>
                I'm a passionate full-stack developer with over 3 years of experience in creating 
                digital solutions that make a difference. My journey in web development started with 
                a curiosity about how things work on the internet, and it has evolved into a career 
                focused on crafting exceptional user experiences.
              </p>
              <p>
                I specialize in React, Node.js, and modern web technologies. When I'm not coding, 
                you can find me exploring new technologies, contributing to open-source projects, 
                or sharing knowledge with the developer community.
              </p>
              <div className="about-stats">
                <div className="stat">
                  <h3>50+</h3>
                  <p>Projects Completed</p>
                </div>
                <div className="stat">
                  <h3>3+</h3>
                  <p>Years Experience</p>
                </div>
                <div className="stat">
                  <h3>20+</h3>
                  <p>Happy Clients</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="skills">
        <div className="container">
          <h2 className="section-title animate-on-scroll">Skills & Technologies</h2>
          <div className="skills-grid">
            {skills.map((skill, index) => (
              <div key={index} className="skill-item animate-on-scroll" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="skill-info">
                  <span className="skill-name">{skill.name}</span>
                  <span className="skill-percentage">{skill.level}%</span>
                </div>
                <div className="skill-bar">
                  <div 
                    className="skill-progress"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects">
        <div className="container">
          <h2 className="section-title animate-on-scroll">Featured Projects</h2>
          <div className="projects-grid">
            {projects.map((project, index) => (
              <div key={index} className="project-card animate-on-scroll" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="project-image">
                  <img src={project.image} alt={project.title} />
                  <div className="project-overlay">
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn-primary"
                    >
                      View Project
                    </a>
                  </div>
                </div>
                <div className="project-content">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-technologies">
                    {project.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <h2 className="section-title animate-on-scroll">Get In Touch</h2>
          <div className="contact-content">
            <div className="contact-info animate-on-scroll">
              <h3>Let's work together</h3>
              <p>
                I'm always interested in hearing about new opportunities and projects. 
                Whether you have a question or just want to say hi, feel free to reach out!
              </p>
              <div className="contact-details">
                <div className="contact-item">
                  <strong>Email:</strong> colkimib@gmail.com
                </div>
                <div className="contact-item">
                  <strong>Phone:</strong> +254 (7) 89 471 918
                </div>
                <div className="contact-item">
                  <strong>Location:</strong> Kutus, Kirinyaga
                </div>
              </div>
              <div className="social-links">
                <a href="https://github.com/Colkimi" className="social-link">GitHub</a>
                <a href="https://linkedin.com/in/colkimi" className="social-link">LinkedIn</a>
              </div>
            </div>
            <div className="contact-form animate-on-scroll">
              <form>
                <div className="form-group">
                  <input type="text" placeholder="Your Name" required />
                </div>
                <div className="form-group">
                  <input type="email" placeholder="Your Email" required />
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Subject" required />
                </div>
                <div className="form-group">
                  <textarea placeholder="Your Message" rows={5} required></textarea>
                </div>
                <button type="submit" className="btn-primary">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2025 Collins Mibey. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;
