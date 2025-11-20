<template>
  <section id="projects" class="projects">
    <div class="container">
      <div class="section-header">
        <span class="section-number">02</span>
        <h2 class="section-title">Projets</h2>
      </div>

      <div class="projects-grid">
        <div
          v-for="project in projects"
          :key="project.id"
          class="project-card"
          @mouseenter="hoveredProject = project.id"
          @mouseleave="hoveredProject = null"
        >
          <div class="project-image">
            <div class="project-emoji">{{ project.image }}</div>
            <div :class="['project-overlay', { active: hoveredProject === project.id }]">
              <div class="project-links">
                <a :href="project.link" class="project-link" target="_blank" rel="noopener noreferrer">
                  <span>Voir</span>
                </a>
                <a :href="project.github" class="project-link" target="_blank" rel="noopener noreferrer">
                  <span>Code</span>
                </a>
              </div>
            </div>
          </div>
          
          <div class="project-content">
            <h3 class="project-title">{{ project.title }}</h3>
            <p class="project-description">{{ project.description }}</p>
            <div class="project-tech">
              <span v-for="(tech, index) in project.tech" :key="index" class="tech-tag">{{ tech }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="projects-footer">
        <a 
          :href="portfolioData.contact.socialLinks.find(s => s.name === 'GitHub')?.url || 'https://github.com/iamrachking/'" 
          class="btn-more-projects"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>Voir plus de projets</span>
          <span class="arrow">→</span>
        </a>
      </div>
    </div>
  </section>
</template>

<script>
import { ref } from 'vue'
import portfolioData from '../data/portfolio.json'

export default {
  name: 'Projects',
  setup() {
    const hoveredProject = ref(null)

    return {
      projects: portfolioData.projects,
      hoveredProject,
      portfolioData
    }
  }
}
</script>

<style scoped>
.projects {
  padding: 8rem 2rem;
  background: var(--bg-secondary);
  position: relative;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 4rem;
}

.section-number {
  font-size: 1rem;
  font-weight: 600;
  color: var(--accent);
  opacity: 0.5;
}

.section-title {
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 700;
  letter-spacing: -1px;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
}

@media (max-width: 1200px) {
  .projects-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 900px) {
  .projects-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
}

.project-card {
  background: var(--bg-primary);
  border: 1px solid var(--border);
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
}

.project-card:hover {
  transform: translateY(-8px);
  border-color: var(--accent);
  box-shadow: 0 20px 40px rgba(0, 255, 136, 0.1);
}

.project-image {
  position: relative;
  width: 100%;
  height: 200px;
  background: linear-gradient(135deg, var(--bg-secondary), var(--bg-primary));
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.project-emoji {
  font-size: 4rem;
  transition: transform 0.3s ease;
}

.project-card:hover .project-emoji {
  transform: scale(1.2) rotate(5deg);
}

.project-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.project-overlay.active {
  opacity: 1;
}

.project-links {
  display: flex;
  gap: 1rem;
}

.project-link {
  padding: 0.75rem 1.5rem;
  background: var(--accent);
  color: var(--bg-primary);
  text-decoration: none;
  border-radius: 6px;
  font-weight: 600;
  transition: all 0.3s ease;
  display: inline-block;
}

.project-link:hover {
  background: var(--accent-hover);
  transform: scale(1.05);
}

.project-content {
  padding: 2rem;
}

.project-title {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: var(--text-primary);
}

.project-description {
  font-size: 0.95rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 1rem;
}

.project-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tech-tag {
  padding: 0.4rem 0.8rem;
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: 4px;
  font-size: 0.85rem;
  color: var(--text-secondary);
  transition: all 0.3s ease;
}

.project-card:hover .tech-tag {
  border-color: var(--accent);
  color: var(--accent);
}

.projects-footer {
  margin-top: 4rem;
  text-align: center;
}

.btn-more-projects {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2.5rem;
  background: transparent;
  border: 2px solid var(--accent);
  border-radius: 8px;
  color: var(--accent);
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.btn-more-projects:hover {
  background: var(--accent);
  color: var(--bg-primary);
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(0, 255, 136, 0.3);
}

.btn-more-projects .arrow {
  font-size: 1.2rem;
  transition: transform 0.3s ease;
}

.btn-more-projects:hover .arrow {
  transform: translateX(5px);
}

@media (max-width: 1200px) {
  .projects-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 900px) {
  .projects-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
}

@media (max-width: 600px) {
  .projects-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .projects-footer {
    margin-top: 3rem;
  }

  .btn-more-projects {
    padding: 0.875rem 2rem;
    font-size: 0.95rem;
  }
}
</style>

