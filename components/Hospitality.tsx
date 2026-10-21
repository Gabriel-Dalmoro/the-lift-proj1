import EtSi from "./EtSi";
import Photo from "./Photo";
import Reveal from "./Reveal";

const STEPS: { n: string; title: string; text?: string }[] = [
  { n: "01", title: "Avant : le client est déjà attendu" },
  { n: "02", title: "L'arrivée : créer le premier lien" },
  { n: "03", title: "Le service : les codes du luxe, la spontanéité en plus" },
  { n: "04", title: "L'addition : un moment à réinventer" },
  {
    n: "05",
    title: "Le départ : prolonger le plaisir",
    text: "Chaque client repart avec une attention : quelques madeleines à l'amaretto, préparées par notre cuisine et offertes au moment du départ.",
  },
  {
    n: "06",
    title: "J+1 : le lien continue",
    text: "L'objectif n'est pas d'envoyer un SMS générique, mais de montrer que nous nous souvenons réellement de lui.",
  },
];

export default function Hospitality() {
  return (
    <section data-chapter="Hospitality" className="relative text-ink">
      {/* Night into morning */}
      <div className="h-[35svh] bg-gradient-to-b from-night via-[#6b5a48] to-cream" />

      <div className="bg-cream">
        <div className="flex min-h-[85svh] items-center justify-center px-5 pb-20">
          <EtSi className="text-ink">
            Et si le véritable luxe était simplement de se sentir attendu, reconnu et considéré&nbsp;?
          </EtSi>
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
                {s.text && (
                  <p className="mt-3 max-w-xl font-serif text-lg italic leading-relaxed text-ink/75 sm:text-xl">{s.text}</p>
                )}
                {s.n === "05" && (
                  <Photo
                    src="/images/hosp-madeleines.webp"
                    alt="Des madeleines dorées sur un plat, à côté d'une théière"
                    className="mt-6 aspect-[3/2] w-full max-w-xl rounded-sm"
                    sizes="(min-width: 640px) 576px, 90vw"
                    parallax={5}
                  />
                )}
              </Reveal>
            ))}
          </ol>
        </div>

        <div className="mx-auto max-w-3xl px-6 pb-32 text-center sm:pb-40">
          <Reveal>
            <p className="text-balance font-serif text-2xl font-light leading-snug text-ink sm:text-4xl">
              Notre ambition n'est pas d'offrir le service le plus parfait de Lyon, mais celui qui procure le plus
              d'émotions.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
