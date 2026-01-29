import { DashedLinesScene } from "./components/dashed-lines-scene";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white dark:bg-[#0a0a0a]">
      <div className="w-full max-w-3xl aspect-[400/94]">
        <DashedLinesScene />
      </div>
    </div>
  );
}
