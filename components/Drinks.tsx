import CountUp from "./CountUp";
import EtSi from "./EtSi";
import Photo from "./Photo";
import Reveal from "./Reveal";

const big = "font-serif font-light leading-[0.85] text-brass-light";
const small = "font-sans text-sm uppercase tracking-[0.3em] text-cream/90 sm:text-base";

function Statement({
  children,
  src,
  alt,
  flip = false,
  position,
}: {
  children: React.ReactNode;
  src: string;
  alt: string;
  flip?: boolean;
  position?: string;
}) {
  return (
    <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-20 sm:py-28 md:grid-cols-2 md:gap-14">
      <Reveal className={flip ? "md:order-2" : ""}>{children}</Reveal>
      <Reveal delay={0.15} className={flip ? "md:order-1" : ""}>
        <Photo src={src} alt={alt} className="aspect-[4/5] w-full rounded-sm" sizes="(min-width: 768px) 50vw, 100vw" position={position} />
      </Reveal>
    </div>
  );
}

export default function Drinks() {
  return (
    <section data-chapter="Vins & cocktails" className="relative text-cream">
      {/* Golden hour into night */}
      <div className="h-[30svh] bg-gradient-to-b from-[#3b1d10] via-[#24130b] to-night" />

      <div className="bg-night">
        <div className="mx-auto max-w-4xl px-5 pb-12 pt-16 text-center">
          <Reveal>
            <h2 className="font-serif text-3xl font-light uppercase tracking-[0.06em] text-cream sm:text-5xl">
              Vins &amp; cocktails&nbsp;: <span className="block text-brass-light sm:inline">l'art de la découverte</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 font-serif text-xl italic text-cream/75 sm:text-2xl">
              Des vins qui voyagent, des cocktails qui racontent une histoire.
            </p>
          </Reveal>
        </div>

        <Statement src="/images/drinks-wine.webp" alt="Un vin rouge versé dans un verre, lumière chaude">
          <p className="flex flex-col gap-3" aria-label="100 vins à moins de 90 €">
            <span className={`${big} text-[9rem] sm:text-[12rem]`}>
              <CountUp to={100} />
            </span>
            <span className={small}>vins à moins de</span>
            <span className={`${big} text-[6.5rem] sm:text-[9rem]`}>90&nbsp;€</span>
          </p>
        </Statement>

        <Statement src="/images/drinks-cocktail.webp" alt="Un cocktail ambré garni d'orange et d'une fleur" flip>
          <p className="flex flex-col gap-3" aria-label="4 créations exclusives × 1 distillateur local">
            <span className="flex items-end gap-4">
              <span className={`${big} text-[8rem] sm:text-[10rem]`}>4</span>
              <span className={`${small} pb-4`}>créations exclusives</span>
            </span>
            <span className="pl-2 font-serif text-4xl text-amber">×</span>
            <span className="flex items-end gap-4">
              <span className={`${big} text-[8rem] sm:text-[10rem]`}>1</span>
              <span className={`${small} pb-4`}>distillateur local</span>
            </span>
          </p>
        </Statement>

        <Statement src="/images/drinks-bartender.webp" alt="Un barman prépare un cocktail devant le comptoir" position="35% center">
          <p
            className="font-serif text-[3.4rem] font-light uppercase leading-[0.95] text-brass-light sm:text-7xl"
            style={{ fontVariationSettings: '"opsz" 144' }}
          >
            Le cocktail
            <br />
            <span className="italic normal-case text-cream">de vos</span>
            <br />
            rêves
          </p>
        </Statement>

        <div className="flex min-h-[80svh] items-center justify-center px-5 py-24">
          <EtSi className="text-cream">Et si le plus beau cocktail était celui qui n'existe pas encore&nbsp;?</EtSi>
        </div>

        <Photo
          src="/images/drinks-garnish.webp"
          alt="Un barman pose la touche finale sur un cocktail"
          className="mx-auto h-[70svh] w-full max-w-6xl"
          position="center 30%"
          overlay="bg-gradient-to-b from-night via-transparent to-night"
        />

        <div className="mx-auto max-w-2xl px-6 pb-32 pt-20 text-center sm:pb-44">
          <Reveal>
            <p className="font-serif text-xl font-light leading-relaxed text-cream/85 sm:text-2xl">
              Notre ambition&nbsp;: faire du Lift un lieu où l'on ne revient pas pour retrouver toujours la même chose,
              mais pour avoir le plaisir d'être surpris à chaque fois.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
