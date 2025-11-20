# Fichier de données du portfolio

Ce fichier `portfolio.json` contient toutes les données affichées sur votre portfolio.

## Structure

### Hero (Section d'accueil)
- `greeting` : Texte de salutation
- `firstName` : Votre prénom
- `lastName` : Votre nom
- `dynamicTexts` : Tableau des textes qui s'animent (ex: ["Développeur", "Designer"])
- `description` : Votre description courte

### About (À propos)
- `intro` : Introduction de la section
- `description` : Tableau de paragraphes (chaque élément = un paragraphe)
- `skills` : Tableau simple des compétences (juste les noms, ex: ["Vue.js", "JavaScript"])

### Projects (Projets)
Tableau de projets, chaque projet contient :
- `id` : Identifiant unique (numéro)
- `title` : Titre du projet
- `description` : Description du projet
- `tech` : Tableau des technologies utilisées
- `image` : Emoji ou icône (ex: "🛒", "📊")
- `link` : Lien vers le projet en ligne
- `github` : Lien vers le code source GitHub

### Contact
- `title` : Titre de la section
- `description` : Description
- `socialLinks` : Tableau des liens sociaux
  - `name` : Nom du réseau (ex: "GitHub", "LinkedIn")
  - `icon` : Icône ou emoji
  - `url` : Lien vers votre profil

## Exemple d'ajout de projet

```json
{
  "id": 5,
  "title": "Mon nouveau projet",
  "description": "Description de mon projet",
  "tech": ["Vue.js", "TypeScript"],
  "image": "🚀",
  "link": "https://mon-projet.com",
  "github": "https://github.com/mon-projet"
}
```

Il suffit d'ajouter cet objet au tableau `projects` dans le JSON !

## Configuration de l'envoi d'emails

Le formulaire de contact utilise actuellement `mailto:` qui ouvre votre client email.

Pour un envoi automatique, vous pouvez configurer EmailJS :
1. Créez un compte sur https://www.emailjs.com
2. Créez un service email
3. Créez un template
4. Dans `Contact.vue`, décommentez le code EmailJS et ajoutez vos clés
