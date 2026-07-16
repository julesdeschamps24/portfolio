# style.md - Le style du site (référence permanente)

> Source de vérité du goût de Jules et de la DA du site. **À lire avant TOUTE
> proposition visuelle.** Le style décrit ici n'est plus une exploration : c'est
> celui du site en ligne, validé le 2026-07-16. On s'y conforme, on ne le
> rediscute pas sans raison.

## 1. Le principe n°1 : du réel, pas du « style IA »

Jules rejette ce qui « fait IA » : compositions génériques, promesses creuses,
chiffres inventés, tunnels de vente. **Toute proposition visuelle doit s'appuyer
sur un pattern observé dans le CSS d'un vrai site en ligne**, cf.
`mockups/references-sites-reels.html` (42 sites vérifiés). Montrer la référence
réelle AVANT de coder. Une idée « sortie de nulle part » est refusée d'office,
même bonne.

## 2. La méthode : mesurer, ne pas juger à l'œil

C'est ce qui a tranché toutes les décisions difficiles de ce projet. À appliquer
systématiquement dès qu'il y a du texte sur une image ou une matière :

1. **Masquer le texte**, capturer le fond seul, mesurer sa luminance.
2. Calculer le contraste contre la couleur du texte, garder le **pire point**,
   pas la moyenne.
3. Comparer au seuil : **4.5:1** (texte courant), **3:1** (gros texte).

Un fond photo n'est jamais garantissable « à l'œil » : il varie. Plusieurs idées
séduisantes sont mortes de cette mesure (cf. anti-patterns). Outil :
`Page.captureScreenshot` via le protocole DevTools, en amenant la zone à l'écran
par un `body.marginTop` négatif plutôt qu'en défilant (les captures de page
défilée sortent corrompues dans cet environnement).

## 3. Références validées

- **vanholtz.co** ⭐ LA référence globale :
  - **Pattern « téléphones »** (/work/studiomega) : 2 groupes de 2 iPhones
    superposés, montrant les versions mobiles. Reproduit tel quel.
  - **Pattern « double marquee »** : les vignettes défilent sur deux rangées,
    **haut vers la droite, bas vers la gauche**. C'est LE mode de présentation
    des réalisations.
- **dennissnellenberg.com** ★ héros photo plein cadre + la révélation au scroll.
- **k72.ca** ★ volet plein qui tombe sur les liens de nav (non retenu, mais la
  mécanique est propre).
- **quentinhocde.com** ★ le trait qui traverse (retenu, cf. §6).
- **wadeandleta.com** ★ le groupe de liens dont l'opacité réagit (retenu, cf. §6).
- **alt-web.fr** ★ même métier (dev solo → TPE) : CTA plein (retenu), avis Google.
- **lmscom.fr** ★ display + serif italique sur fond sombre chaleureux.
- **viens-la.com** ★ couleur pleine + typo massive, mot rotatif du héros.

**Constat 2026-07-16** : les concurrents directs français (vibe-studio.fr,
comdartisans.fr, studioatable.fr, com-local.com, ryadstudio.com) ne font **rien**
au survol qu'un changement de couleur. Le moindre geste travaillé distingue déjà.
Inutile de viser le spectaculaire.

## 4. La DA « Os & encre »

- **Palette** (réf. vanholtz.co) : fond `--bg:#f1f0ea`, bande `--bg2:#e7e5dd`,
  encre `--text:#16150f`, `--soft:#57544a`, `--muted2:#666357`, lignes
  `--line2:#d9d6cb`, accent `--acc:#16150f`.
- **APLAT STRICT, jamais de dégradé.** Seule exception tolérée : le voile posé
  **sur une photo** (§5). Un voile sur photo n'est pas un fond dégradé.
- **Typos** : Syne (titres, 700/800), Instrument Serif italique (mots-accents),
  Schibsted Grotesk (corps). **Interdits : Inter, Space Grotesk.**
- **Contraste AA obligatoire.** `--muted2:#666357` est un plancher, ne pas
  l'éclaircir. Placeholders en `--soft`. Erreurs de formulaire en `#8c2f24` sur
  `rgba(180,60,50,.12)`.
- **Jamais de tiret long** (`—`, `–`), nulle part : code, contenu, commits, docs.
  Reformuler avec une virgule ou un point.
- **Chiffres romains en MAJUSCULES** (I, II, III, IV), jamais i/ii/iii.
  **Et jamais à petite taille** : testés à 11px dans la nav, II/III/IV se lisent
  « ıı/ııı/ıv ». Réservés aux gros corps, comme la section Services.

## 5. Le héros

- **Texte : mot rotatif** (réf. viens-la.com) : « Des sites sur-mesure pour les
  *paysagistes. / praticiens. / artisans. / commerçants. / indépendants.* », le
  mot en Instrument Serif italique qui roule toutes les 2600 ms.
  **PAS de 3ᵉ ligne** : le titre s'arrête sur le mot rotatif. Dessous : chips de
  faits réels + boutons sobres.
