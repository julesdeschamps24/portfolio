# style.md — Ce que Jules recherche (référence permanente)

> Ce fichier est la source de vérité du goût de Jules pour ce portfolio.
> À lire avant TOUTE proposition visuelle. Mis à jour au fil des retours.

## Le principe n°1 : du réel, pas du « style IA »

Jules rejette les propositions qui « font IA » : compositions génériques, promesses
creuses, chiffres inventés, tunnels de vente. **Toute proposition visuelle doit
s'appuyer sur un pattern observé sur un vrai site en ligne** (voir
`mockups/references-sites-reels.html` — 42 sites vérifiés).
Montrer la référence réelle AVANT de coder.

## Références validées par Jules

- **vanholtz.co** ⭐ — LA référence retenue (le style global lui plaît) :
  - **Pattern « téléphones »** (page /work/studiomega) : 2 groupes de 2 iPhones
    qui se superposent, affichant les versions mobiles des sites. À utiliser pour
    prouver qu'on soigne le mobile. Reproduire « exactement pareil : 2× 2 téléphones
    qui se superposent ».
  - **Pattern « double marquee »** (présentation des sites) : les vignettes de
    réalisations défilent sur deux rangées — **rangée du haut vers la droite,
    rangée du bas vers la gauche**. C'est le mode de présentation des réalisations.
- Autres références marquées ★ dans la page de références :
  - **alt-web.fr** — même métier (dev solo → TPE), split de couleurs, surligneur, avis Google.
  - **lmscom.fr** — display + serif italique sur fond sombre chaleureux (proche de notre DA).
  - **dennissnellenberg.com** — héros-portrait de référence (photo plein cadre, localisation).
  - **viens-la.com** — couleur pleine + typo massive, personnalité jusque dans le loader.

## DA (en transition — 2026-07-16)

- **Le cobalt vibrant plein écran est abandonné** : Jules veut des **couleurs plus
  sobres**. Toujours en APLAT strict, **jamais de dégradé**.
- **Palette choisie : « Os & encre »** (réf. vanholtz.co) : fond crème `#f1f0ea`,
  encre `#16150f`, soft `#57544a`, muted `#8b887c`, lignes `#d9d6cb`.
- **Héros choisi : « B — Mot rotatif »** (réf. viens-la.com, maquette
  `mockups/hero-brainstorm.html`) : « Des sites sur-mesure pour les
  *paysagistes. / praticiens. / artisans. / commerçants. / indépendants.* »
  (mot en Instrument Serif italique qui roule verticalement toutes les ~2 s).
  **Structure validée telle quelle. PAS de 3ᵉ ligne** (décision finale) : le titre
  s'arrête sur le mot rotatif. Sous le titre : chips de faits réels (10 sites en
  ligne · Réponse sous 24 h · Un seul interlocuteur) + boutons sobres.
  Le bandeau de secteurs défilant est SUPPRIMÉ (redondant avec le mot rotatif).
- **Le héros doit REMPLIR l'écran** (retour 2026-07-16 : « une partie de la page
  d'en dessous s'affichait dans le héros ») : `min-height: calc(100svh - 74px)`,
  contenu centré verticalement, filet + scroll-cue (« ↓ Défiler ») en pied de héros.
  Titre à l'échelle clamp(44px, 8vw, 122px) : il doit attirer l'œil.
- Contraste AA obligatoire : `--muted2:#666357` (pas plus clair), placeholders de
  formulaire en `--soft`, erreurs de formulaire en `#8c2f24` sur `rgba(180,60,50,.12)`.
- **Typos conservées** : Syne (titres, 700/800), Instrument Serif italique
  (mots-accents), Schibsted Grotesk (corps). Interdits : Inter, Space Grotesk.
- **Héros SANS portrait** (décision 2026-07-16) : plus de photo de Jules dans le
  héros. À la place, **une « bulle » photo sur la page/section contact** (à faire).
- Chiffres romains en MAJUSCULES (I, II, III, IV) — jamais i/ii/iii (effet bug).

## Offre (contenu contractuel)

- **Jules ne propose PAS de suivi/maintenance** (décision 2026-07-16) : la carte
  service « Suivi & sérénité » a été supprimée. Services = 3 : Design & identité,
  Site sur-mesure, Visible localement. Ne jamais promettre hébergement, mises à
  jour ou maintenance dans les textes.
- La photo de Jules vit dans une **bulle sur la section Contact**
  (`public/img/jules.jpg`, en attente de la vraie photo).

## Ton & discours

- Vitrine sobre : **pas de tunnel de vente**, pas de faux chiffres, pas de rareté
  artificielle, un seul point de contact discret.
- Bénéfices concrets pour un commerçant, zéro jargon technique.
- Les réalisations sont la preuve ; elles se montrent, elles ne s'argumentent pas.

## Patterns à implémenter / implémentés

- [x] Galerie de vraies réalisations (screenshots cliquables des sites live)
- [x] **Double marquee des réalisations** (haut → droite, bas → gauche, pause au survol) — `work-section.tsx` / CSS `.wmq*`
- [x] **Section mobile « 2×2 téléphones superposés »** (versions mobiles des sites) — `mobile-section.tsx` / CSS `.phones*`, captures dans `public/img/mobile/`
- Animations d'apparition au scroll (fondu + décalage), `prefers-reduced-motion` respecté.

## Anti-patterns (à ne JAMAIS refaire)

- Dégradés de fond, halos, glow (rejetés explicitement).
- Palettes vertes/kraft/terracotta (explorées puis rejetées).
- « Devis gratuit » répété, stats inventées (+38 %…), badges de rareté.
- Bandeau de secteurs qui défile en boucle comme seul élément vivant (jugé « IA »).
- Proposer des directions sorties de nulle part : toujours ancrer dans une référence réelle.
