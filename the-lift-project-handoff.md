# The Lift: vision site, project handoff

Prepared 21 October 2026 for a new build session.
Builder: Gabriel Dalmoro. Client: Sabrina (Gabriel's mother-in-law).

---

## 1. TL;DR (read this first)

- **What:** a private, image-led, single scrolling web page that shows the owner of The Lift (Yoann) Sabrina's vision for repositioning the venue.
- **Current scope:** the **short version**, a single page, not the full four-chapter site.
- **Deadline:** Sabrina presents to Yoann on **Thursday 22 October 2026 at 10:00**. Send her the link by **08:30** (09:00 at the latest) so she can check it before the meeting.
- **Build window:** tonight (Wednesday 21 October), stop around midnight to 1 am, then polish from about 06:30 to 08:30.
- **Language of the site:** French. Use her copy verbatim (section 6).
- **Stack:** Next.js + Tailwind CSS, scroll animation library, private hosting with password and noindex.
- **Not in scope:** booking tools, forms, message sending, customer database, public website, SEO.
- **Price:** €600 for the short version, paid on 30 October 2026. If Yoann wants the full site, the €600 counts towards the €1,500 full project.

Placeholders for material to add below: the full brief from her email (section 11) and any new constraints (section 12).

---

## 2. Context

### The Lift

- A rooftop restaurant and bar on the 8th floor in Lyon.
- Owner: **Yoann** (and his team).

### Sabrina

- Freelance **transition manager**, currently on a mission at The Lift.
- She has told Yoann that if the concept doesn't move in the direction she recommends, she probably won't stay. Yoann answered, roughly: "OK, show me. Show me what you have in mind."
- This site is her answer. It must make her vision **tangible, beautiful and professional** so Yoann can truly imagine the transformation.
- She genuinely wants to stay at The Lift and lead the transformation. The stakes for her are personal: her role there depends partly on this pitch.
- She is paying personally.

### Audience

- **One reader: Yoann.** Not customers. Not the public.
- She will show it in the meeting (phone or laptop) and may send him the link afterwards.

### Separate project, not in scope

- Sabrina also has a separate idea: a platform to show her transition-management clients the progress on their restaurants and bars. She has spreadsheets ready. It is **completely separate** from this site. Do not build anything for it now.

---

## 3. Project history and decisions (what was agreed)

1. Sabrina sent a detailed four-page brief in French (to be pasted in section 11).
2. Gabriel originally scoped a full four-chapter site at a family rate of €1,500 (normal rate €2,500), with a timeline of several days, and a proposal and contract were drafted.
3. Her presentation date then moved forward to **tomorrow at 10:00**, so the full site was no longer possible in time.
4. Agreed instead: a **short version** tonight and tomorrow morning, for **€600**, paid on **30 October 2026**, credited towards the €1,500 full site if Yoann wants it.
5. Possible next steps after the meeting:
   - A refined version of the short page that Sabrina can send Yoann as a follow-up.
   - The full four-chapter site, if Yoann is interested (plan in section 9).
   - If Yoann validates the vision, a real production website for The Lift would be a separate project.

---

## 4. Hard constraints

### Content

- **French only.** Use her text verbatim. Do not rewrite her copy. Shortening by selecting her own sentences is fine.
- One unfinished sentence in her brief: "certaine servie" (page 2, menu format). Do not use it, and do not guess its meaning.
- The three dishes are **examples**, not a final menu. If shown, label them "Pistes d'incarnation du concept".
- **No invented facts:** no invented distillery name, no invented Chef name, no invented prices beyond those in her brief.

### Scope

- No forms, booking tools, message-sending systems or customer database (stated explicitly in her brief).
- It is a vision presentation, not software.

### Images

- The site shows **what The Lift could become, not what it looks like today**. Sabrina confirmed that photos of the current venue are not needed.
- A photo of the real **view from the rooftop** or the **lift arrival** would help anchor the vision in the actual place, if she sends one.
- Use **licensed stock photos** and **AI-generated concept images**.
- Label generated images with a small caption: **"Visuel d'illustration"**.
- Her reference sites are **mood inspiration only**. Never use their photos:
  - Twentysix Budapest (jungle restaurant)
  - darahlam.com and thierryteyssier.com (hospitality mood)
- Give all images the same **warm colour grade** so stock and generated images look like one place.

### Privacy and access

- **Private link only**, protected by a password.
- **noindex** so search engines never list it.
- The brief contains internal figures: the plant budget (€1,200 to €2,000 excl. VAT per month) and a 32% beverage cost target. Leave them out of the short version unless Sabrina asks for them.

### Practical

- **Mobile-first.** It must look great and load fast on a phone, and also work on a laptop.
- Images are the heaviest part: compress them (WebP or AVIF) and size them properly.
- **Sound:** optional only, off by default. Auto-playing audio in a meeting can backfire. For the short version, skip sound unless time allows.

---

## 5. The short version: page structure

One continuous scroll, in this order. Each block is roughly one or two screens.

| # | Block | What's on screen |
| --- | --- | --- |
| 0 | Password gate | Simple password screen. Nice-to-have: styled as a lift panel with one button marked "8" |
| 1 | Lift arrival | Closed brass lift doors fill the screen, a floor counter rises to 8, the doors slide open |
| 2 | Ambiance | Full-screen urban jungle restaurant, her first "Et si" question, two lines, closing line |
| 3 | Food | Warm, abundant shared table, her "Et si" question, the culinary promise, one line |
| 4 | Wines & cocktails | Evening bar light, her subtitle, three big statements, the cocktail "Et si" question |
| 5 | Hospitality | Soft cream background, her "Et si" question, the six steps as a compact list, her ambition line |
| 6 | Closing | Her final hospitality sentence alone on screen, then a quiet end card |

**End card:** the lift doors closing softly, with "The Lift". Adding "une vision de Sabrina" is a good idea but **ask her first**.

**The thread of the site:** each chapter opens with one of her "Et si…" questions, full screen, in large serif type. That repetition is the site's signature and makes it feel like one voice: hers.

**The light journey:** the colour shifts gradually through the scroll so it reads as one visit:

| Block | Moment | Light and colour |
| --- | --- | --- |
| Ambiance | Arriving | Lush green, late afternoon |
| Food | Sharing at the table | Golden hour, terracotta and amber |
| Wines & cocktails | The evening goes on | Night, deep amber, bar light |
| Hospitality | Leaving, and the next day | Soft cream, gentle morning light |

---

## 6. Copy for the short version (verbatim from her brief)

Use these exact lines. Typographic apostrophes are fine.

### Block 2: Ambiance

- Question: **Et si, au cœur de la ville, nous pouvions nous offrir le luxe de nous évader sans partir ?**
- À huit étages de l'agitation lyonnaise, j'imagine un lieu où la nature reprend ses droits, une jungle urbaine luxuriante, une oasis culinaire où le temps semble suspendu.
- Dès l'ouverture de l'ascenseur, tout commence : une lumière, une fragrance végétale, une vibration musicale… Les sens s'éveillent, les repères s'effacent et l'on pénètre dans un autre monde.
- Closing line: **Un ailleurs inattendu, sans jamais quitter Lyon.**
- Optional keywords (from the brief): Jungle urbaine · Oasis culinaire · Évasion · Immersion · Dépaysement

### Block 3: Food

- Question: **Et si nous réinventions l'art de partager les grands classiques de la cuisine française ?**
- Promise: **Une cuisine française à partager, relevée d'un accent italien.**
- Dix propositions, dont quatre créations signatures fortes, imaginées autour de produits nobles, d'associations surprenantes et d'une véritable valeur ajoutée gastronomique. Des plats que l'on ne vient déguster qu'au Lift.

### Block 4: Wines & cocktails

- Title: **VINS & COCKTAILS : L'ART DE LA DÉCOUVERTE**
- Subtitle: Des vins qui voyagent, des cocktails qui racontent une histoire.
- Three big statements:
  - **100 VINS À MOINS DE 90 €**
  - **4 CRÉATIONS EXCLUSIVES × 1 DISTILLATEUR LOCAL**
  - **LE COCKTAIL DE VOS RÊVES**
- Question: **Et si le plus beau cocktail était celui qui n'existe pas encore ?**
- Optional closing: Notre ambition : faire du Lift un lieu où l'on ne revient pas pour retrouver toujours la même chose, mais pour avoir le plaisir d'être surpris à chaque fois.

### Block 5: Hospitality

- Question: **Et si le véritable luxe était simplement de se sentir attendu, reconnu et considéré ?**
- The six steps (titles only for the short version):
  1. 01 — AVANT : LE CLIENT EST DÉJÀ ATTENDU
  2. 02 — L'ARRIVÉE : CRÉER LE PREMIER LIEN
  3. 03 — LE SERVICE : LES CODES DU LUXE, LA SPONTANÉITÉ EN PLUS
  4. 04 — L'ADDITION : UN MOMENT À RÉINVENTER
  5. 05 — LE DÉPART : PROLONGER LE PLAISIR (amaretto madeleines offered at departure)
  6. 06 — J+1 : LE LIEN CONTINUE (personal message the next day)
- Ambition line: Notre ambition n'est pas d'offrir le service le plus parfait de Lyon, mais celui qui procure le plus d'émotions.

### Block 6: Closing

- **Parce qu'au fond, nos clients oublieront peut-être ce qu'ils ont commandé, mais jamais la façon dont nous les avons fait se sentir.**

---

## 7. Design system

### The feel

Every chapter of her brief asks for the same thing: **warm and premium, never stiff or cold.** She rejects classic fine dining twice.

| Chapter | Her words |
| --- | --- |
| Ambiance | luxuriant, dépaysant, spectaculaire, immersif. "Ne pas faire les choses à moitié." |
| Food | vivante, premium, chaleureuse, appétissante, généreuse, élégante sans être froide |
| Wines & cocktails | visuelle, élégante, dynamique; artisanal, créatif, premium |
| Hospitality | sensible, élégante, humaine, chaleureuse |

Her key instruction for page 1 applies to the whole site: **make the concept felt far more than explained.**

### Palette

- Deep jungle green (main dark tone, chapter 1)
- Warm cream or off-white (reading sections, hospitality)
- Terracotta and amber (warmth, food)
- Brass or soft gold accent (lift doors, numbers, cocktails, hospitality thread)

### Typography

- Headlines and "Et si" questions: an elegant serif with character, such as Fraunces, Cormorant Garamond or Playfair Display
- Body text: a clean sans-serif, such as Inter or DM Sans
- The three drinks statements and the numbers 100 and 90 € are displayed very large

### Imagery

- Warm light, evening and golden hour, lots of greenery, real hands and gestures, smiles, abundance
- Avoid: white-tablecloth fine dining, empty rooms, cold blue light, classic dusty wine cellars

### Motion

- Slow and organic: fade-and-rise reveals, gentle parallax, nothing bouncy
- Signature moment: the lift doors opening
- Animation supports the mood and never slows reading

### Navigation

- For the short version: no menu needed, just the scroll
- Nice-to-have: a small floor indicator like a lift display showing progress

---

## 8. Build plan for tonight

### Order

1. Project setup, fonts, colours, scroll structure, password protection, noindex
2. Lift arrival and ambiance (most important for the first impression, hardest images)
3. Food
4. Wines & cocktails
5. Hospitality and closing
6. Colour transitions between blocks
7. Before sleeping: the whole page must exist end to end, even if parts are rough
8. Morning: polish, compress images, test on phone and laptop, fix bugs, deploy

### Never cut

- The lift doors opening
- The ambiance hero image
- Her "Et si" questions and the closing sentence

### Simplify first if short on time

- Password gate: plain password screen instead of the lift panel
- Hospitality: the six steps as a simple list instead of an animated timeline
- Colour transitions: a hard cut between sections instead of a gradual blend
- Keywords and floor indicator: drop them

### Before handing over at 08:30

- Test on a phone and a laptop
- Record a short screen video of the full scroll as a backup in case the Wi-Fi fails in the meeting
- Send Sabrina the link, the password and the video

---

## 9. Stack

- **Next.js** (App Router) + **Tailwind CSS**
- **Framer Motion** or **GSAP ScrollTrigger** for scroll animations
- **Lenis** for smooth scrolling (optional)
- **next/font** for Google Fonts
- **next/image** with WebP or AVIF images, properly sized
- Hosting: Vercel or similar, protected by a password (platform protection or simple middleware), with `noindex` meta and `X-Robots-Tag` header
- Images in the repo, no external image hosts at runtime

---

## 10. Later: the full four-chapter site (only if Yoann wants it)

Planned as one scrolling story in four chapters, with a chapter menu and the same design system. Price: €1,500 family rate (normal €2,500), minus the €600 already paid.

### Chapter 1: Ambiance, "Une oasis culinaire au 8e étage"

- Brief requires: large opening photo of a spectacular urban jungle; a gallery inspired by Twentysix Budapest; staging of the lift arrival and the three senses (visual, sound, scent); the five keywords; a small box with the solution (long-term plant rental from La Palmeraie de la Tour for the 150 m² indoor room) and the indicative budget (€1,200 to €2,000 excl. VAT per month); her full text.
- Flow: lift doors, hero and question, text in short beats with big images, three senses panels, keywords band, horizontal gallery, solution card, closing line.
- Wow: lift doors plus layered foreground foliage moving faster than the background.
- Optional ambient sound button, off by default.

### Chapter 2: Food, "L'art de partager"

- Brief requires: the French tapas with Italian accent promise; photos of generous shared tables, plates in the middle, abundance; menu format (about 10 dishes, 4 signatures, premium but accessible, unique in Lyon); three example dishes; the Chef given a face; her full text.
- Example dishes: Les Gougères des Sommets (gougères cacio e pepe, poivre noir, pecorino); Tartare à l'italienne (bœuf, parmigiano, câpres, truffe blanche d'Alba en saison, noisette du Piémont, focaccia préparée à table pour 2 ou 3); Croque Monsieur du Lift (mortadelle, taleggio, pistache).
- Positioning (from brief): premium rooftop destination for after-work, team meals, and business lunches from spring. Opening 17:30 to midnight at first, then 4 days a week noon to midnight from spring. Confirm with Sabrina before showing hours.
- Wow: a top-down table that fills with plates as you scroll. Fallback: a dish grid revealing one by one.
- Open question: who the Chef is, and whether there's a photo.