- **Photo plein cadre** : `public/img/hero-atelier.jpg` (mains d'artisan +
  établi, choisie parmi 14 dans `mockups/hero-photos.html`), en `next/image fill
  priority`, `grayscale(1) contrast(1.05)`.
- **Le héros inverse la DA** : fond encre, texte crème. C'est la **seule** section
  sombre du site.
- **Il doit REMPLIR l'écran** : `min-height:100svh`, contenu centré, filet +
  scroll-cue en pied.
- **L'entête est transparente au-dessus de lui** (`.site-header--over`) et
  redevient crème dès 40px de scroll. Le héros remonte dessous via
  `margin-top: calc(var(--header-h) * -1)`. **`--header-h` est partagée entre les
  deux** : ne jamais remettre une valeur en dur, elles dériveraient et une ligne
  crème réapparaîtrait en haut de page. Le filet de l'entête est en `box-shadow`
  et non en `border`, pour ne pas ajouter 1px à sa hauteur de flux.
- **Voile : NE JAMAIS L'ALLÉGER SANS REMESURER.** C'est le point de contraste le
  plus fragile du site. Valeurs mesurées :
  - desktop `linear-gradient(90deg, .93 → .80 à 45% → .42)` : fort à gauche sous
    le texte, léger à droite où la photo respire. Le stop droit **ne descend pas
    sous .42** (à .34, la fin du titre tombait à 3.20:1).
  - **mobile ≤900px : voile VERTICAL** `linear-gradient(180deg, .42 → .68 à 28%
    → .92 à 44% → .94)`. Le voile horizontal y laissait le texte à 2.4-2.6:1,
    parce qu'il occupe toute la largeur.
  - `.hero-foot` porte son propre aplat `rgba(22,21,15,.55)` : sans lui, son
    texte 13px tombe à 3.0:1.
- **Jointure vers la suite : « Révélation »** (réf. dennissnellenberg.com,
  maquette `mockups/seam-options.html` option F). La coupe franche photo → crème
  était jugée trop brutale. Le héros est en `position: sticky; top:0; z-index:0`,
  le contenu glisse par-dessus.
  **Conséquences à ne pas casser** : toute section de la home doit être **opaque
  et `z-index: 2`** ; la règle de fond doit rester **avant** `.studio .band`, qui
  gagne son `--bg2` par l'ordre source. Neutralisé sous `prefers-reduced-motion`.
  La référence utilise un scroll virtuel (lib) : **refusé**, ça coûte en perf et
  en accessibilité, deux choses que l'offre vend. `position: sticky` suffit.
- **Pas de portrait de Jules dans le héros.** Sa photo vit dans la bulle de la
  section Contact.
- Le héros étant `sticky`, son `offsetTop` renvoie sa position **visuelle**, pas
  sa place dans le flux : un retour « en haut » doit viser `0` en dur, jamais un
  calcul d'offset.

## 6. La navbar (arrêtée le 2026-07-16)

- **Marque : « Jules Deschamps » seul.** Pas de descriptif, pas de ville.
- **Liens : le trait qui traverse** (réf. quentinhocde.com). Le trait est un
  `background-image` ancré à **droite** au repos ; **seule la taille est animée**.
  La position saute, la taille glisse : le trait entre par la gauche et **ressort
  par la droite**. Ne jamais transitionner `background-position`, ça casse
  l'effet. Garder `background-position` en Y à `100%` : au-delà
  (`calc(100% + Npx)`) le trait sort de la zone de peinture et disparaît ;
  l'écart au texte se règle en `padding-bottom`.
- **Liens : les autres reculent** (réf. wadeandleta.com). Au survol d'un lien,
  ses voisins passent à `opacity: .55` et lui reste net. Sous
  `@media (hover: hover)` : rien ne se déclenche au doigt.
  **Le .55 est mesuré** : les liens estompés restent des liens lisibles, à
  4.98:1 au-dessus du héros. **Ne pas descendre sous .55** (à .4, plus joli, ils
  tombaient à 3.75:1).
- **CTA plein** (réf. alt-web.fr) : pastille bordée, aplat + texte inversé au
  survol (14.61:1). C'est le seul point de contact du site, il doit peser. Sous
  `.site-header--over`, c'est `border-color` qu'on inverse, pas
  `border-bottom-color`.

## 7. Sections et patterns implémentés

- [x] **Double marquee des réalisations** (haut → droite, bas → gauche, pause au
  survol) - `work-section.tsx`, CSS `.wmq*`. **La piste contient 3 jeux de cartes
  et se décale d'UN jeu (-33.3333%)** : avec 2 jeux et -50%, un seul jeu devait
  couvrir l'écran à lui seul, ce que 5 cartes ne font plus au-delà de ~2100px.
  Ne pas repasser à -50% sans remettre 2 jeux ET assez de cartes.
