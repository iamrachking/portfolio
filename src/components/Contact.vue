<template>
  <section id="contact" class="contact">
    <div class="container">
      <div class="section-header">
        <span class="section-number">03</span>
        <h2 class="section-title">Contact</h2>
      </div>

      <div class="contact-content">
        <div class="contact-info">
          <h3 class="contact-subtitle">{{ portfolioData.contact.title }}</h3>
          <p class="contact-description">
            {{ portfolioData.contact.description }}
          </p>
          
          <div class="social-links">
            <a
              v-for="(social, index) in portfolioData.contact.socialLinks"
              :key="index"
              :href="social.url"
              target="_blank"
              rel="noopener noreferrer"
              class="social-link"
            >
              <span class="social-icon">{{ social.icon }}</span>
              <span class="social-name">{{ social.name }}</span>
            </a>
          </div>
        </div>

        <form class="contact-form" @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="name">Nom</label>
            <input
              type="text"
              id="name"
              v-model="formData.name"
              required
              placeholder="Votre nom"
            />
          </div>

          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              v-model="formData.email"
              required
              placeholder="votre@email.com"
            />
          </div>

          <div class="form-group">
            <label for="phone">Numéro de téléphone</label>
            <input
              type="tel"
              id="phone"
              v-model="formData.phone"
              placeholder="Votre numéro de téléphone"
            />
          </div>

          <div class="form-group">
            <label for="message">Message</label>
            <textarea
              id="message"
              v-model="formData.message"
              required
              rows="5"
              placeholder="Votre message..."
            ></textarea>
          </div>

          <button type="submit" :disabled="isSubmitting" class="btn btn-primary btn-submit">
            <span v-if="!isSubmitting">Envoyer le message</span>
            <span v-else>Envoi en cours...</span>
          </button>
          <p v-if="submitMessage" :class="['submit-message', submitMessage.includes('succès') ? 'success' : 'error']">
            {{ submitMessage }}
          </p>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import { ref } from 'vue'
import portfolioData from '../data/portfolio.json'
import emailjs from '@emailjs/browser'

export default {
  name: 'Contact',
  setup() {
    const formData = ref({
      name: '',
      email: '',
      phone: '',
      message: ''
    })
    const isSubmitting = ref(false)
    const submitMessage = ref('')

    const handleSubmit = async () => {
      isSubmitting.value = true
      submitMessage.value = ''

      try {
        // Initialiser EmailJS si nécessaire
        if (emailjs.init) {
          emailjs.init('nfbZbza61dXXWU3Xa')
        }

        // Envoyer l'email avec EmailJS
        await emailjs.send(
          'service_aq1z6ez',
          'template_w6vmolo',
          {
            from_name: formData.value.name,
            from_email: formData.value.email,
            from_phone: formData.value.phone || 'Non renseigné',
            message: formData.value.message,
            date: new Date().toLocaleString('fr-FR')
          },
          'nfbZbza61dXXWU3Xa'
        )

        submitMessage.value = 'Message envoyé avec succès !'
        formData.value = { name: '', email: '', phone: '', message: '' }
        
        setTimeout(() => {
          submitMessage.value = ''
        }, 5000)
      } catch (error) {
        console.error('Erreur lors de l\'envoi:', error)
        
        let errorMessage = 'Erreur lors de l\'envoi. Veuillez réessayer.'
        
        if (error?.text) {
          errorMessage = `Erreur: ${error.text}`
        } else if (error?.message) {
          errorMessage = `Erreur: ${error.message}`
        }
        
        submitMessage.value = errorMessage
      } finally {
        isSubmitting.value = false
      }
    }

    return {
      formData,
      portfolioData,
      isSubmitting,
      submitMessage,
      handleSubmit
    }
  }
}
</script>

<style scoped>
.contact {
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

.contact-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.contact-subtitle {
  font-size: 2rem;
  font-weight: 600;
  color: var(--text-primary);
}

.contact-description {
  font-size: 1rem;
  color: var(--text-secondary);
  line-height: 1.8;
}

.social-links {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.social-link {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: 8px;
  text-decoration: none;
  color: var(--text-primary);
  transition: all 0.3s ease;
}

.social-link:hover {
  border-color: var(--accent);
  transform: translateX(5px);
  background: rgba(0, 255, 136, 0.05);
}

.social-icon {
  font-size: 1.2rem;
  width: 24px;
  text-align: center;
}

.social-name {
  font-weight: 500;
}

.contact-form {
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.form-group label {
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-primary);
}

.form-group input,
.form-group textarea {
  padding: 1rem;
  background: var(--bg-primary);
  border: 1px solid var(--border);
  border-radius: 8px;
  color: var(--text-primary);
  font-size: 1rem;
  font-family: inherit;
  transition: all 0.3s ease;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(0, 255, 136, 0.1);
}

.form-group textarea {
  resize: vertical;
  min-height: 120px;
}

.btn-submit {
  width: 100%;
  margin-top: 1rem;
  padding: 1.1rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: var(--accent);
  color: var(--bg-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 52px;
}

.btn-submit:hover:not(:disabled) {
  background: var(--accent-hover);
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(0, 255, 136, 0.3);
}

.btn-submit:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.submit-message {
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
  text-align: center;
  font-weight: 500;
}

.submit-message.success {
  background: rgba(0, 255, 136, 0.1);
  border: 1px solid var(--accent);
  color: var(--accent);
}

.submit-message.error {
  background: rgba(255, 0, 0, 0.1);
  border: 1px solid #ff4444;
  color: #ff4444;
}

@media (max-width: 968px) {
  .contact-content {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
}

@media (max-width: 768px) {
  .contact {
    padding: 6rem 1.5rem 3rem;
  }
}
</style>

