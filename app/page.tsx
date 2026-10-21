import Ambiance from "@/components/Ambiance";
import Closing from "@/components/Closing";
import Drinks from "@/components/Drinks";
import FloorIndicator from "@/components/FloorIndicator";
import Food from "@/components/Food";
import Hospitality from "@/components/Hospitality";
import LiftArrival from "@/components/LiftArrival";

export default function Home() {
  return (
    <main className="overflow-x-clip">
      <FloorIndicator />
      <LiftArrival />
      <Ambiance />
      <Food />
      <Drinks />
      <Hospitality />
      <Closing />
    </main>
  );
}
