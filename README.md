# ✦ Abdoulaye & Mariama — Invitation de Mariage

Une invitation numérique **épurée et prestigieuse** : le faire-part + la
localisation de la mosquée, sublimés par des animations de luxe.
Construite avec **Next.js (App Router)**, **Framer Motion** et **Lenis**.

## ✨ L'expérience

1. **Loader cinématique** puis **enveloppe 3D** dorée qui flotte — clic → le
   sceau de cire se brise, l'enveloppe s'ouvre, la carte glisse.
2. **Le faire-part** (style de l'affiche) : cadre doré, coins fleuris, croissant
   & mosquée, les noms en **écriture anglaise (cursive)**, « Takku Diaak », la
   date et le lieu.
3. **La localisation** : Google Maps de la Mosquée Serigne Mansour + bouton
   itinéraire.
4. **Footer** élégant.

Animations : smooth scroll, pétales & particules dorées, rayons de lumière,
curseur personnalisé, halo à la souris, reveals en flou, boutons magnétiques,
tilt 3D, reflets de verre. Son d'ambiance optionnel (Web Audio, sans fichier).
Respecte `prefers-reduced-motion`.

## 🚀 Démarrer en local

```bash
npm install
npm run dev
```

Puis ouvre **http://localhost:3000**.

## ⚙️ Personnalisation

Tout est dans **[`lib/config.js`](lib/config.js)** : noms, textes du faire-part,
date, nom de la mosquée, adresse, carte et lien d'itinéraire.

## ▲ Déploiement Vercel

Aucune config. `git push` puis import sur Vercel — ou :

```bash
npm i -g vercel
vercel
```

Aucun serveur, aucune base de données, aucune variable d'environnement.

---

Bi barke Yàlla. 🤍
