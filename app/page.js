import Image from "next/image";
import ThemeToggle from "@/components/theme-toggle";
import { sortExperiences, summarize } from "@/lib/portfolio.mjs";
import { getPortfolioData, splitTags } from "@/lib/strapi";

export const dynamic = "force-dynamic";

const FEATURED_PROJECTS = [
  "Linker URL Shortener | Full DevOps Pipeline",
  "School Management System (Starkidy LMS)",
  "SolarIntelligence || Dicoding Capstone"
];

function ProjectLinks({ repoUrl, liveUrl }) {
  if (!repoUrl && !liveUrl) {
    return null;
  }

  return (
    <div className="project-links">
      {liveUrl ? (
        <a href={liveUrl} target="_blank" rel="noreferrer">
          View live project <span aria-hidden="true">↗</span>
        </a>
      ) : null}
      {repoUrl ? (
        <a href={repoUrl} target="_blank" rel="noreferrer">
          View source <span aria-hidden="true">↗</span>
        </a>
      ) : null}
    </div>
  );
}

function ProjectPreview({ project }) {
  const tags = splitTags(project.tags).slice(0, 4);

  return (
    <div className="project-preview" role="img" aria-label={`System view for ${project.title}`}>
      <div className="preview-toolbar" aria-hidden="true">
        <span />
        <span />
        <span />
        <p>System view</p>
      </div>
      <div className="preview-flow">
        {tags.map((tag, index) => (
          <div className="flow-step" key={tag}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{tag}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}

function FeaturedProject({ project, index }) {
  const tags = splitTags(project.tags).slice(0, 6);

  return (
    <article className={`featured-project ${index === 0 ? "featured-project-primary" : ""}`}>
      <ProjectPreview project={project} />
      <div className="project-copy">
        <div className="project-index">Selected work / {String(index + 1).padStart(2, "0")}</div>
        <h3>{project.title}</h3>
        <p>{summarize(project.description)}</p>
        <div className="tag-row" aria-label="Technologies used">
          {tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <ProjectLinks repoUrl={project.repo_url} liveUrl={project.live_url} />
      </div>
    </article>
  );
}

function ExperienceEntry({ experience }) {
  return (
    <article className="experience-entry">
      <div className="experience-period">
        <span>{experience.period}</span>
        <span>{experience.location}</span>
      </div>
      <div className="experience-copy">
        <h3>{experience.role}</h3>
        <p className="experience-company">{experience.company}</p>
        <p>{summarize(experience.summary, 420)}</p>
      </div>
    </article>
  );
}

export default async function HomePage() {
  const { experiences, projects, sourceState } = await getPortfolioData();
  const publicProjects = projects.filter(
    (project) => String(project.Statuss || "").toLowerCase() === "public"
  );
  const privateProjects = projects.filter(
    (project) => String(project.Statuss || "").toLowerCase() !== "public"
  );
  const featuredProjects = FEATURED_PROJECTS.map((title) =>
    publicProjects.find((project) => project.title === title)
  ).filter(Boolean);
  const remainingProjects = publicProjects.filter(
    (project) => !featuredProjects.some((featured) => featured.id === project.id)
  );
  const orderedPublicProjects = [...featuredProjects, ...remainingProjects];
  const orderedExperiences = sortExperiences(experiences);

  return (
    <>
      <div className="ambient-background" aria-hidden="true" />
      <header className="site-header" id="top">
        <div className="header-inner">
          <a className="brand-mark" href="#top" aria-label="Dawwi, back to top">
            Dawwi<span>.</span>
          </a>
          <nav className="site-nav" aria-label="Primary navigation">
            <a href="#work">Work</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </nav>
          <ThemeToggle />
        </div>
      </header>

      <main>
        <section className="hero section-shell" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">Dawwi R.D.M. · DevOps &amp; Cloud Engineer</p>
            <h1 id="hero-title">I build reliable cloud systems and practical software.</h1>
            <p className="hero-intro">
              I work across cloud infrastructure, automation, and application delivery to turn
              complex systems into dependable tools people can use.
            </p>
            <div className="cta-row">
              <a className="button button-primary" href="#work">
                View my work
              </a>
              <a className="button button-secondary" href="mailto:dawwi.rdm@gmail.com">
                Contact me
              </a>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-portrait">
              <Image
                src="/DSC09803.jpg"
                alt="Dawwi smiling in a black suit"
                fill
                className="hero-portrait-image"
                sizes="(max-width: 900px) 360px, 34vw"
                priority
              />
            </div>
            <div className="hero-aside" aria-label="Professional focus">
              <span>Based in Bandung, Indonesia</span>
              <p>Infrastructure · DevOps · Intelligent systems</p>
            </div>
          </div>
        </section>

        <section className="about-band section-block" id="about" aria-labelledby="about-title">
          <div className="section-shell about-section">
            <div className="about-collage" aria-label="Portraits of Dawwi">
              <div className="collage-photo collage-photo-main">
                <Image
                  src="/DSC09788.jpg"
                  alt="Dawwi smiling in a black suit"
                  fill
                  className="collage-image"
                  sizes="(max-width: 760px) 68vw, 330px"
                />
              </div>
              <div className="collage-photo collage-photo-scenic">
                <Image
                  src="/DSC03688_1_1.JPG"
                  alt="Dawwi standing in front of a mountain landscape"
                  fill
                  className="collage-image"
                  sizes="(max-width: 760px) 34vw, 180px"
                />
              </div>
              <div className="collage-photo collage-photo-casual">
                <Image
                  src="/DSC02120.jpg"
                  alt="Dawwi in casual clothing"
                  fill
                  className="collage-image"
                  sizes="(max-width: 760px) 30vw, 150px"
                />
              </div>
            </div>
            <div className="about-copy">
              <p className="eyebrow">About</p>
              <h2 id="about-title">Engineering with the whole system in mind.</h2>
              <p>
                I am a Computer Science graduate and technology professional with hands-on
                experience in Linux infrastructure, cloud platforms, automation, software delivery,
                and AI/ML projects. I enjoy connecting these disciplines to build systems that are
                maintainable, observable, and useful.
              </p>
              <div className="capabilities" aria-label="Core capabilities">
                <div>
                  <span>01</span>
                  <strong>Cloud infrastructure</strong>
                  <p>AWS, Linux, networking, storage, and self-hosted environments.</p>
                </div>
                <div>
                  <span>02</span>
                  <strong>DevOps &amp; delivery</strong>
                  <p>Docker, Kubernetes, Terraform, CI/CD, and observability.</p>
                </div>
                <div>
                  <span>03</span>
                  <strong>Software &amp; AI</strong>
                  <p>Full-stack applications, APIs, machine learning, and data workflows.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="work-section section-block" id="work" aria-labelledby="work-title">
          <div className="section-shell work-layout">
            <div className="work-intro">
              <div className="section-heading">
                <p className="eyebrow">Selected work</p>
                <h2 id="work-title">Systems built for real use.</h2>
                <p>
                  Infrastructure, software, and machine-learning projects spanning implementation,
                  delivery, and ongoing operation.
                </p>
              </div>
              <span className="work-count">
                {publicProjects.length} public · {privateProjects.length} private
              </span>
            </div>

            <div className="work-feed">
              {sourceState.projects.status === "rejected" ? (
                <div className="notice" role="status">
                  Project data is temporarily unavailable. Please use the GitHub link below to view
                  current work.
                </div>
              ) : orderedPublicProjects.length > 0 ? (
                <div className="featured-list">
                  {orderedPublicProjects.map((project, index) => (
                    <FeaturedProject
                      key={project.documentId || project.id}
                      project={project}
                      index={index}
                    />
                  ))}
                </div>
              ) : (
                <div className="notice">No public projects are available yet.</div>
              )}

              {privateProjects.length > 0 ? (
                <div className="private-work">
                  <div className="private-work-heading">
                    <div>
                      <span>Private work</span>
                      <h3>Internal systems and experiments.</h3>
                    </div>
                    <p>These projects are not publicly accessible, but remain part of my practical work.</p>
                  </div>
                  <div className="private-work-list">
                    {privateProjects.map((project) => {
                      const tags = splitTags(project.tags).slice(0, 3);

                      return (
                        <article key={project.documentId || project.id}>
                          <span className="private-index">Private</span>
                          <div>
                            <h4>{project.title}</h4>
                            <p>{summarize(project.description, 220)}</p>
                            {tags.length > 0 ? (
                              <div className="private-tags" aria-label="Technologies used">
                                {tags.map((tag) => (
                                  <span key={tag}>{tag}</span>
                                ))}
                              </div>
                            ) : null}
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </section>

        <section className="section-shell section-block" id="experience" aria-labelledby="experience-title">
          <div className="section-heading section-heading-row">
            <div>
              <p className="eyebrow">Experience</p>
              <h2 id="experience-title">Where I have contributed.</h2>
            </div>
            <p>Roles spanning infrastructure operations, software engineering, and technical leadership.</p>
          </div>

          {sourceState.experiences.status === "rejected" ? (
            <div className="notice" role="status">Experience data is temporarily unavailable.</div>
          ) : orderedExperiences.length > 0 ? (
            <div className="experience-list">
              {orderedExperiences.map((experience) => (
                <ExperienceEntry
                  key={experience.documentId || experience.id}
                  experience={experience}
                />
              ))}
            </div>
          ) : (
            <div className="notice">No experience entries are available yet.</div>
          )}
        </section>
      </main>

      <footer className="site-footer" id="contact">
        <div className="section-shell footer-inner">
          <div>
            <p className="eyebrow">Contact</p>
            <h2>Let’s build something dependable.</h2>
            <p>For opportunities, collaborations, or a conversation about infrastructure and software.</p>
          </div>
          <div className="contact-links">
            <a href="mailto:dawwi.rdm@gmail.com">Email <span>dawwi.rdm@gmail.com</span></a>
            <a href="https://www.linkedin.com/in/dawwi-rdm/" target="_blank" rel="noreferrer">
              LinkedIn <span aria-hidden="true">↗</span>
            </a>
            <a href="https://github.com/DrdmRandom" target="_blank" rel="noreferrer">
              GitHub <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
        <div className="section-shell footer-bottom">
          <span>© {new Date().getFullYear()} Dawwi R.D.M.</span>
          <a href="#top">Back to top ↑</a>
        </div>
      </footer>
    </>
  );
}
