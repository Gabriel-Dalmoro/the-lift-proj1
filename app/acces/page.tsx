import type { Metadata } from "next";
import LiftPanel from "@/components/LiftPanel";

export const metadata: Metadata = { title: "The Lift" };

export default function AccesPage() {
  return (
    <main className="grain relative flex min-h-svh items-center justify-center bg-jungle-deep px-4 py-10">
      <LiftPanel />
    </main>
  );
}
