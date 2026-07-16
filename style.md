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

## DA actuelle (validée)

- **Fond cobalt vibrant, APLAT strict** : `--bg:#2231d8`, bandes `--bg2:#2c3de6`.
  **Jamais de dégradé.** Texte `#f1f3ff`, soft `#cdd3fc`, muted `#aab1f0`,
  lignes `#4257ec`, accent `#c6cfff`.
- **Typos** : Syne (titres, 700/800), Instrument Serif italique (mots-accents),
  Schibsted Grotesk (corps). Interdits : Inter, Space Grotesk (génériques).
- **Héros** : texte à gauche, **portrait de Jules à droite** (photo = incarnation
  de la marque, remplacer `public/img/jules.jpg`). Côte à côte dès 760px.
- Chiffres romains en MAJUSCULES (I, II, III, IV) — jamais i/ii/iii (effet bug).

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
