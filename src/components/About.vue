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
              <img 
                :src="getSkillIcon(skill)" 
                :alt="skill"
                class="skill-icon"
                @error="handleImageError"
              />
              <span class="skill-name">{{ skill }}</span>
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
    const getSkillIcon = (skill) => {
      // Utilisation d'Iconify pour des icônes colorées
      const iconifyIcons = {
        'Laravel': 'https://api.iconify.design/logos/laravel.svg?color=%23FF2D20',
        'NodeJS': 'https://api.iconify.design/logos/nodejs.svg?color=%23E0234E',
        'Tailwind CSS': 'https://api.iconify.design/logos/tailwindcss-icon.svg?color=%2306B6D4',
        'Vue.js': 'https://api.iconify.design/logos/vue.svg?color=%234FC08D',
        'JavaScript': 'https://api.iconify.design/logos/javascript.svg?color=%23F7DF1E',
        'TypeScript': 'https://api.iconify.design/logos/typescript-icon.svg?color=%233178C6',
        'PHP': 'https://api.iconify.design/logos/php.svg?color=%23777BB4',
        'Flutter': 'https://api.iconify.design/logos/flutter.svg?color=%2302569B',
        'Bootstrap': 'https://api.iconify.design/logos/bootstrap.svg?color=%237952B3',
        'MySQL': 'https://api.iconify.design/logos/mysql.svg?color=%234479A1',
        'PostgreSQL': 'https://api.iconify.design/logos/postgresql.svg?color=%23336991',
        'MongoDB': 'https://api.iconify.design/logos/mongodb.svg?color=%2347A248',
        'GitHub': 'https://api.iconify.design/logos/github-icon.svg?color=%23181717',
        'GitHub Actions': 'https://api.iconify.design/logos/github-actions.svg?color=%232088FF'
      }
      
      // Fallback vers DevIcons si Iconify n'a pas l'icône
      const devIcons = {
        'Vue.js': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/vuejs/vuejs-original.svg',
        'JavaScript': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg',
        'TypeScript': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg',
        'PHP': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/php/php-original.svg',
        'Flutter': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/flutter/flutter-original.svg',
        'Bootstrap': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/bootstrap/bootstrap-original.svg',
        'MySQL': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original-wordmark.svg',
        'PostgreSQL': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg',
        'MongoDB': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg',
        'GitHub': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/github/github-original.svg'
      }
      
      return iconifyIcons[skill] || devIcons[skill] || ''
    }

    const handleImageError = (event) => {
      const skillName = event.target.alt
      console.warn(`Erreur de chargement de l'icône pour: ${skillName}`)
      
      // Essayer des alternatives avec différentes sources
      const alternatives = {
        'Laravel': [
          'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-plain.svg',
          'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/laravel.svg',
          'https://api.iconify.design/logos/laravel.svg'
        ],
        'NestJS': [
          'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nestjs/nestjs-plain.svg',
          'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/nestjs.svg',
          'https://api.iconify.design/logos/nestjs.svg'
        ],
        'Tailwind CSS': [
          'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-plain.svg',
          'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/tailwindcss.svg',
          'https://api.iconify.design/logos/tailwindcss-icon.svg'
        ],
        'Vue.js': [
          'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg',
          'https://api.iconify.design/logos/vue.svg'
        ],
        'GitHub Actions': [
          'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/githubactions/githubactions-original.svg',
          'https://api.iconify.design/logos/github-actions.svg'
        ]
      }
      
      const altSources = alternatives[skillName]
      if (altSources) {
        const currentSrc = event.target.src
        const currentIndex = altSources.findIndex(url => currentSrc.includes(url.split('/').pop()))
        const nextIndex = currentIndex >= 0 ? currentIndex + 1 : 0
        
        if (nextIndex < altSources.length) {
          event.target.src = altSources[nextIndex]
          return
        }
      }
      
      // Si toutes les alternatives ont échoué
      event.target.style.opacity = '0.5'
    }

    const handleImageLoad = (event) => {
      // S'assurer que l'icône est visible une fois chargée
      event.target.style.opacity = '1'
    }

    return {
      portfolioData,
      getSkillIcon,
      handleImageError,
      handleImageLoad
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
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.5rem;
  background: var(--bg-primary);
  border: 1px solid var(--border);
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--text-primary);
  transition: all 0.3s ease;
}

.skill-icon {
  width: 24px;
  height: 24px;
  object-fit: contain;
  flex-shrink: 0;
  /* Préserver les couleurs originales des SVG */
  filter: none;
  -webkit-filter: none;
}

.skill-name {
  white-space: nowrap;
}

.skill-tag:hover {
  border-color: var(--accent);
  color: var(--accent);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 255, 136, 0.15);
}

.skill-tag:hover .skill-icon {
  transform: scale(1.1);
  transition: transform 0.3s ease;
}

@media (max-width: 968px) {
  .about-content {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
}
</style>

