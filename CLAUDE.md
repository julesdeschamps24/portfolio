# CLAUDE.md — Studio — Jules Deschamps (site vitrine)

Ce dépôt est le site vitrine du studio web de Jules Deschamps. Ce fichier donne le contexte
durable et les règles à respecter dans toute session de travail.

## 1. Le projet & positionnement

**« Studio — Jules Deschamps »** — un studio web. Ce dépôt est le **site vitrine du studio**,
conçu comme un **outil commercial** : il doit donner envie à des commerces et artisans locaux
de me confier la création de leur site.

> **Nom de marque : « Studio — Jules Deschamps » partout.** L'ancien nom « Node4 » est
> abandonné (y compris, à terme, dans les mentions légales).

### Cap actuel — on démarre la refonte
Le contenu présent dans le code (ancien portfolio qui me présentait comme **développeur**)
**ne doit pas servir de référence** : il visait un autre objectif et un autre public. On change
de secteur cible — on repart de zéro sur le positionnement studio web ci-dessous.

### Objectif
**Vendre des sites web aux commerces & artisans locaux.** Ce n'est plus un portfolio de dev :
c'est l'outil commercial d'un studio web.

### Message central
« Je crée des sites pour les commerces et indépendants locaux. » Parler **bénéfices et
résultats** (plus de clients, plus de visibilité, une image pro et rassurante), **pas la stack
technique**. Les compétences techniques (C/C++, etc.) disparaissent ou passent au second plan :
un commerçant s'en moque.

### Cibles
- **Artisans / BTP** : plombiers, électriciens, menuisiers, paysagistes…
- **Commerces & indépendants** : boutiques, coachs, photographes, thérapeutes…
- **Zone** : France entière / francophone.

### Offre & approche commerciale — VITRINE SOBRE (arbitré le 2026-06-27)
Offre de fond : maquette **gratuite** → visio → prestation **one-shot** ; **indexation Google +
fiche Google Business incluses**. **MAIS** : pas de pub/ads pour l'instant, donc **le site ne doit
PAS être un tunnel de conversion**. On privilégie une **vitrine sobre** qui séduit par sa qualité
(la galerie de réalisations est la pièce maîtresse). Concrètement : **pas de « devis gratuit »
matraqué sur chaque page, pas de prix ni d'offre affichés en gros, pas de tactiques de rareté** —
juste **un seul point de contact discret** (« parlons de votre projet »).

### Ton de marque
**Pro & rassurant** : sérieux, fiable, qui inspire confiance à un commerçant prudent.

### Fondateur
Jules Deschamps, formé au développement à l'**école 42** — gage de crédibilité, mais **pas
l'argument de vente principal**.

## 2. Règles permanentes

À respecter **dans toute session** sur ce projet :

- **Email de contact** — toujours `contact@julesdeschamps.dev` (contact, mentions légales,
  `mailto:`, JSON-LD, footer, signatures). **Ne jamais exposer** `julesdeschamps24@gmail.com`
  (déjà redirigé vers cette Gmail via ImprovMX). Remplacer toute occurrence trouvée.
- **Ne pas déployer sans validation** — faire les modifs + la vérif en local, présenter,
  puis **attendre le « ok » explicite de Jules** avant tout `vercel deploy` ou push déclenchant
  un déploiement.
- **Design original & distinctif** — création soignée et distinctive, **jamais un template
  générique** « déjà vu ».
- **Tout en français**, ton **pro & rassurant**, orienté **bénéfices/résultats** — pas de
  jargon technique (le visiteur est un commerçant, pas un dev).
- **Tester en local au fur et à mesure** — `npm run dev`, vérifier le rendu visuel **avant**
  de présenter quoi que ce soit.
- **Montrer du concret avant de coder en grand** — proposer 2-3 directions visuelles et les
  **montrer en local** (pas juste les décrire) ; valider la direction avant de tout construire.
- **Images / médias vérifiés** — pas d'image cassée : à défaut de visuels clients, utiliser du
  stock et **toujours vérifier le HTTP 200** d'une URL avant de l'employer.
- **Responsive + accessible + SEO de base** — mobile d'abord, accessible, balises propres
  (l'indexation Google fait partie de l'offre).
- **Ne jamais exposer de secrets** — ne pas committer `.env.local` ni les identifiants HubSpot ;
  passer par `.env.example`.
- **Confirmer avant toute action lourde ou destructive** — suppressions de fichiers, refontes
  massives : demander avant.

