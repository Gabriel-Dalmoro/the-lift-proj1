import { Heavy, Serif } from "./LogoType";
import RiseBehind from "./RiseBehind";

// Her final sentence rises from behind Lyon's skyline, then the view holds a while.
export default function SkylineQuote() {
  return (
    <RiseBehind
      src="/images/closing-lyon.webp"
      fg="/images/closing-lyon-fg.webp"
      alt="Lyon, ses tours et le Rhône au petit matin"
      fit="object-cover object-[center_41%]"
      height="h-[420svh]"
      from="72svh"
      top="top-[7svh] sm:top-[9svh]"
      riseEnd={0.5}
      overlay="bg-[linear-gradient(to_bottom,var(--color-cream),transparent_14%)]"
      caption={false}
    >
      <p className="mx-auto max-w-[17ch] text-balance text-[2.3rem] text-[#1C1917] sm:max-w-[19ch] sm:text-6xl lg:text-[4.2rem]">
        <Serif>Parce qu’au fond, nos clients oublieront peut-être ce qu’ils ont commandé,</Serif>
        <Heavy>mais jamais la façon dont nous les avons fait se sentir.</Heavy>
      </p>
    </RiseBehind>
  );
}
