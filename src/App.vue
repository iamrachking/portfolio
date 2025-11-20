<template>
  <div class="app">
    <Header :scroll-y="scrollY" />
    <Hero />
    <About />
    <Projects />
    <Contact />
    <Footer />
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'
import Header from './components/Header.vue'
import Hero from './components/Hero.vue'
import About from './components/About.vue'
import Projects from './components/Projects.vue'
import Contact from './components/Contact.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    Header,
    Hero,
    About,
    Projects,
    Contact,
    Footer
  },
  setup() {
    const scrollY = ref(0)

    const handleScroll = () => {
      scrollY.value = window.scrollY
    }

    onMounted(() => {
      window.addEventListener('scroll', handleScroll)
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
    })

    return {
      scrollY
    }
  }
}
</script>

<style scoped>
.app {
  position: relative;
  width: 100%;
  min-height: 100vh;
}
</style>