## 3. Stack & commandes

- **Framework** : Next.js 16, App Router (`next ^16.0.10`)
- **UI** : React 19 (`react`/`react-dom` 19.2.1) + TypeScript 5
- **Styles** : Tailwind CSS v4 (`@tailwindcss/postcss`) + `tw-animate-css`
- **Composants** : shadcn/ui (`components.json`) — Radix (`@radix-ui/react-slot`),
  `class-variance-authority`, `clsx`, `tailwind-merge`, icônes `lucide-react`
- **Animations** : `framer-motion` (transitions/sections), `three` (shader de fond),
  `@tsparticles/*` (sparkles de l'intro)
- **Validation** : `zod` (formulaire de contact)
- **Lint** : ESLint 9 (`eslint-config-next`)

### Commandes
- `npm install` — installer les dépendances
- `npm run dev` — serveur de dev local (à utiliser pour vérifier le rendu)
- `npm run build` — build de production
- `npm run start` — servir le build
- `npm run lint` — ESLint

## 4. Repères dans le code

**Pages (App Router — `app/`)**
- `app/page.tsx` — page d'accueil : assemble les sections de la home
- `app/layout.tsx` — layout racine ; `app/globals.css` — thème & variables CSS
- Routes : `app/a-propos`, `app/competences`, `app/projets`, `app/contact`,
  `app/mentions-legales`, `app/politique-confidentialite`, `app/demo` (démo de composants)
- `app/api/contact/route.ts` — endpoint du formulaire de contact
- SEO : `app/manifest.ts`, `app/robots.ts`, `app/sitemap.ts`

**Composants (`components/`)**
- `navigation.tsx`, `footer.tsx`, `cookie-banner.tsx`, `error-boundary.tsx`
- `sections/` — sections de la home : `intro-section`, `home-section`, `projects-section`,
  `skills-section`, `about-section`, `contact-section` (+ `section-header.tsx`, `index.ts`)
- `contact-form.tsx` + `hubspot-script.tsx` — formulaire de contact (HubSpot)
- `video-card.tsx`, `typewriter-text.tsx`
- `ui/` — primitives : `button`, `liquid-glass-button`, `sparkles`,
  `web-gl-shader` (= **le fond animé**)

**Données & utilitaires (`lib/`)**
- `data.ts` — données du site (« projets »/vidéos, compétences) — **contenu à refondre**
- `constants.ts` — constantes (config HubSpot…)
- `social-links.ts`, `utils.ts`, `utils/scroll.ts`
- `hooks/` — `use-competences`, `use-cookie-consent`, `use-intro`

**Assets** : `public/img`, `public/vid`

## 5. Env / secrets

Le formulaire de contact utilise **HubSpot**. Variables nécessaires (voir `.env.example`) :

- `NEXT_PUBLIC_HUBSPOT_PORTAL_ID`
- `NEXT_PUBLIC_HUBSPOT_FORM_GUID`

- Les valeurs réelles vivent dans **`.env.local`** (non versionné) — **ne jamais le committer
  ni exposer les identifiants**.
- Où les trouver : HubSpot > Marketing > Formulaires.

## 6. Analyse de l'existant (cartographie au 2026-06-27)

Le code est encore l'**ancien portfolio développeur** ; rien n'est refondu. Ce qui s'y trouve réellement :

- **Accueil** (`app/page.tsx`) : `Intro` (sparkles three/tsparticles + nom) → `Home` (typewriter « Bienvenue sur mon portfolio ») → `Projects` (2 vidéos) → `Skills` → `About` → `Contact`. Thème **sombre**, fond = **shader WebGL** three.js (full-canvas, bridé à 15 fps, **coûteux**).
- **Orienté dev** : `skills-section` liste HTML/JS/TS/React/Node/Next + **C/C++** ; `about-section` insiste « École 42 / systèmes » ; `projects-section` = motion design (Asana + **Sport Avenue**), pas des sites.
- **Pages** : `/a-propos` (bio dev), `/competences` (techno), `/projets` (vidéos), `/demo` (test de composants, interne), `/contact`, `/mentions-legales` (SIRET 994 400 232 00017, 38 rue des Lilas 16800 Soyaux), `/politique-confidentialite`.
- **Design system** (`globals.css`) : tokens shadcn **neutres** (gris OKLCH), clair/sombre, **aucune couleur de marque**. Polices **Geist**.
- **SEO** (`layout.tsx`) : title « Développeur Web Freelance », JSON-LD `Person` `jobTitle: Développeur`, `knowsAbout` inclut C/C++. `sitemap.ts` expose `/demo` et `/competences`.

**Sain → à conserver (juste re-styler)** : la chaîne contact HubSpot (`contact-form` + `api/contact` + `hubspot-script` + `cookie-banner` ; Zod + honeypot + consentement + CSP), les headers de sécurité (`next.config.ts`), l'échafaudage SEO, les pages légales. Bon point : `contact@julesdeschamps.dev` est **déjà** utilisé dans les pages légales (aucun Gmail en dur détecté).

## 7. Audit du plan de refonte

### Retirer / remplacer
- **Sport Avenue** : `lib/data.ts` + `public/vid/sport_avenue.webm`.
- **Skills** + page `/competences` + **C/C++** (`lib/data.ts`) — hors-sujet pour un commerçant.
- **Bio « École 42 / systèmes »** (`about-section`, `/a-propos`) → réécrire « studio / qui suis-je ».
- **Fond WebGL** (`ui/web-gl-shader`) → fond plein ⇒ on peut **retirer `three`**.
- **Intro sparkles** → simplifier/supprimer ⇒ on peut **retirer `@tsparticles/*`**.
- **`/demo`** (interne) → supprimer + sortir du `sitemap.ts`.
- **Vidéo Asana** comme « projet » : motion design ≠ site → réutiliser ailleurs ou retirer (à décider).

### Ajouter
- Vitrine **Réalisations** avec **placeholders** « votre réalisation ici » (aucun vrai exemple client pour l'instant — principal manque de contenu).
- Sections **Services**, **Approche/principes**, **bandeau de secteurs**.
- Discours réécrit (bénéfices, pro & rassurant). Voir point de cohérence CTA ci-dessous.

### SEO / contenu à mettre à jour
- `layout.tsx` : title/description/keywords → studio (création de sites pour commerces locaux).
- **JSON-LD** : passer de `Person/Développeur` à un positionnement studio ; retirer C/C++ ; garder adresse/SIRET.
- `manifest.ts` : name « Portfolio » → studio ; `theme_color` à aligner sur la DA.
- Chercher toute occurrence de l'ancien nom **« Node4 »** (à abandonner, cf. §1) et de l'email Gmail.

### DA validée en session
Fond **cobalt vibrant APLAT** (`--bg:#2231d8` · `--bg2:#2c3de6` · `--text:#f1f3ff` · `--soft:#cdd3fc` · `--muted:#aab1f0` · `--line:#4257ec` · `--acc:#c6cfff`), typos **Syne** (titres) + **Instrument Serif** italique (accents) + **Schibsted Grotesk** (corps). Sections studio : hero → bandeau → réalisations (index, aperçu au survol) → services → approche/principes → contact. Réf. : `mockups/cobalt-explorer.html` (pastille « Cobalt vibrant »).

### Points de cohérence — ARBITRÉS le 2026-06-27
1. **Approche commerciale** : ✅ **VITRINE SOBRE** retenue (pas de funnel, contact discret) — cf. §1 mis à jour. Pas de « devis gratuit » répété, pas d'offre/prix affichés en gros.
2. **Marque** : ✅ **« Studio — Jules Deschamps »** partout. Les maquettes (logo « Deschamps® ») sont à aligner sur ce nom lors du build.
3. **Ton vs DA** : ✅ **cobalt vibrant validé** en session. À garder à l'œil pour que ça reste « pro & rassurant ».

### Ordre de chantier proposé
0. Branche dédiée ; confirmer env HubSpot ; valider les suppressions.
1. **Design system** : DA cobalt dans `globals.css` ; polices Syne / Instrument Serif / Schibsted Grotesk dans `layout.tsx` (retirer Geist) ; re-styler `navigation` + `footer`.
2. **Sections accueil** : hero, bandeau, réalisations (placeholders), services, approche/principes, contact (réutiliser le form, re-styler) ; retirer Intro/Skills/About/Projects.
3. **Nettoyage** : Sport Avenue + assets, `/competences`, `/demo`, C/C++, `three` + `@tsparticles` + `web-gl-shader` + `sparkles`.
4. **Contenu & SEO** : metadata, JSON-LD, sitemap, manifest, branding pages légales, règle email.
5. **QA** : `npm run build` + `lint`, mobile/responsive, accessibilité, Lighthouse, test formulaire de bout en bout.
