<template>
  <section id="home" class="hero">
    <div class="hero-background">
      <div class="gradient-orb orb-1"></div>
      <div class="gradient-orb orb-2"></div>
      <div class="gradient-orb orb-3"></div>
    </div>
    
    <div class="hero-content">
      <div class="hero-text">
        <p class="hero-greeting">{{ portfolioData.hero.greeting }}</p>
        <h1 class="hero-name">
          <span class="name-first">{{ portfolioData.hero.firstName }}</span>
          <span class="name-last">{{ portfolioData.hero.lastName }}</span>
        </h1>
        <div class="hero-title">
          <span class="title-prefix">Je suis </span>
          <span ref="textRef" class="title-dynamic">{{ currentText }}</span>
          <span class="cursor">|</span>
        </div>
        <p class="hero-description">
          {{ portfolioData.hero.description }}
        </p>
        <div class="hero-buttons">
          <button class="btn btn-primary" @click="scrollToProjects">
            Voir mes projets
          </button>
          <a href="#contact" class="btn btn-secondary">
            Me contacter
          </a>
        </div>
      </div>
      
      <div class="hero-visual">
        <div class="visual-container">
          <div class="code-block">
            <div class="code-line">
              <span class="code-keyword">const</span>
              <span class="code-variable"> portfolio</span>
              <span class="code-operator"> =</span>
              <span class="code-string"> 'awesome'</span>
              <span class="code-operator">;</span>
            </div>
            <div class="code-line">
              <span class="code-keyword">while</span>
              <span class="code-operator"> (</span>
              <span class="code-variable">coding</span>
              <span class="code-operator">) {</span>
            </div>
            <div class="code-line indent">
              <span class="code-variable">create</span>
              <span class="code-operator">(</span>
              <span class="code-string">'magic'</span>
              <span class="code-operator">);</span>
            </div>
            <div class="code-line">
              <span class="code-operator">}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="scroll-indicator">
      <div class="mouse"></div>
    </div>
  </section>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'
import portfolioData from '../data/portfolio.json'

export default {
  name: 'Hero',
  setup() {
    const textRef = ref(null)
    const currentText = ref('')
    const texts = portfolioData.hero.dynamicTexts
    let textIndex = 0
    let charIndex = 0
    let isDeleting = false
    let timeoutId = null

    const type = () => {
      const current = texts[textIndex]
      
      if (isDeleting) {
        currentText.value = current.substring(0, charIndex - 1)
        charIndex--
      } else {
        currentText.value = current.substring(0, charIndex + 1)
        charIndex++
      }

      if (!isDeleting && charIndex === current.length) {
        timeoutId = setTimeout(() => {
          isDeleting = true
        }, 2000)
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false
        textIndex = (textIndex + 1) % texts.length
      }

      const speed = isDeleting ? 50 : 100
      timeoutId = setTimeout(type, speed)
    }

    const scrollToProjects = () => {
      const element = document.getElementById('projects')
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }

    onMounted(() => {
      type()
    })

    onUnmounted(() => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    })

    return {
      textRef,
      currentText,
      scrollToProjects,
      portfolioData
    }
  }
}
</script>

<style scoped>
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 8rem 2rem 4rem;
  overflow: hidden;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  overflow: hidden;
}

.gradient-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0.25;
  animation: float 22s infinite ease-in-out;
}

.orb-1 {
  width: 520px;
  height: 520px;
  background: radial-gradient(circle, var(--accent), transparent 70%);
  top: -220px;
  left: -180px;
  animation-delay: 0s;
}

.orb-2 {
  width: 380px;
  height: 380px;
  background: radial-gradient(circle, #3b82f6, transparent 70%);
  bottom: -120px;
  right: -100px;
  animation-delay: 4s;
}

.orb-3 {
  width: 280px;
  height: 280px;
  background: radial-gradient(circle, #8b5cf6, transparent 70%);
  top: 45%;
  left: 55%;
  animation-delay: 8s;
}

@keyframes float {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(30px, -30px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
}

.hero-content {
  max-width: 1200px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  position: relative;
  z-index: 1;
}

.hero-text {
  animation: fadeInUp 0.8s ease;
}

.hero-greeting {
  font-size: 1.1rem;
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.hero-name {
  font-size: clamp(3rem, 8vw, 5.5rem);
  font-weight: 700;
  line-height: 1.05;
  margin-bottom: 1rem;
  letter-spacing: -0.03em;
  font-family: var(--font-display);
}

.name-first {
  display: block;
  background: linear-gradient(135deg, var(--text-primary), var(--accent));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.name-last {
  display: block;
  color: var(--text-primary);
}

.hero-title {
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  margin-bottom: 1.5rem;
  min-height: 3rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.title-prefix {
  color: var(--text-secondary);
}

.title-dynamic {
  color: var(--accent);
  font-weight: 600;
}

.cursor {
  color: var(--accent);
  animation: blink 1s infinite;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

.hero-description {
  font-size: 1.1rem;
  color: var(--text-secondary);
  line-height: 1.8;
  margin-bottom: 2.5rem;
  max-width: 500px;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.btn {
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
  text-align: center;
}

.btn-primary {
  background: var(--accent);
  color: var(--bg-primary);
}

.btn-primary:hover {
  background: var(--accent-hover);
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(0, 255, 136, 0.3);
}

.btn-secondary {
  background: transparent;
  color: var(--text-primary);
  border: 2px solid var(--border);
}

.btn-secondary:hover {
  border-color: var(--accent);
  color: var(--accent);
  transform: translateY(-2px);
}

.hero-visual {
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeInRight 0.8s ease;
}

.visual-container {
  width: 100%;
  max-width: 500px;
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
}

.code-block {
  font-family: 'Courier New', monospace;
  font-size: 0.95rem;
  line-height: 1.8;
}

.code-line {
  display: block;
  margin-bottom: 0.5rem;
}

.code-line.indent {
  padding-left: 1.5rem;
}

.code-keyword {
  color: #c792ea;
}

.code-variable {
  color: #82aaff;
}

.code-operator {
  color: #89ddff;
}

.code-string {
  color: #c3e88d;
}

.scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  animation: bounce 2s infinite;
}

.mouse {
  width: 24px;
  height: 40px;
  border: 2px solid var(--text-secondary);
  border-radius: 12px;
  position: relative;
}

.mouse::before {
  content: '';
  position: absolute;
  top: 8px;
  left: 50%;
  transform: translateX(-50%);
  width: 4px;
  height: 8px;
  background: var(--text-secondary);
  border-radius: 2px;
  animation: scroll 2s infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translateX(-50%) translateY(0);
  }
  50% {
    transform: translateX(-50%) translateY(-10px);
  }
}

@keyframes scroll {
  0% {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateX(-50%) translateY(15px);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@media (max-width: 968px) {
  .hero-content {
    grid-template-columns: 1fr;
    gap: 3rem;
    text-align: center;
  }

  .hero-description {
    max-width: 100%;
  }

  .hero-buttons {
    justify-content: center;
  }

  .hero-visual {
    order: -1;
  }
}
</style>