### Chapter 3: Wines & cocktails, "L'art de la découverte"

- Brief requires: three sections, each with a strong title, one large photo and short text.
- Block 1, 100 wines under €90: contemporary cellars, original bottles, sommeliers with guests; big graphic 100 and 90 €; no classic cellar codes; no traditional wine list, the sommelier guides each guest; selection renewed regularly.
- Block 2, 4 cocktails × 1 local distiller: crafted cocktails, mixology, stills; placeholder for partner name and logo.
- Block 3, the cocktail of your dreams: bartender creating in front of a guest; already tested at The Lift with great success.
- Wow: the 100 counts up as it enters the screen; an animated guest and bartender conversation in speech bubbles, ending with a cocktail reveal (animation only, no input).
- Confirm whether the 32% BEV cost and the possible €70 threshold should appear.

### Chapter 4: Hospitality, "L'art de recevoir"

- Brief requires: a timeline of six numbered steps from reservation to the next day, each with an emotional photo and a few words; light scroll animations; special emphasis on the departure gift and the next-day message; a big concluding sentence; no forms or tools.
- Step details (from brief):
  1. Before: a confirmation call for every reservation to learn the reason for the visit, spot any special occasion, help with arrival and parking.
  2. Arrival: a warm welcome by name; the person who seats guests starts a real conversation.
  3. Service: high-end service techniques with elegance and product knowledge, but no recited speeches or stiffness.
  4. The bill: an elegant holder, a chat about the experience, a sincere thank-you.
  5. Departure: a small bag of handmade amaretto madeleines; the hostess updates the guest file (Cardex).
  6. D+1: a personal message referring to a moment of the evening, with an invitation to share feedback, only for guests who agreed.
