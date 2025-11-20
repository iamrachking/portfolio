// Script pour récupérer les projets GitHub
// Utilisation: node scripts/fetch-github-projects.js

const fs = require('fs');
const path = require('path');

// Configuration
const GITHUB_USERNAME = 'iamrachking';
const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=10`;

async function fetchGitHubProjects() {
  try {
    console.log(`Récupération des projets de ${GITHUB_USERNAME}...`);
    
    const response = await fetch(GITHUB_API_URL);
    
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    
    const repos = await response.json();
    
    console.log(`\n${repos.length} projets trouvés:\n`);
    
    const projects = repos
      .filter(repo => !repo.fork && !repo.archived) // Exclure les forks et archives
      .slice(0, 6) // Limiter à 6 projets
      .map((repo, index) => {
        // Déterminer les technologies basées sur le langage principal
        const languages = [repo.language].filter(Boolean);
        const tech = determineTechStack(repo.language, repo.name, repo.description);
        
        return {
          id: index + 1,
          title: formatTitle(repo.name),
          description: repo.description || `Projet ${repo.name} développé avec ${repo.language || 'plusieurs technologies'}.`,
          tech: tech,
          image: getEmojiForProject(repo.name, repo.language),
          link: repo.homepage || '#',
          github: repo.html_url
        };
      });
    
    // Afficher les projets
    projects.forEach((project, index) => {
      console.log(`${index + 1}. ${project.title}`);
      console.log(`   Description: ${project.description}`);
      console.log(`   Tech: ${project.tech.join(', ')}`);
      console.log(`   GitHub: ${project.github}\n`);
    });
    
    // Générer le JSON pour portfolio.json
    const jsonOutput = JSON.stringify(projects, null, 2);
    console.log('\n=== JSON pour portfolio.json ===\n');
    console.log(jsonOutput);
    
    return projects;
    
  } catch (error) {
    console.error('Erreur lors de la récupération:', error.message);
    return null;
  }
}

function formatTitle(name) {
  return name
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function determineTechStack(language, repoName, description) {
  const tech = [];
  const desc = (description || '').toLowerCase();
  const name = repoName.toLowerCase();
  
  // Détection basée sur le langage
  if (language === 'JavaScript' || language === 'TypeScript') {
    if (name.includes('vue') || desc.includes('vue')) tech.push('Vue.js');
    if (name.includes('react') || desc.includes('react')) tech.push('React');
    if (name.includes('nest') || desc.includes('nest')) tech.push('NestJS');
    tech.push('JavaScript');
    if (language === 'TypeScript') tech.push('TypeScript');
  }
  
  if (language === 'PHP') {
    if (name.includes('laravel') || desc.includes('laravel')) tech.push('Laravel');
    tech.push('PHP');
  }
  
  if (language === 'Dart') tech.push('Flutter', 'Dart');
  
  // Détection basée sur les mots-clés
  if (desc.includes('tailwind') || name.includes('tailwind')) tech.push('Tailwind CSS');
  if (desc.includes('bootstrap') || name.includes('bootstrap')) tech.push('Bootstrap');
  if (desc.includes('firebase') || name.includes('firebase')) tech.push('Firebase');
  if (desc.includes('mysql') || desc.includes('database')) tech.push('MySQL');
  
  // Si aucune tech détectée, utiliser le langage principal
  if (tech.length === 0 && language) {
    tech.push(language);
  }
  
  return tech.length > 0 ? tech : ['JavaScript'];
}

function getEmojiForProject(name, language) {
  const nameLower = name.toLowerCase();
  
  if (nameLower.includes('mobile') || nameLower.includes('app') || language === 'Dart') return '📱';
  if (nameLower.includes('api') || nameLower.includes('backend')) return '⚙️';
  if (nameLower.includes('dashboard') || nameLower.includes('admin')) return '📊';
  if (nameLower.includes('ecommerce') || nameLower.includes('shop')) return '🛒';
  if (nameLower.includes('portfolio')) return '🎨';
  if (nameLower.includes('laravel') || language === 'PHP') return '💼';
  
  return '🚀';
}

// Exécuter le script
if (require.main === module) {
  fetchGitHubProjects();
}

module.exports = { fetchGitHubProjects };

