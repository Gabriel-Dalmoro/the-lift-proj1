import CountUp from "./CountUp";
import EtSi from "./EtSi";
import Photo from "./Photo";
import Reveal from "./Reveal";

const big = "font-serif font-light leading-[0.85] text-brass-light";
const small = "font-sans text-sm uppercase tracking-[0.3em] text-cream/90 sm:text-base";

function Statement({
  children,
  title,
  body,
}: {
  children: React.ReactNode;
  /** Her section title, e.g. "Une cave sans frontières" */
  title: string;
  /** Her short presentation text */
  body: React.ReactNode;
}) {
  return (
    <div className="mx-auto grid max-w-6xl items-center gap-10 border-t border-brass/15 px-5 py-20 sm:py-28 md:grid-cols-2 md:gap-16">
      <Reveal>{children}</Reveal>
      <div>
        <Reveal delay={0.1}>
          <h3 className="font-serif text-2xl font-light italic text-cream sm:text-3xl">{title}</h3>
        </Reveal>
        <Reveal delay={0.2} className="mt-5 space-y-4 text-base leading-relaxed text-cream/75 sm:text-lg">
          {body}
        </Reveal>
      </div>
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
              Vins &amp; cocktails <span className="hidden sm:inline">—</span>{" "}
              <span className="block text-brass-light sm:inline">l’art de la découverte</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 font-serif text-xl italic text-cream/75 sm:text-2xl">
              Des vins qui voyagent, des cocktails qui racontent une histoire.
            </p>
          </Reveal>
        </div>

        <Photo
          src="/images/drinks-tray.webp"
          alt="Un serveur porte un plateau de cocktails ambrés dans la pénombre du bar"
          className="mx-auto h-[85svh] w-full max-w-6xl"
          position="center 62%"
          parallax={6}
          overlay="bg-gradient-to-b from-night via-transparent to-night"
        />

        <Statement
          title="Une cave sans frontières"
          body={
            <>
              <p className="font-serif text-xl italic text-brass-light/90">
                Et si nous oubliions les cartes des vins traditionnelles pour redonner toute sa place à la rencontre et à
                la découverte&nbsp;?
              </p>
              <p>
                J’imagine une sélection de 100 vins à moins de 90&nbsp;€, venus de France et des quatre coins du monde. Une
                cave vivante, jamais figée, où chaque visite devient une nouvelle invitation au voyage.
              </p>
              <p>
                Nos sommeliers deviennent les guides de cette expérience&nbsp;: quelques mots sur vos envies, une
                fourchette de prix, et laissez-vous surprendre.
              </p>
            </>
          }
        >
          <p className="flex flex-col gap-3" aria-label="100 vins à moins de 90 €">
            <span className={`${big} text-[9rem] sm:text-[12rem]`}>
              <CountUp to={100} />
            </span>
            <span className={small}>vins à moins de</span>
            <span className={`${big} text-[6.5rem] sm:text-[9rem]`}>90&nbsp;€</span>
          </p>
        </Statement>

        <Statement
          title="L’esprit d’une collaboration locale"
          body={
            <>
              <p>
                Associer notre créativité à celle d’un distillateur de la région pour imaginer quatre cocktails que l’on
                ne retrouvera qu’au Lift.
              </p>
              <p>
                Une rencontre entre deux savoir-faire, des créations singulières et un partenariat qui se prolonge
                au-delà du verre, à travers des événements, des découvertes et une communication commune.
              </p>
              {/* Space kept for the partner’s name and logo, as the brief asks */}
              <div className="mt-6 flex h-20 items-center justify-center rounded-sm border border-dashed border-brass/40 text-[11px] uppercase tracking-[0.3em] text-brass/70">
                Distillateur partenaire
              </div>
            </>
          }
        >
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

        <div className="flex min-h-[80svh] items-center justify-center px-5 py-24">
          <EtSi className="text-cream">Et si le plus beau cocktail était celui qui n’existe pas encore&nbsp;?</EtSi>
        </div>

        <Statement
          title="Une expérience unique"
          body={
            <>
              <p>
                Pas de recette imposée. Notre barman prend le temps de découvrir vos goûts, vos envies, vos souvenirs de
                saveurs, puis imagine devant vous un cocktail créé spécialement pour cet instant.
              </p>
              <p>
                Une expérience spontanée, humaine et personnalisée, que nous expérimentons déjà avec un immense succès
                auprès de nos clients.
              </p>
            </>
          }
        >
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

        <div className="mx-auto max-w-2xl px-6 pb-32 pt-20 text-center sm:pb-44">
          <Reveal>
            <p className="font-serif text-xl font-light leading-relaxed text-cream/85 sm:text-2xl">
              Notre ambition&nbsp;: faire du Lift un lieu où l’on ne revient pas pour retrouver toujours la même chose,
              mais pour avoir le plaisir d’être surpris à chaque fois.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