- Wow: the timeline is a thin gold thread that becomes the ribbon on the madeleine bag at step 5, then leads to a phone where the next-day message types itself in (static animation only).

### Open questions for the full version

- The unfinished sentence "certaine servie"
- The Chef's identity and photo
- Which internal numbers Yoann should see (plant budget, BEV cost, opening hours)
- Whether to add "une vision de Sabrina" on the end card
- Logo and brand colours of The Lift, and a photo of the rooftop view

---

## 11. Full brief from Sabrina

PAGE 1 — L'AMBIANCE : UNE OASIS CULINAIRE AU 8ᵉ ÉTAGE
Le concept
Transformer les 150 m² de salle intérieure du Lift en une véritable jungle urbaine, une oasis culinaire suspendue au-dessus de Lyon.

À l'heure où les citadins recherchent un contact avec la nature sans renoncer à l'effervescence de la ville, je souhaite créer un lieu luxuriant, dépaysant et spectaculaire.

Mon parti pris : ne pas faire les choses à moitié. Quelques plantes ne suffiront pas. Je veux une végétation abondante, enveloppante, presque exubérante, qui transforme radicalement l'identité du lieu.

L'inspiration visuelle
Référence principale : Twentysix Budapest

Gabriel, je souhaite que cette première page soit avant tout visuelle, avec plusieurs grandes photographies de restaurants-jungles et d'oasis urbaines.

