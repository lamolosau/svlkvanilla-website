# 🌍 SVLK Vanilla - Site Web Officiel

> Le portail web officiel pour le serveur Minecraft SVLK Vanilla. Une interface moderne, immersive et réactive conçue pour refléter l'expérience de jeu "Survival Pure".

![Version](https://img.shields.io/badge/version-1.0.0-green)
![Tech](https://img.shields.io/badge/tech-HTML5%20%7C%20CSS3%20%7C%20JS-blue)
![Theme](https://img.shields.io/badge/theme-Glassmorphism-teal)

## ✨ Fonctionnalités Principales

Ce site n'est pas un simple template HTML. Il intègre des fonctionnalités dynamiques avancées :

- **🎨 Design Glassmorphism** : Interface moderne avec effets de flou (backdrop-filter), transparences et lueurs néon.
- **📱 100% Responsive** : Navigation fluide sur mobile avec un menu latéral (Burger Menu) et adaptation tactile.
- **⚡ Animations Dynamiques** :
  - **Scroll Reveal** : Les éléments apparaissent élégamment au défilement.
  - **3D Tilt** : Les cartes réagissent au mouvement de la souris.
  - **Portal FX** : Transition sonore et visuelle immersive vers la version moddée.
- **🔌 Intégrations API** :
  - **État du Serveur** : Affiche le nombre de joueurs en ligne en temps réel via l'API `mcsrvstat.us`.
  - **BlueMap** : Intégration de la carte dynamique dans un cadre flottant interactif.
- **📝 Système de Candidature** : Formulaire de whitelist connecté directement à **Discord** via Webhook (sans base de données).

---

## 📂 Structure du Projet

Voici les fichiers essentiels au fonctionnement du site :

```text
/
├── index.html        # Page d'accueil (Héros, Objectifs, Staff)
├── whitelist.html    # Formulaire de candidature (Connecté à Discord)
├── map.html          # Intégration BlueMap (Cadre flottant)
├── style.css         # Feuille de style principale (Variables, Animations, Responsive)
├── script.js         # Cœur logique (API, Webhook, Events, Animations)
├── background.jpg    # Image de fond principale
└── npsound.mp3       # Son de transition pour le portail

```

---

## ⚙️ Installation & Configuration

Aucune installation complexe (npm/node) n'est nécessaire. C'est un site statique.

### 1. Prérequis

Il suffit d'un serveur web basique (Apache, Nginx) ou d'un hébergeur statique (GitHub Pages, Vercel, Netlify).

### 2. Configuration Obligatoire (`script.js`)

Pour que le site fonctionne avec **votre** serveur, vous devez modifier quelques lignes dans le fichier `script.js`.

**A. Lier le Webhook Discord (Candidatures)**
Cherchez la section `7. FORMULAIRE CANDIDATURE` vers la fin du fichier :

```javascript
// REMPLACEZ CE LIEN PAR VOTRE WEBHOOK DISCORD
const webhookURL =
  "[https://discord.com/api/webhooks/VOTRE_ID/VOTRE_TOKEN](https://discord.com/api/webhooks/VOTRE_ID/VOTRE_TOKEN)";
```

**B. Changer l'IP du Serveur (Statut en ligne)**
Cherchez la section `5. STATUT SERVEUR` :

```javascript
fetch(
  "[https://api.mcsrvstat.us/3/svlkvanilla.lakel.dev](https://api.mcsrvstat.us/3/svlkvanilla.lakel.dev)"
); // Remplacez l'URL si besoin
```

**C. Configurer la copie d'IP**
Cherchez la section `4. COPIER IP` :

```javascript
const ip = "svlkvanilla.lakel.dev"; // Votre IP de connexion
```

### 3. Configuration de la Carte (`map.html`)

Ouvrez `map.html` et modifiez les liens `src` de l'iframe et du bouton plein écran :

```html
<iframe
  src="[https://votre-lien-bluemap.com/](https://votre-lien-bluemap.com/)"
  ...
></iframe>

<a
  href="[https://votre-lien-bluemap.com/](https://votre-lien-bluemap.com/)"
  ...
></a>
```

---

## 🎨 Personnalisation

### Changer l'image de fond

Remplacez simplement le fichier `background.jpg` par votre propre capture d'écran (recommandé : 1920x1080px, format JPG optimisé).

### Changer les couleurs

Toutes les couleurs sont gérées via des variables CSS au début de `style.css`. Modifiez `--primary` pour changer la couleur verte dominante du site.

```css
:root {
  --primary: #22c55e; /* Vert Minecraft */
  --accent: #10b981;
  /* ... */
}
```

---

## ⚠️ Notes de Sécurité

- **Webhook Discord** : Étant donné que le site est statique (Client-Side), l'URL du Webhook Discord est visible dans le code source (`script.js`).
- _Risque_ : Un utilisateur malveillant pourrait spammer le canal.
- _Solution_ : Configurez le Webhook Discord pour qu'il poste dans un salon privé. Si spam il y a, supprimez le webhook et recréez-en un. Pour une sécurité totale, il faudrait passer par un petit backend (PHP/NodeJS) plus tard.

---

## 🤝 Crédits

Développé pour **SVLK Network**.

- Design & Code : [Ton Nom / Ton Pseudo]
- Assets : FontAwesome, Google Fonts (Inter, VT323).

---

© 2025 SVLK Vanilla. Not affiliated with Mojang Studios.
