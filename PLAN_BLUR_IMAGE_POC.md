# Plan : POC Blur Image Placeholders pour Kering

## Description

POC de démonstration pour comparer 3 approches de chargement d'images :
1. **Sans blur** - Chargement standard (baseline)
2. **Avec blur LQIP** - Placeholder flou + transition vers HD
3. **LCP-optimized** - Image qualité minimale à taille réelle (sans blur) pour optimiser le LCP

**Objectif** : Permettre aux 4 marques Kering (2 SFCC + 2 Next.js) de visualiser et comparer les approches pour décider de l'implémentation.

## Objectifs

- [x] Comprendre les différentes techniques de blur placeholder
- [ ] Créer un POC vanilla HTML/CSS/JS (compatible SFCC et Next.js)
- [ ] Afficher les 3 variantes côte à côte pour comparaison visuelle
- [ ] Mesurer les Web Vitals (LCP, CLS, FCP) en temps réel
- [ ] Déployer sur Vercel pour accès facile
- [ ] Documenter l'adaptation pour SFCC et Next.js

## Contexte technique

### Pourquoi ces 3 approches ?

| Approche | Description | Use Case |
|----------|-------------|----------|
| **Sans blur** | Image HD directement | Baseline de comparaison |
| **Blur LQIP** | Image 20-40px base64 + CSS blur(20px) + transition | Images non-LCP, galeries produit |
| **LCP-optimized** | Image qualité minimale (JPEG q=10-20) à taille réelle | Hero banners, LCP images |

### Point crucial : Le BPP threshold

Le navigateur **ignore** les images blur/low-entropy pour le LCP.
Pour qu'une image compte comme LCP, elle doit avoir **≥ 0.05 BPP** (bits par pixel).

**Formule** : `BPP = file_size_bytes / (width × height × 8)`

Pour une image 1200×800 :
- Minimum requis : 1200 × 800 × 8 × 0.05 = 480 bytes
- Recommandé (0.055 BPP) : ~528 bytes
- En pratique : JPEG q=10-20 ≈ 2-5 KB

## Prérequis

