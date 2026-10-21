import EtSi from "./EtSi";
import Photo from "./Photo";
import Reveal from "./Reveal";

export default function Food() {
  return (
    <section data-chapter="La carte" className="relative text-cream">
      {/* Green to golden hour */}
      <div className="h-[30svh] bg-gradient-to-b from-jungle via-[#3a2a14] to-[#3b1d10]" />

      <div className="bg-[#3b1d10]">
        <div className="flex min-h-[90svh] items-center justify-center px-5 pb-24">
          <EtSi className="text-[#f8e6cc]">
            Et si nous réinventions l'art de partager les grands classiques de la cuisine française&nbsp;?
          </EtSi>
        </div>

        <Photo
          src="/images/food-hero.webp"
          alt="Des amis trinquent autour d'une table garnie, à la lueur des bougies"
          className="h-[80svh] w-full"
          parallax={10}
          overlay="bg-gradient-to-b from-[#3b1d10] via-transparent to-[#3b1d10]"
        />

        <div className="mx-auto max-w-4xl px-6 py-28 text-center sm:py-40">
          <Reveal>
            <p className="mb-6 text-[11px] uppercase tracking-[0.35em] text-amber">La promesse culinaire</p>
          </Reveal>
          <Reveal delay={0.1}>
            <p
              className="text-balance font-serif text-[2rem] font-light italic leading-[1.15] text-[#f8e6cc] sm:text-6xl"
              style={{ fontVariationSettings: '"opsz" 144, "SOFT" 80' }}
            >
              Une cuisine française à partager, relevée d'un accent italien.
            </p>
          </Reveal>
        </div>

        {/* Abundance: plates in the middle of the table */}
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-3 px-3 sm:gap-4 sm:px-6">
          <Reveal className="col-span-2">
            <Photo
              src="/images/food-table.webp"
              alt="Vue du dessus d'une grande table couverte d'assiettes à partager"
              className="aspect-[16/10] w-full rounded-sm"
              sizes="(min-width: 1152px) 1152px, 100vw"
            />
          </Reveal>
          <Reveal delay={0.05}>
            <Photo
              src="/images/food-hands.webp"
              alt="Des mains se servent dans des plats posés au centre"
              className="aspect-[4/5] w-full rounded-sm"
              sizes="50vw"
              position="40% center"
            />
          </Reveal>
          <Reveal delay={0.15}>
            <Photo
              src="/images/food-cheers.webp"
              alt="Un groupe d'amis trinque autour de plats partagés"
              className="aspect-[4/5] w-full rounded-sm"
              sizes="50vw"
              position="35% center"
            />
          </Reveal>
        </div>

        <div className="mx-auto max-w-2xl px-6 pb-36 pt-24 text-center sm:pb-48">
          <Reveal>
            <p className="font-serif text-xl font-light leading-relaxed text-[#f3dcbc] sm:text-2xl">
              Dix propositions, dont quatre créations signatures fortes, imaginées autour de produits nobles,
              d'associations surprenantes et d'une véritable valeur ajoutée gastronomique.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 font-serif text-2xl italic text-amber sm:text-3xl">
              Des plats que l'on ne vient déguster qu'au Lift.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