L'idée est que Yoann comprenne immédiatement l'ambiance et l'ampleur de la transformation envisagée.

Une immersion dès l'ouverture de l'ascenseur
L'expérience commence avant même d'entrer dans le restaurant.

À l'ouverture de l'ascenseur au 8ᵉ étage, le client doit avoir la sensation de pénétrer dans un autre monde.

Je souhaite travailler sur trois dimensions :

Le visuel : une végétation spectaculaire dès l'entrée.

Le sonore : une ambiance musicale et des sons évoquant subtilement la nature.

L'olfactif : une signature parfumée végétale, discrète et reconnaissable, diffusée dans le sas.

L'objectif : créer une rupture immédiate avec l'environnement urbain et une expérience mémorable.

La réalisation
Prestataire envisagé : La Palmeraie de la Tour

Location longue durée de plantes naturelles pour végétaliser les 150 m² de salle intérieure.

Budget estimatif provisoire : 1 200 à 2 000 € HT/mois, sous réserve d'un devis précis et des prestations incluses.

Ce que je souhaite sur cette page
Une page très immersive, avec :

Une grande photographie d'ouverture montrant une jungle urbaine spectaculaire.

Une galerie de photographies inspirées de Twentysix Budapest.

Une mise en scène visuelle de l'arrivée par l'ascenseur et de l'expérience sensorielle.

