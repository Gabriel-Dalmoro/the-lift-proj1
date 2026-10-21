import Descent from "./Descent";
import EtSi from "./EtSi";
import Logo from "./Logo";
import Photo from "./Photo";
import Reveal from "./Reveal";

// Titles and texts are Sabrina’s own words from the brief, trimmed to a few lines per step.
const STEPS: { n: string; title: string; text: string[] }[] = [
  {
    n: "01",
    title: "Avant : le client est déjà attendu",
    text: [
      "Chaque réservation fait l’objet d’un appel de confirmation : connaître le motif de la visite, identifier une éventuelle occasion particulière, accompagner le client dans son arrivée et lui conseiller où stationner.",
    ],
  },
  {
    n: "02",
    title: "L’arrivée : créer le premier lien",
    text: ["Un accueil nominatif et chaleureux. Chaque client doit ressentir qu’il était attendu."],
  },
  {
    n: "03",
    title: "Le service : les codes du luxe, la spontanéité en plus",
    text: [
      "Des équipes formées aux techniques de service haut de gamme, avec une posture élégante, une attention permanente et une vraie connaissance des produits.",
      "Mais sans discours récité, sans rigidité et sans distance inutile.",
    ],
  },
  {
    n: "04",
    title: "L’addition : un moment à réinventer",
    text: [
      "Transformer l’encaissement en dernier moment de service : présentation soignée de l’addition, échange sur l’expérience vécue et remerciement sincère.",
    ],
  },
  {
    n: "05",
    title: "Le départ : prolonger le plaisir",
    text: [
      "Chaque client repart avec une attention : quelques madeleines à l’amaretto, préparées par notre cuisine et offertes au moment du départ.",
      "Une petite surprise gourmande, simple, élégante et mémorable.",
    ],
  },
  {
    n: "06",
    title: "J+1 : le lien continue",
    text: [
      "Le lendemain, chaque client ayant accepté ce type de contact reçoit un message personnel faisant référence à un échange ou à un moment de sa soirée, accompagné d’une invitation à partager son avis.",
      "L’objectif n’est pas d’envoyer un SMS générique, mais de montrer que nous nous souvenons réellement de lui.",
    ],
  },
];

/** A realistic phone showing the next-day message from The Lift. The message text is
 *  blurred on purpose: it reads as a real conversation without inventing her wording. */
