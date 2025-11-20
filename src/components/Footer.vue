<template>
  <footer class="footer">
    <div class="footer-content">
      <p class="footer-text">
        Portfolio fait par <span class="footer-name">Abdoul Rachard</span>
        <span class="heart-icon">❤️</span>
      </p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped>
.footer {
  padding: 1.5rem 2rem;
  background: var(--bg-secondary);
  border-top: 1px solid var(--border);
  text-align: center;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
}

.footer-text {
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin: 0;
}

.footer-name {
  color: var(--text-primary);
  font-weight: 600;
}

.heart-icon {
  display: inline-block;
  margin-left: 0.5rem;
  animation: heartbeat 1.5s ease-in-out infinite;
}

@keyframes heartbeat {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
}

@media (max-width: 768px) {
  .footer {
    padding: 1.5rem 1rem;
  }
  
  .footer-text {
    font-size: 0.85rem;
  }
}
</style>