Quelques mots-clés : Jungle urbaine — Oasis culinaire — Évasion — Immersion — Dépaysement.

Un petit encart présentant la solution envisagée et le budget indicatif.

Cette page doit faire ressentir le concept bien davantage que l'expliquer.

Voic le texte pour cette partie : 

Et si, au cœur de la ville, nous pouvions nous offrir le luxe de nous évader sans partir ?

À huit étages de l'agitation lyonnaise, j'imagine un lieu où la nature reprend ses droits, une jungle urbaine luxuriante, une oasis culinaire où le temps semble suspendu.

Dès l'ouverture de l'ascenseur, tout commence : une lumière, une fragrance végétale, une vibration musicale… Les sens s'éveillent, les repères s'effacent et l'on pénètre dans un autre monde.

Plus qu'un restaurant, je souhaite imaginer un lieu de vie et d'émotions, où l'on vient autant pour savourer que pour ressentir, partager et prolonger l'instant.

Un ailleurs inattendu, sans jamais quitter Lyon.

PAGE 2 — LA CARTE FOOD
Le concept
Je souhaite imaginer pour The Lift une offre de tapas françaises à partager, avec un twist italien.

L'idée est de conserver l'esprit du partage, de la convivialité et du rooftop, mais avec une identité culinaire plus forte, plus désirable et plus singulière.

La promesse culinaire :
Une cuisine française à partager, relevée d’un accent italien.

L'objectif
Faire de The Lift une destination rooftop premium, à la fois :

élégante,

chaleureuse,

conviviale,

adaptée aux afterworks,

aux repas d’équipe,

aux déjeuners d’affaires à partir du printemps.