- [x] **Asana dans le marquee**, en boucle. La vidéo est **coupée sur la seule
  animation du héros** (4.27s ; le défilement du site commence à 4.3s), avec un
  fondu de sortie de 0.45s vers le noir pour que la boucle ne flashe pas.
  Ré-encodée VP9 800px : 348 Ko contre 12 Mo en VP8 1913px. La lecture est
  pilotée par `IntersectionObserver` et **non** par `autoPlay` ni par un `play()`
  au montage : Chrome met en pause les vidéos hors écran et ne les relance pas si
  la lecture a été demandée à la main, la carte serait restée figée.
- [x] **Section mobile « 2×2 téléphones superposés »** - `mobile-section.tsx`,
  CSS `.phones*`. **Un groupe = UN site** : son accueil devant, sa page contact
  derrière. Le cadre a le **ratio d'écran d'un iPhone (393×852), coque comprise**,
  et rend lui-même les deux bandes : barre d'état (54/852 = **6.34%**) et
  indicateur d'accueil (34/852 = **3.99%**). Les captures ne couvrent donc que la
  **zone de contenu**, en 500×972. La barre d'état prend la couleur du haut de
  chaque capture, relevée sur l'image et passée en variable CSS.
- [x] Galerie de vraies réalisations (screenshots cliquables des sites live).
- [x] Animations d'apparition au scroll, `prefers-reduced-motion` respecté.

## 8. Offre (contenu contractuel)

- **Jules ne propose PAS de suivi/maintenance.** Services = 3 : Design & identité,
  Site sur-mesure, Visible localement. Ne jamais promettre hébergement, mises à
  jour ou maintenance.
- **Marque : « Jules Deschamps », créateur de sites internet indépendant.** Le mot
  « studio » est abandonné (« ça peut faire un peu trop »). La classe CSS
  `.studio` est un simple scope, elle ne compte pas.
- **Ne jamais ancrer la marque à une ville** : Jules va beaucoup bouger. On dit
  « sites livrés partout en France ». Les villes des **clients** dans les
  réalisations restent.
- La photo de Jules vit dans une **bulle sur la section Contact** :
  `public/img/jules.jpg` (400×400). L'originale est dans
  `assets-src/photo-source.png` (hors `public/`, gitignorée).

## 9. Ton & discours

- Vitrine sobre : **pas de tunnel de vente**, pas de faux chiffres, pas de rareté
  artificielle, un seul point de contact discret.
- Bénéfices concrets pour un commerçant, zéro jargon technique.
- Les réalisations sont la preuve ; elles se montrent, elles ne s'argumentent pas.
- Les chiffres affichés doivent être **vérifiables**. « 10 sites en ligne » a été
  vérifié : les 10 sous-domaines répondent. Le jour où ça change, le chiffre change.

## 10. Anti-patterns (à ne JAMAIS refaire)

- **Dégradés de fond, halos, glow.** Rejetés explicitement.
- **Liquid glass / verre translucide sur le texte.** Demandé, construit, **mesuré,
  écarté** le 2026-07-16 (`mockups/navbar-options.html`, options F/H/I) :
  au-dessus du héros, une capsule de verre **claire** ne floute pas un fond
  gênant, elle **éclaircit** un voile déjà sombre et fait tomber le libellé de
  9.24:1 à **3.36:1**. Sur le crème, le verre n'a **rien à réfracter** et un gris
  moyen ne passe ni avec un texte crème (3.88:1) ni avec un texte encre (4.13:1).
  Et la vraie réfraction (`backdrop-filter: url()`) n'existe **que sur Chromium** :
  rien sur Safari, donc rien sur iPhone. Si l'envie revient : la seule version qui
  tenait était la capsule teintée **encre** (7.59:1), mais elle n'a pas été retenue.
- **Palettes vertes/kraft/terracotta** (explorées puis rejetées).
- **Cobalt vibrant** (ancienne DA, abandonnée : « couleurs plus sobres »).
- « Devis gratuit » répété, stats inventées (+38 %…), badges de rareté.
- Bandeau de secteurs qui défile en boucle comme seul élément vivant (jugé « IA »).
- **Changer la palette pour régler un problème de composition** : la coupe du
  héros aurait été la même en d'autres teintes. « Os & encre » a demandé plusieurs
  allers-retours, on ne la rouvre pas pour un problème qui n'est pas chromatique.
- Proposer des directions sorties de nulle part : toujours ancrer dans une
  référence réelle.

## 11. Les maquettes (`mockups/`)

Ce sont les traces figées des explorations : **ne pas les réécrire**, même pour
corriger un vieux nom ou un tiret. Elles documentent ce qui a été vu et validé.

- `references-sites-reels.html` - les 42 sites vérifiés. Le point de départ de
  toute proposition.
- `hero-brainstorm.html` - le choix du texte du héros (mot rotatif).
- `hero-photos.html` - les 14 photos, dont l'atelier retenu.
- `hero-fourni.html` - les mises en scène du héros (photo plein cadre retenue).
- `seam-options.html` - la jointure héros → suite (F « révélation » retenue).
- `navbar-options.html` - les survols de nav (D « trait qui traverse » + E « les
  autres reculent » + CTA plein retenus ; liquid glass mesuré et écarté).
