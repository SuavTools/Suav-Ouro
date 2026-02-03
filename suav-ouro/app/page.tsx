"use client";

import { useEffect, useRef, useState } from "react";

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);

  // iOS Safari can still block autoplay on first paint.
  // We try a few times and also kick it after metadata loads.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    // hard-set properties (some mobile browsers are picky)
    v.muted = true;
    v.defaultMuted = true;
    v.playsInline = true;
    v.setAttribute("muted", "");
    v.setAttribute("playsinline", "");
    v.setAttribute("webkit-playsinline", "");

    const tryPlay = async () => {
      try {
        await v.play();
        setVideoReady(true);
      } catch {
        // ignore — will try again on events below
      }
    };

    // try immediately
    tryPlay();

    // try again shortly after (helps on iOS)
    const t1 = setTimeout(tryPlay, 250);
    const t2 = setTimeout(tryPlay, 1000);

    // also retry when metadata is ready
    const onLoaded = () => tryPlay();
    v.addEventListener("loadedmetadata", onLoaded);
    v.addEventListener("canplay", onLoaded);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      v.removeEventListener("loadedmetadata", onLoaded);
      v.removeEventListener("canplay", onLoaded);
    };
  }, []);

  return (
    <main className="relative h-[100svh] w-full overflow-hidden bg-black text-[#FFE65C]">
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
        controls={false}
        controlsList="nodownload noplaybackrate noremoteplayback"
        disablePictureInPicture
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <h1 className="text-4xl font-semibold tracking-tight text-[#FFE65C]">
          OURO
        </h1>

        <p className="mt-2 text-sm uppercase tracking-widest text-[#FFE65C]/70">
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

        {/* Optional: subtle “tap to start” fallback if autoplay is blocked */}
        {!videoReady ? (
          <button
            onClick={() => {
              const v = videoRef.current;
              if (!v) return;
              v.muted = true;
              v.play().catch(() => {});
            }}
            className="mt-6 text-xs tracking-widest text-[#FFE65C]/70 underline underline-offset-4 hover:text-[#FFE65C]"
          >
            TOCAR FUNDO
          </button>
        ) : null}
      </div>
    </main>
  );
}