Dans un premier temps, j’imagine une ouverture le soir de 17h30 à minuit.
Puis, dès le printemps, faire évoluer le concept sur 4 jours par semaine en service continu du midi à minuit.

Le format de la carte
Une carte courte, lisible et impactante :

environ 10 plats

dont 4 plats signatures très forts

des assiettes pensées pour être partagées et certaine servie 

une cuisine premium mais accessible

une identité que l’on ne retrouve pas ailleurs à Lyon

Exemples de plats à mettre en avant
Les Gougères des Sommets
Gougères cacio e pepe, poivre noir, pecorino

Tartare à l’italienne
Bœuf, parmigiano, câpres, truffe blanche d’Alba en saison, noisette du Piémont
servi avec une focaccia préparée à table, à partager pour 2 ou 3 personnes

Croque Monsieur du Lift
Mortadelle, taleggio, pistache

Ces propositions sont des pistes d’incarnation du concept, pas encore une carte figée.

Ce que je souhaite sur cette page
Une page très gourmande et très visuelle, qui donne immédiatement envie de venir manger au Lift.

Je veux que Gabriel mette :

des photos de tables généreuses, remplies de plats à partager

des assiettes au centre de la table

une sensation d’abondance, de partage et de convivialité

des images qui donnent envie de commander plusieurs plats pour goûter, partager, trinquer et prolonger la soirée

L'univers visuel attendu
Je ne veux pas une esthétique de restaurant gastronomique figé.
Je veux une ambiance :

vivante

premium

chaleureuse

appétissante

généreuse

élégante sans être froide

Les visuels doivent montrer que l’on vient au Lift autant pour l’expérience que pour ce qu’il y a dans l’assiette.

Message clé de la page
La carte food doit être pensée comme un pilier du repositionnement du Lift.

Elle doit permettre de faire comprendre à Yoann que nous ne sommes plus sur une offre banale de rooftop, mais sur une vraie proposition de destination :
un lieu où l’on vient pour partager une cuisine de caractère, dans un cadre fort, avec une identité claire.

Voici le texte pour cette partie 

Et si nous réinventions l'art de partager les grands classiques de la cuisine française ?

J'imagine une carte courte et audacieuse, où les incontournables de notre patrimoine culinaire se réinventent en petites assiettes généreuses, relevées d'un accent italien.

Dix propositions, dont quatre créations signatures fortes, imaginées autour de produits nobles, d'associations surprenantes et d'une véritable valeur ajoutée gastronomique. Des plats que l'on ne vient déguster qu'au Lift.

Le spectacle se prolonge jusqu'à la table : certaines assiettes sont dressées, découpées ou finalisées devant les convives, transformant le service en un moment de partage et d'émotion.

Au cœur de cette identité, notre Chef. Je souhaite lui donner un visage, une signature et une place centrale dans l'expérience, car une cuisine qui marque les esprits est avant tout une cuisine qui raconte la personnalité et le savoir-faire de celui qui la crée.

Une cuisine de caractère, vivante et généreuse, où le plaisir de partager devient une expérience à part entière.

PAGE 3 — VINS & COCKTAILS
Objectif : Présenter trois concepts forts qui constitueront la nouvelle identité boissons du Lift.

Cette page doit être visuelle, élégante et dynamique. Elle doit donner à Yoann une compréhension immédiate de notre nouveau positionnement.

BLOC 1 — 100 VINS À MOINS DE 90 €
Message principal à afficher en grand :
100 VINS À MOINS DE 90 €

Direction visuelle :

Photographies de caves contemporaines, de bouteilles originales et de sommeliers échangeant avec leurs clients.

Mise en avant graphique du chiffre 100 et du prix 90 €.

Univers élégant, chaleureux, vivant, sans les codes traditionnels d'une cave classique.

Concept à illustrer :

Une sélection de 100 vins français et internationaux, renouvelée régulièrement.

Pas de carte des vins traditionnelle : le sommelier accompagne chaque client selon ses goûts, ses envies et son budget.

L'idée est que le client puisse découvrir de nouvelles cuvées à chacune de ses visites.

Objectif économique : maintenir un BEV Cost de 32 %.

