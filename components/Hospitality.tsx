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

/** A phone showing a message from The Lift. The lines stay abstract: no invented wording. */
function MessagePhone() {
  return (
    <div className="mt-8 w-[220px] rounded-[2.2rem] bg-[#1d1915] p-2.5 shadow-[0_24px_50px_rgba(42,30,22,0.3)]">
      <div className="overflow-hidden rounded-[1.8rem] bg-[#f7f1e8]">
        <div className="flex flex-col items-center gap-1.5 border-b border-ink/10 bg-white/60 pb-3 pt-6">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-jungle">
            <Logo className="w-6 text-cream" cable={0} />
          </span>
          <span className="text-[10px] font-medium text-ink/70">The Lift</span>
        </div>
        <div className="space-y-3 px-3.5 pb-8 pt-5">
          <span className="block text-center text-[9px] uppercase tracking-[0.2em] text-ink/40">J+1</span>
          <div className="w-[85%] space-y-1.5 rounded-2xl rounded-bl-md bg-white px-3 py-3 shadow-sm">
            <span className="block h-1.5 w-full rounded-full bg-ink/15" />
            <span className="block h-1.5 w-[92%] rounded-full bg-ink/15" />
            <span className="block h-1.5 w-[70%] rounded-full bg-ink/15" />
          </div>
          <div className="w-[60%] space-y-1.5 rounded-2xl rounded-bl-md bg-white px-3 py-3 shadow-sm">
            <span className="block h-1.5 w-full rounded-full bg-ink/15" />
            <span className="block h-1.5 w-[55%] rounded-full bg-ink/15" />
          </div>
          <div className="ml-auto w-[45%] rounded-2xl rounded-br-md bg-jungle px-3 py-3">
            <span className="block h-1.5 w-full rounded-full bg-cream/40" />
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
