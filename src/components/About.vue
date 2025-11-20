<template>
  <section id="about" class="about">
    <div class="container">
      <div class="section-header">
        <span class="section-number">01</span>
        <h2 class="section-title">À propos</h2>
      </div>

      <div class="about-content">
        <div class="about-text">
          <p class="about-intro">
            {{ portfolioData.about.intro }}
          </p>
          <p 
            v-for="(desc, index) in portfolioData.about.description" 
            :key="index" 
            class="about-description"
          >
            {{ desc }}
          </p>
        </div>

        <div class="about-skills">
          <h3 class="skills-title">Compétences</h3>
          <div class="skills-list">
            <span 
              v-for="(skill, index) in portfolioData.about.skills" 
              :key="index" 
              class="skill-tag"
            >
              {{ skill }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import portfolioData from '../data/portfolio.json'

export default {
  name: 'About',
  setup() {
    return {
      portfolioData
    }
  }
}
</script>

<style scoped>
.about {
  padding: 8rem 2rem;
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

.about-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;
}

.about-text {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.about-intro {
  font-size: 1.3rem;
  color: var(--text-primary);
  font-weight: 500;
  line-height: 1.6;
}

.about-description {
  font-size: 1rem;
  color: var(--text-secondary);
  line-height: 1.8;
}

.about-skills {
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 2.5rem;
}

.skills-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 2rem;
  color: var(--text-primary);
}

.skills-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.skill-tag {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: var(--bg-primary);
  border: 1px solid var(--border);
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--text-primary);
  transition: all 0.3s ease;
}

.skill-tag:hover {
  border-color: var(--accent);
  color: var(--accent);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 255, 136, 0.15);
}

@media (max-width: 968px) {
  .about-content {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
}
</style>

