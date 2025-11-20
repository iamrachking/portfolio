<template>
  <header :class="['header', { scrolled: scrollY > 50 }]">
    <div class="header-container">
      <div class="logo" @click="scrollTo('home')">
        <span class="logo-text">Portfolio</span>
      </div>
      
      <nav :class="['nav', { open: isMenuOpen }]">
        <a 
          href="#home" 
          :class="{ active: activeSection === 'home' }"
          @click.prevent="scrollTo('home')"
        >
          Accueil
        </a>
        <a 
          href="#about" 
          :class="{ active: activeSection === 'about' }"
          @click.prevent="scrollTo('about')"
        >
          À propos
        </a>
        <a 
          href="#projects" 
          :class="{ active: activeSection === 'projects' }"
          @click.prevent="scrollTo('projects')"
        >
          Projets
        </a>
        <a 
          href="#contact" 
          :class="{ active: activeSection === 'contact' }"
          @click.prevent="scrollTo('contact')"
        >
          Contact
        </a>
      </nav>

      <button 
        class="menu-toggle"
        @click="isMenuOpen = !isMenuOpen"
        aria-label="Toggle menu"
      >
        <span :class="{ open: isMenuOpen }"></span>
        <span :class="{ open: isMenuOpen }"></span>
        <span :class="{ open: isMenuOpen }"></span>
      </button>
    </div>
  </header>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'

export default {
  name: 'Header',
  props: {
    scrollY: {
      type: Number,
      default: 0
    }
  },
  setup() {
    const isMenuOpen = ref(false)
    const activeSection = ref('home')

    const scrollTo = (id) => {
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
        isMenuOpen.value = false
      }
    }

    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'contact']
      const current = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (current) activeSection.value = current
    }

    onMounted(() => {
      window.addEventListener('scroll', handleScroll)
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
    })

    return {
      isMenuOpen,
      activeSection,
      scrollTo
    }
  }
}
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 1.5rem 0;
  background: rgba(10, 10, 10, 0.8);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid transparent;
  transition: all 0.3s ease;
}

.header.scrolled {
  padding: 1rem 0;
  border-bottom-color: var(--border);
  background: rgba(10, 10, 10, 0.95);
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  cursor: pointer;
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.5px;
  background: linear-gradient(135deg, var(--text-primary), var(--accent));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  transition: transform 0.3s ease;
}

.logo:hover {
  transform: scale(1.05);
}

.nav {
  display: flex;
  gap: 2.5rem;
  align-items: center;
}

.nav a {
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
  position: relative;
  transition: color 0.3s ease;
  padding: 0.5rem 0;
}

.nav a::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--accent);
  transition: width 0.3s ease;
}

.nav a:hover,
.nav a.active {
  color: var(--text-primary);
}

.nav a:hover::after,
.nav a.active::after {
  width: 100%;
}

.menu-toggle {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  z-index: 1001;
}

.menu-toggle span {
  width: 25px;
  height: 2px;
  background: var(--text-primary);
  transition: all 0.3s ease;
  transform-origin: center;
}

.menu-toggle span.open:nth-child(1) {
  transform: rotate(45deg) translate(7px, 7px);
}

.menu-toggle span.open:nth-child(2) {
  opacity: 0;
}

.menu-toggle span.open:nth-child(3) {
  transform: rotate(-45deg) translate(7px, -7px);
}

@media (max-width: 768px) {
  .menu-toggle {
    display: flex;
  }

  .nav {
    position: fixed;
    top: 0;
    right: -100%;
    width: 280px;
    height: 100vh;
    background: var(--bg-secondary);
    flex-direction: column;
    justify-content: center;
    gap: 2rem;
    padding: 2rem;
    border-left: 1px solid var(--border);
    transition: right 0.3s ease;
  }

  .nav.open {
    right: 0;
  }

  .nav a {
    font-size: 1.1rem;
  }
}
</style>