- Node.js 18+ (pour script de génération LQIP)
- Images sources (URLs fournies par l'utilisateur)
- Compte Vercel (pour déploiement)

## Structure du projet

```
blur-image-poc/
├── index.html              # Page d'accueil avec navigation
├── product-card.html       # Page comparaison ProductCard
├── banner.html             # Page comparaison Banner
├── css/
│   └── styles.css          # Styles globaux + composants
├── js/
│   ├── web-vitals.js       # Dashboard métriques temps réel
│   ├── image-loader.js     # Logique de chargement progressif
│   └── network-throttle.js # Simulation connexions lentes
├── images/
│   ├── products/           # Images produits HD
│   ├── banners/            # Images bannières HD
│   └── lqip/               # Placeholders générés
├── scripts/
│   └── generate-lqip.js    # Script Node.js génération LQIP
├── docs/
│   ├── SFCC_INTEGRATION.md # Guide intégration SFCC
│   └── NEXTJS_INTEGRATION.md # Guide intégration Next.js
├── package.json            # Dépendances Node.js
├── vercel.json             # Config déploiement
└── PLAN_BLUR_IMAGE_POC.md  # Ce fichier
```

## Étapes d'implémentation

### Étape 1 : Setup projet et structure
**Status**: ⏳ En attente

**Description**: Créer la structure de base du projet vanilla

**Fichiers à créer**:
- `package.json`
- `index.html`
- `css/styles.css`
- `vercel.json`

**Critères de validation**:
- [ ] Structure de dossiers créée
- [ ] package.json avec dépendances (sharp pour LQIP)
- [ ] Page index.html fonctionnelle

---

### Étape 2 : Script de génération LQIP
**Status**: ⏳ En attente

**Description**: Créer le script Node.js pour générer les placeholders

**Fichiers à créer**:
- `scripts/generate-lqip.js`

**Fonctionnalités**:
1. Télécharger image depuis URL
2. Générer Base64 LQIP (20px wide, blur)
3. Générer LCP-optimized (full size, quality=15)
4. Sauvegarder les fichiers + générer JSON de config

**Critères de validation**:
- [ ] Script génère Base64 LQIP < 1KB
- [ ] Script génère LCP image avec 0.05+ BPP
- [ ] Output JSON avec toutes les infos nécessaires

---

### Étape 3 : Composant Image avec 3 variantes
**Status**: ⏳ En attente

**Description**: Créer le système d'affichage des 3 variantes

**Fichiers à créer**:
- `js/image-loader.js`

**Logique**:
```javascript
// Variante 1: Sans blur
<img src="hd.jpg" />

// Variante 2: Blur LQIP
<img src="data:image/jpeg;base64,..." class="blur" data-src="hd.jpg" />
// + JS pour swap quand HD chargée

// Variante 3: LCP-optimized
<img src="lqip-full-size.jpg" data-src="hd.jpg" fetchpriority="high" />
// + JS pour swap sans transition blur
```

**Critères de validation**:
- [ ] 3 variantes affichées correctement
- [ ] Transition blur smooth (variante 2)
- [ ] Swap immédiat (variante 3)

---

### Étape 4 : Dashboard Web Vitals
**Status**: ⏳ En attente

**Description**: Créer le dashboard de métriques temps réel

**Fichiers à créer**:
- `js/web-vitals.js`

**Métriques à afficher**:
- **LCP** : Largest Contentful Paint
- **FCP** : First Contentful Paint
- **CLS** : Cumulative Layout Shift
- **TTFB** : Time to First Byte
- **Image Load Time** : Temps de chargement de l'image HD

**Features**:
- Affichage en temps réel
- Comparaison des 3 variantes
- Export des résultats (copier/coller)

**Critères de validation**:
- [ ] Métriques affichées en temps réel
- [ ] Coloration selon seuils (vert/orange/rouge)
- [ ] Bouton refresh pour relancer les mesures

---

### Étape 5 : Page ProductCard
**Status**: ⏳ En attente

**Description**: Créer la page de démonstration ProductCard

**Fichiers à créer**:
- `product-card.html`

**Layout**:
```
┌─────────────────────────────────────────────────────────┐
│  [Dashboard Web Vitals - En haut de page]               │
├─────────────────────────────────────────────────────────┤
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐       │
│  │ Sans blur   │ │ Blur LQIP   │ │LCP-optimized│       │
│  │             │ │             │ │             │       │
│  │  [Image]    │ │  [Image]    │ │  [Image]    │       │
│  │             │ │             │ │             │       │
│  │ Product     │ │ Product     │ │ Product     │       │
│  │ Name        │ │ Name        │ │ Name        │       │
│  │ €XXX        │ │ €XXX        │ │ €XXX        │       │
│  └─────────────┘ └─────────────┘ └─────────────┘       │
│                                                         │
│  [Bouton: Reload pour tester]                          │
│  [Sélecteur: Connexion (3G/4G/Fast)]                   │
└─────────────────────────────────────────────────────────┘
```

**Critères de validation**:
- [ ] 3 cartes produit côte à côte
- [ ] Même image, 3 approches différentes
- [ ] Métriques individuelles par carte

---

### Étape 6 : Page Banner
**Status**: ⏳ En attente

**Description**: Créer la page de démonstration Banner (hero image)

**Fichiers à créer**:
- `banner.html`

**Layout**:
- Bannière full-width
- 3 sections empilées verticalement (une par variante)
- Dashboard métriques sticky en haut

**Critères de validation**:
- [ ] Bannières full-width responsive
- [ ] Simulation hero section réaliste
- [ ] Métriques LCP bien visibles

---

### Étape 7 : Simulation connexion réseau
**Status**: ⏳ En attente

**Description**: Ajouter sélecteur pour simuler différentes vitesses

**Fichiers à créer**:
- `js/network-throttle.js`

**Options**:
- Fast 3G (1.6 Mbps)
- Slow 3G (400 Kbps)
- 4G (9 Mbps)
- WiFi (30 Mbps)

**Note**: La vraie limitation se fait via DevTools, mais on peut ajouter un délai artificiel côté JS pour la démo.

**Critères de validation**:
- [ ] Sélecteur fonctionnel
- [ ] Instructions pour utiliser DevTools throttling

---

### Étape 8 : Documentation SFCC et Next.js
**Status**: ⏳ En attente

**Description**: Créer les guides d'intégration

**Fichiers à créer**:
- `docs/SFCC_INTEGRATION.md`
- `docs/NEXTJS_INTEGRATION.md`

**Contenu SFCC**:
- Intégration avec DIS (Dynamic Image Service)
- Stockage LQIP en custom attributes
- Template ISML exemple
- Option Cloudinary

**Contenu Next.js**:
- Utilisation de `next/image` avec `placeholder="blur"`
- Génération LQIP avec `plaiceholder`
- Optimisation LCP avec `priority`

**Critères de validation**:
- [ ] Exemples de code copier/coller
- [ ] Explications claires pour les devs

---

### Étape 9 : Configuration Vercel et déploiement
**Status**: ⏳ En attente

**Description**: Configurer et déployer sur Vercel

**Fichiers à modifier**:
- `vercel.json`
- `package.json` (scripts)

**Critères de validation**:
- [ ] Build sans erreur
- [ ] Site accessible publiquement
- [ ] URL partageable

---

## Tests à créer

- [ ] Test visuel : 3 variantes s'affichent correctement
- [ ] Test métriques : Dashboard affiche les bonnes valeurs
- [ ] Test responsive : Fonctionne sur mobile
- [ ] Test cross-browser : Chrome, Safari, Firefox

## Critères d'acceptation finaux

- [ ] POC déployé sur Vercel
- [ ] 2 pages fonctionnelles (ProductCard + Banner)
- [ ] Dashboard Web Vitals en temps réel
- [ ] Documentation SFCC et Next.js complète
- [ ] URL partageable pour présentation aux marques

## Ressources et références

- [CSS Wizardry - Ultimate LQIP-LCP technique](https://csswizardry.com/2023/09/the-ultimate-lqip-lcp-technique/)
- [Cloudinary - LQIP Explained](https://cloudinary.com/blog/low_quality_image_placeholders_lqip_explained)
- [Mux - Blurry image placeholders](https://www.mux.com/blog/blurry-image-placeholders-on-the-web)
- [web.dev - Optimize LCP](https://web.dev/articles/optimize-lcp)
- [ResponsiveImage Library](https://responsive-image.dev/usage/lqip)

---

## Notes pour l'utilisateur

**Images requises** : Merci de fournir les URLs des images (produit + bannière) à utiliser pour le POC.

**Format attendu** :
```
Produit: https://example.com/product-image.jpg
Bannière: https://example.com/banner-image.jpg
```

Idéalement des images haute résolution (1200px+ pour produit, 1920px+ pour bannière).