Le seuil de 70 € pourra être étudié après validation des prix d'achat.

BLOC 2 — 4 COCKTAILS, 1 DISTILLATEUR LOCAL
Message principal à afficher :
4 CRÉATIONS EXCLUSIVES × 1 DISTILLATEUR LOCAL

Direction visuelle :

Photographies de cocktails contemporains très travaillés.

Gestes de mixologie, distillation artisanale, ingrédients bruts et alambics.

Univers artisanal, créatif et premium.

Concept à illustrer :

Quatre cocktails exclusifs imaginés en collaboration avec un distillateur local.

Un partenariat qui associe création de recettes, valorisation du savoir-faire régional et communication croisée entre les deux établissements.

Prévoir un emplacement pour intégrer ultérieurement le nom et le logo du partenaire.

BLOC 3 — LE COCKTAIL DE VOS RÊVES
Message principal à afficher :
LE COCKTAIL DE VOS RÊVES

Direction visuelle :

Photographies d'un barman en pleine création devant un client.

Gestes précis, ingrédients frais, verrerie originale.

Mise en scène de l'échange entre le client et le barman.

Concept à illustrer :

Le client ne choisit pas une recette : il raconte ce qu'il aime.

À partir de quelques questions sur ses préférences, notre barman imagine et réalise un cocktail unique, créé minute.

Ce concept est déjà testé au Lift et rencontre un excellent accueil.

CONSIGNES TECHNIQUES POUR LA PAGE
Structure recommandée :

Titre général : VINS & COCKTAILS — L'ART DE LA DÉCOUVERTE.

Trois sections visuelles successives, une par concept.

Pour chaque section : un titre fort, une grande photographie et un court texte de présentation.

Texte à écrire 
Des vins qui voyagent, des cocktails qui racontent une histoire.

100 vins à moins de 90 € — Une cave sans frontières
Et si nous oubliions les cartes des vins traditionnelles pour redonner toute sa place à la rencontre et à la découverte ?

J'imagine une sélection de 100 vins à moins de 90 €, venus de France et des quatre coins du monde. Une cave vivante, jamais figée, où chaque visite devient une nouvelle invitation au voyage.

Nos sommeliers deviennent les guides de cette expérience : quelques mots sur vos envies, une fourchette de prix, et laissez-vous surprendre.

Une promesse accessible et différenciante, construite autour d'un objectif économique clair : maintenir un BEV Cost de 32 %, sans renoncer à la qualité ni à la découverte.

4 créations exclusives — L'esprit d'une collaboration locale
Associer notre créativité à celle d'un distillateur de la région pour imaginer quatre cocktails que l'on ne retrouvera qu'au Lift.

Une rencontre entre deux savoir-faire, des créations singulières et un partenariat qui se prolonge au-delà du verre, à travers des événements, des découvertes et une communication commune.

Le cocktail de vos rêves — Une expérience unique
Et si le plus beau cocktail était celui qui n'existe pas encore ?

Pas de recette imposée. Notre barman prend le temps de découvrir vos goûts, vos envies, vos souvenirs de saveurs, puis imagine devant vous un cocktail créé spécialement pour cet instant.

Une expérience spontanée, humaine et personnalisée, que nous expérimentons déjà avec un immense succès auprès de nos clients.

Notre ambition : faire du Lift un lieu où l'on ne revient pas pour retrouver toujours la même chose, mais pour avoir le plaisir d'être surpris à chaque fois.

PAGE 4 — HOSPITALITY : L'ART DE RECEVOIR
Objectif de la page
Présenter notre nouvelle philosophie de service à travers les différentes étapes du parcours client.

Faire comprendre à Yoann que notre ambition n'est pas d'offrir le service le plus formel de Lyon, mais l'accueil le plus chaleureux, le plus personnalisé et le plus mémorable.

Direction artistique
Références :

https://www.darahlam.com/

https://www.thierryteyssier.com/

Une esthétique sensible, élégante, humaine et chaleureuse.

Privilégier des photographies de gestes d'attention, de sourires, de rencontres et de détails raffinés plutôt que des images de service gastronomique trop cérémonieux.

