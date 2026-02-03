"use client";

import { useEffect, useRef } from "react";

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);

  // iOS Safari can be picky about autoplay even when muted + playsInline.
  // This nudge helps it start reliably.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    const p = v.play();
    if (p && typeof p.catch === "function") p.catch(() => {});
  }, []);

  return (
    <main className="relative h-[100svh] w-full overflow-hidden bg-black text-white">
      {/* Background video */}
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover pointer-events-none"
        src="/ouro-bg.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/35" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <h1 className="text-4xl font-semibold tracking-tight">OURO</h1>

        <p className="mt-2 text-sm uppercase tracking-widest text-neutral-300">
          Suav
        </p>

        <div className="mt-8 flex w-full max-w-xs flex-col gap-3">
          <a
            href="https://youtu.be/-H-yXpQcXS8"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl bg-[#FFE65C] px-6 py-3 text-sm font-medium text-black transition hover:opacity-90"
          >
            Ver o videoclipe
          </a>

          <a
            href="https://open.spotify.com/album/49OIPQ6VAeWDvxo5jqZb0W"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-[#FFE65C]/70 px-6 py-3 text-sm font-medium text-[#FFE65C] transition hover:bg-[#FFE65C]/10"
          >
            Ouvir no Spotify
          </a>
        </div>
      </div>
    </main>
  );
}