function MessagePhone() {
  const blurred = "select-none [filter:blur(3px)]";
  return (
    <div className="relative mt-10 w-[248px]" aria-label="Un smartphone affichant un message personnalisé du Lift">
      {/* Side buttons */}
      <span className="absolute -left-[3px] top-[96px] h-[26px] w-[3px] rounded-l bg-[#3a3a3c]" />
      <span className="absolute -left-[3px] top-[140px] h-[46px] w-[3px] rounded-l bg-[#3a3a3c]" />
      <span className="absolute -left-[3px] top-[196px] h-[46px] w-[3px] rounded-l bg-[#3a3a3c]" />
      <span className="absolute -right-[3px] top-[156px] h-[74px] w-[3px] rounded-r bg-[#3a3a3c]" />

      {/* Titanium frame, black bezel, screen */}
      <div className="rounded-[46px] bg-gradient-to-br from-[#6e6e73] via-[#2c2c2e] to-[#58585c] p-[3px] shadow-[0_34px_60px_-12px_rgba(42,30,22,0.45),0_12px_24px_-8px_rgba(42,30,22,0.3)]">
        <div className="rounded-[43px] bg-black p-[9px]">
          <div className="relative flex h-[500px] flex-col overflow-hidden rounded-[35px] bg-white font-sans text-black">
            {/* Status bar and Dynamic Island */}
            <div className="flex h-11 shrink-0 items-center justify-between px-6 pt-1 text-[13px] font-semibold tracking-tight">
              <span>10:12</span>
              <span className="flex items-center gap-1.5">
                <svg viewBox="0 0 18 12" className="h-[10px] w-[16px]" aria-hidden>
                  <rect x="0" y="8" width="3" height="4" rx="0.8" fill="currentColor" />
                  <rect x="5" y="5.5" width="3" height="6.5" rx="0.8" fill="currentColor" />
                  <rect x="10" y="3" width="3" height="9" rx="0.8" fill="currentColor" />
                  <rect x="15" y="0" width="3" height="12" rx="0.8" fill="currentColor" />
                </svg>
                <svg viewBox="0 0 16 12" className="h-[10px] w-[14px]" aria-hidden>
                  <path d="M8 11.5 5.6 9a3.4 3.4 0 0 1 4.8 0L8 11.5Z" fill="currentColor" />
                  <path d="M3.4 6.8a6.5 6.5 0 0 1 9.2 0l-1.4 1.4a4.5 4.5 0 0 0-6.4 0L3.4 6.8Z" fill="currentColor" />
                  <path d="M1.2 4.6a9.6 9.6 0 0 1 13.6 0l-1.4 1.4a7.6 7.6 0 0 0-10.8 0L1.2 4.6Z" fill="currentColor" />
                </svg>
                <svg viewBox="0 0 27 13" className="h-[11px] w-[24px]" aria-hidden>
                  <rect x="0.5" y="0.5" width="23" height="12" rx="3.5" fill="none" stroke="currentColor" opacity="0.4" />
                  <rect x="2" y="2" width="17" height="9" rx="2" fill="currentColor" />
                  <path d="M25 4.5v4a2 2 0 0 0 0-4Z" fill="currentColor" opacity="0.45" />
                </svg>
              </span>
            </div>
            <span className="absolute left-1/2 top-[9px] h-[26px] w-[86px] -translate-x-1/2 rounded-full bg-black" />

            {/* Conversation header */}
            <div className="relative flex shrink-0 flex-col items-center gap-1 border-b border-black/[0.08] bg-[#f9f9f9] pb-2 pt-1">
              <span className="absolute left-3 top-3 text-[26px] leading-none text-[#0a84ff]">‹</span>
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-b from-[#1f4a35] to-jungle shadow-inner">
                <Logo className="w-7 text-cream" cable={0} />
              </span>
              <span className="text-[11px] text-black/80">The Lift ›</span>
            </div>

            {/* Messages */}
            <div className="flex-1 space-y-2 bg-white px-3 pt-4">
              <p className="pb-1 text-center text-[10px] font-medium text-black/40">Aujourd’hui 10:12</p>
              <div className="max-w-[82%] rounded-[18px] rounded-bl-[6px] bg-[#e9e9eb] px-3 py-2 text-[13px] leading-snug">
                <span className={blurred}>Bonjour Claire, merci encore pour votre belle soirée d’anniversaire au Lift hier.</span>
              </div>
              <div className="max-w-[82%] rounded-[18px] rounded-bl-[6px] bg-[#e9e9eb] px-3 py-2 text-[13px] leading-snug">
                <span className={blurred}>Nous espérons que le gâteau surprise vous a plu. Votre avis nous ferait plaisir.</span>
              </div>
              <div className="ml-auto max-w-[70%] rounded-[18px] rounded-br-[6px] bg-[#0a84ff] px-3 py-2 text-[13px] leading-snug text-white">
                <span className={blurred}>Merci à toute l’équipe, quelle soirée !</span>
              </div>
              <p className="pr-1 text-right text-[10px] text-black/40">Distribué</p>
            </div>

            {/* Input bar and home indicator */}
            <div className="shrink-0 px-3 pb-6 pt-2">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#e9e9eb] text-[16px] leading-none text-black/50">+</span>
                <span className="flex-1 rounded-full border border-black/15 px-3 py-1 text-[12px] text-black/35">iMessage</span>
              </div>
            </div>
            <span className="absolute bottom-2 left-1/2 h-[4px] w-[100px] -translate-x-1/2 rounded-full bg-black" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Hospitality() {
  return (
    <section data-chapter="Hospitality" className="relative text-ink">
      {/* Night into morning */}
      <div className="h-[35svh] bg-gradient-to-b from-night via-[#6b5a48] to-cream" />

      <div className="bg-cream">
        <div className="flex min-h-[85svh] items-center justify-center px-5 pb-12">
          <EtSi className="text-ink">
            Et si le véritable luxe était simplement de se sentir attendu, reconnu et considéré&nbsp;?
          </EtSi>
        </div>

        <div className="mx-auto max-w-2xl space-y-8 px-6 pb-24 text-center">
          <Reveal>
            <p className="font-serif text-xl font-light leading-relaxed text-ink/85 sm:text-2xl">
              J’imagine une hospitalité sincère et généreuse, inspirée des plus belles maisons, où les codes du luxe
              rencontrent la spontanéité, le sourire et la simplicité.
            </p>
          </Reveal>
          <Reveal>
            <p className="font-serif text-xl font-light leading-relaxed text-ink/85 sm:text-2xl">
              Tout commence avant l’arrivée, par un appel personnalisé, et se poursuit à travers une multitude de petites
              attentions&nbsp;: un accueil qui crée du lien, un service élégant sans être guindé, une surprise gourmande à
              emporter, un message le lendemain qui rappelle un instant partagé.
            </p>
          </Reveal>
        </div>

        <Photo
          src="/images/hosp-welcome.webp"
          alt="Une serveuse souriante accueille une cliente"
          className="mx-auto aspect-[4/3] w-[calc(100%-2.5rem)] max-w-5xl rounded-sm sm:aspect-[16/9]"
          sizes="(min-width: 1024px) 1024px, 100vw"
          captionClass="text-cream/80"
        />

        {/* The six steps on a thin brass thread */}
        <div className="mx-auto max-w-5xl px-5 py-24 sm:py-32">
          <ol className="relative ml-3 border-l border-brass/60 sm:ml-6">
            {STEPS.map((s, i) => (
              <Reveal as="li" key={s.n} delay={i * 0.04} className="relative pb-12 pl-8 last:pb-0 sm:pl-14">
                <span className="absolute -left-[5px] top-3 h-[9px] w-[9px] rounded-full bg-brass ring-4 ring-cream" />
                <span className="block font-serif text-4xl font-light text-brass sm:text-5xl">{s.n}</span>
                <h3 className="mt-1 font-sans text-sm font-medium uppercase leading-relaxed tracking-[0.18em] text-ink sm:text-base">
                  {s.title}
                </h3>
                {s.text.map((t) => (
                  <p key={t} className="mt-3 max-w-xl font-serif text-lg italic leading-relaxed text-ink/75 sm:text-xl">
                    {t}
                  </p>
                ))}
                {s.n === "05" && (
                  <Photo
                    src="/images/hosp-madeleines.webp"
                    alt="Des madeleines dorées sur un plat, à côté d’une théière"
                    className="mt-6 aspect-[3/2] w-full max-w-xl rounded-sm"
                    sizes="(min-width: 640px) 576px, 90vw"
                    parallax={5}
                  />
                )}
                {s.n === "06" && <MessagePhone />}
              </Reveal>
            ))}
          </ol>
        </div>

        <div className="mx-auto max-w-3xl px-6 pb-16 text-center">
          <Reveal>
            <p className="text-balance font-serif text-2xl font-light leading-snug text-ink sm:text-4xl">
              Notre ambition n’est pas d’offrir le service le plus parfait de Lyon, mais celui qui procure le plus
              d’émotions.
            </p>
          </Reveal>
        </div>
        <Descent />
      </div>
    </section>
  );
}