Structure visuelle — Un parcours en 6 étapes
01 — AVANT : LE CLIENT EST DÉJÀ ATTENDU

Photo : un accueil personnalisé ou une réservation préparée avec soin.

Chaque réservation fait l'objet d'un appel de confirmation : connaître le motif de la visite, identifier une éventuelle occasion particulière, accompagner le client dans son arrivée et lui conseiller où stationner.

02 — L'ARRIVÉE : CRÉER LE PREMIER LIEN

Photo : une hôtesse souriante accueillant personnellement des clients.

Un accueil nominatif et chaleureux. Chaque client doit ressentir qu'il était attendu. La personne qui l'accompagne à table engage une véritable conversation, transmet une information ou crée un premier moment de complicité.

03 — LE SERVICE : LES CODES DU LUXE, LA SPONTANÉITÉ EN PLUS

Photo : un serveur présentant une assiette, une finition de plat devant les clients ou un sommelier partageant une découverte.

Des équipes formées aux techniques de service haut de gamme, avec une posture élégante, une attention permanente et une vraie connaissance des produits.

Mais sans discours récité, sans rigidité et sans distance inutile.

04 — L'ADDITION : UN MOMENT À RÉINVENTER

Photo : une addition présentée dans un élégant étui, accompagnée d'une attention personnalisée.

Transformer l'encaissement en dernier moment de service : présentation soignée de l'addition, échange sur l'expérience vécue et remerciement sincère.

05 — LE DÉPART : PROLONGER LE PLAISIR

Photo : un petit sachet élégant de madeleines artisanales à l'amaretto, noué avec un ruban ou personnalisé aux couleurs du Lift.

Chaque client repart avec une attention : quelques madeleines à l'amaretto, préparées par notre cuisine et offertes au moment du départ.

Une petite surprise gourmande, simple, élégante et mémorable.

L'hôtesse enrichit ensuite le fichier client (Cardex) avec les informations pertinentes de la soirée : occasion célébrée, préférences exprimées, retour sur l'expérience.

06 — J+1 : LE LIEN CONTINUE

Visuel : un smartphone présentant un message personnalisé du Lift.

Le lendemain, chaque client ayant accepté ce type de contact reçoit un message personnel faisant référence à un échange ou à un moment de sa soirée, accompagné d'une invitation à partager son avis.

L'objectif n'est pas d'envoyer un SMS générique, mais de montrer que nous nous souvenons réellement de lui.

Recommandations techniques pour la page
Une seule page organisée comme une frise chronologique du parcours client.

Six étapes numérotées, de la réservation à J+1.

Chaque étape associée à une photographie émotionnelle et quelques mots d'explication.

Des animations légères au défilement pour révéler progressivement le parcours.

Une mise en valeur particulière du cadeau de départ et du message personnalisé.

Une grande phrase de conclusion sur l'hospitalité.

Important : il s'agit d'une présentation de la stratégie de service et non d'un logiciel de gestion client. Aucun formulaire, outil de réservation ou système d'envoi de messages n'est à développer pour cette maquette.

Message à transmettre
Nous voulons que chacun reparte du Lift avec le sentiment d'avoir été considéré, reconnu et sincèrement accueilli.

Notre luxe ne sera pas dans la distance ou le protocole. Il sera dans l'attention portée à chaque personne.

Texte de la page 
Et si le véritable luxe était simplement de se sentir attendu, reconnu et considéré ?

J'imagine une hospitalité sincère et généreuse, inspirée des plus belles maisons, où les codes du luxe rencontrent la spontanéité, le sourire et la simplicité.

Tout commence avant l'arrivée, par un appel personnalisé, et se poursuit à travers une multitude de petites attentions : un accueil qui crée du lien, un service élégant sans être guindé, une surprise gourmande à emporter, un message le lendemain qui rappelle un instant partagé.

Notre ambition n'est pas d'offrir le service le plus parfait de Lyon, mais celui qui procure le plus d'émotions.

Parce qu'au fond, nos clients oublieront peut-être ce qu'ils ont commandé, mais jamais la façon dont nous les avons fait se sentir.

--

---

## 12. New constraints (to add)

> Add any new constraints here.
