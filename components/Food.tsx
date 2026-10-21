import EtSi from "./EtSi";
import Photo from "./Photo";
import { Heavy, Serif } from "./LogoType";
import Reveal from "./Reveal";
import RiseBehind from "./RiseBehind";

const DISHES = [
  { name: "Les Gougères des Sommets", text: "Gougères cacio e pepe, poivre noir, pecorino" },
  {
    name: "Tartare à l’italienne",
    text: "Bœuf, parmigiano, câpres, truffe blanche d’Alba en saison, noisette du Piémont",
    note: "servi avec une focaccia préparée à table, à partager pour 2 ou 3 personnes",
  },
  { name: "Croque Monsieur du Lift", text: "Mortadelle, taleggio, pistache" },
];

export default function Food() {
  return (
    <section data-chapter="La carte" className="relative text-cream">
      {/* Green to golden hour */}
      <div className="h-[30svh] bg-gradient-to-b from-jungle via-[#3a2a14] to-[#3b1d10]" />

      <div className="bg-[#3b1d10]">
        <div className="flex min-h-[90svh] items-center justify-center px-5 pb-24">
          <EtSi className="text-[#f8e6cc]">
            Et si nous réinventions l’art de partager les grands classiques de la cuisine française&nbsp;?
          </EtSi>
        </div>

        {/* Portrait photo: shown framed and whole, never stretched across the screen */}
        <Reveal className="mx-auto w-[calc(100%-2.5rem)] max-w-lg">
          <Photo
            src="/images/food-golden.webp"
            alt="Des assiettes à partager posées sur une table en bois, dans la lumière dorée du soir"
            className="aspect-[3/4] w-full rounded-sm"
            sizes="(min-width: 640px) 512px, 100vw"
            parallax={4}
            position="center 45%"
          />
        </Reveal>

        <div className="mx-auto max-w-2xl px-6 pt-24 text-center sm:pt-32">
          <Reveal>
            <p className="font-serif text-xl font-light leading-relaxed text-[#f3dcbc] sm:text-2xl">
              J’imagine une carte courte et audacieuse, où les incontournables de notre patrimoine culinaire se
              réinventent en petites assiettes généreuses, relevées d’un accent italien.
            </p>
          </Reveal>
        </div>

        <div className="mx-auto max-w-4xl px-6 py-24 text-center sm:py-32">
          <Reveal>
            <p className="mb-6 text-[11px] uppercase tracking-[0.35em] text-amber">La promesse culinaire</p>
          </Reveal>
          <Reveal delay={0.1}>
            <p
              className="text-balance font-serif text-[2rem] font-light italic leading-[1.15] text-[#f8e6cc] sm:text-6xl"
              style={{ fontVariationSettings: '"opsz" 144, "SOFT" 80' }}
            >
              Une cuisine française à partager, relevée d’un accent italien.
            </p>
          </Reveal>
        </div>

        {/* Abundance: plates in the middle of the table */}
        <div className="mx-auto max-w-3xl px-3 sm:px-6">
          <Reveal>
            <Photo
              src="/images/food-spread.webp"
              alt="Vue du dessus de petites assiettes à partager : crudités, sardines, crevettes, tataki, viande grillée"
              className="aspect-[4/5] w-full rounded-sm"
              sizes="(min-width: 768px) 768px, 100vw"
              parallax={5}
            />
          </Reveal>
        </div>

        <div className="mx-auto max-w-2xl px-6 pb-24 pt-24 text-center">
          <Reveal>
            <p className="font-serif text-xl font-light leading-relaxed text-[#f3dcbc] sm:text-2xl">
              Dix propositions, dont quatre créations signatures fortes, imaginées autour de produits nobles,
              d’associations surprenantes et d’une véritable valeur ajoutée gastronomique.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 font-serif text-2xl italic text-amber sm:text-3xl">
              Des plats que l’on ne vient déguster qu’au Lift.
            </p>
          </Reveal>
        </div>

        {/* Example dishes, explicitly not a final menu */}
        <div className="mx-auto max-w-6xl px-6 pb-28 sm:pb-36">
          <Reveal>
            <p className="mb-10 text-center text-[11px] uppercase tracking-[0.35em] text-amber">
              Pistes d’incarnation du concept
            </p>
          </Reveal>
          <div className="grid gap-px overflow-hidden rounded-sm bg-amber/25 md:grid-cols-3">
            {DISHES.map((dish, i) => (
              <Reveal key={dish.name} delay={i * 0.12} className="bg-[#3b1d10] px-7 py-9 text-center">
                <h3 className="font-serif text-2xl font-light text-[#f8e6cc] sm:text-[1.7rem]">{dish.name}</h3>
                <p className="mx-auto mt-4 max-w-xs text-sm leading-relaxed text-[#f3dcbc]/80">{dish.text}</p>
                {dish.note && <p className="mx-auto mt-3 max-w-xs text-sm italic leading-relaxed text-amber/90">{dish.note}</p>}
              </Reveal>
            ))}
          </div>
          <Reveal>
            <p className="mt-6 text-center text-sm italic text-[#f3dcbc]/60">
              Ces propositions sont des pistes d’incarnation du concept, pas encore une carte figée.
            </p>
          </Reveal>
        </div>

        <div className="mx-auto max-w-2xl space-y-10 px-6 pb-24 text-center">
          <Reveal>
            <p className="font-serif text-xl font-light leading-relaxed text-[#f3dcbc] sm:text-2xl">
              Le spectacle se prolonge jusqu’à la table&nbsp;: certaines assiettes sont dressées, découpées ou finalisées
              devant les convives, transformant le service en un moment de partage et d’émotion.
            </p>
          </Reveal>
          <Reveal>
            <p className="font-serif text-xl font-light leading-relaxed text-[#f3dcbc] sm:text-2xl">
              Au cœur de cette identité, notre Chef. Je souhaite lui donner un visage, une signature et une place centrale
              dans l’expérience, car une cuisine qui marque les esprits est avant tout une cuisine qui raconte la
              personnalité et le savoir-faire de celui qui la crée.
            </p>
          </Reveal>
        </div>

        {/* Her closing line rises from behind the terrace parapet, over the city at dusk */}
        <RiseBehind
          src="/images/patio-evening.webp"
          fg="/images/patio-evening-fg.webp"
          alt="Une terrasse végétalisée au crépuscule, des tablées d’amis sous les guirlandes"
          fit="object-cover object-[center_14%] lg:object-center"
          height="h-[280svh]"
          from="62svh"
          top="top-[14svh] lg:top-[16svh]"
          riseEnd={0.6}
          portrait={1493 / 2000}
          overlay="bg-[linear-gradient(to_bottom,#3b1d10,transparent_14%,transparent_86%,#3b1d10)]"
        >
          <p className="mx-auto max-w-[14em] text-balance text-[1.2rem] text-cream drop-shadow-[0_2px_22px_rgba(0,0,0,0.7)] sm:text-[1.7rem] lg:text-[1.75rem]">
            <Serif>Une cuisine de caractère, vivante et généreuse,</Serif>
            <Heavy>où le plaisir de partager devient une expérience à part entière.</Heavy>
          </p>
        </RiseBehind>
        <div className="h-24 sm:h-32" />
      </div>
    </section>
  );
}
