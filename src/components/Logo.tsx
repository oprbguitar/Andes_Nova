export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div className="relative h-12 w-16 shrink-0 text-gold">
        <svg viewBox="0 0 96 72" className="h-full w-full" aria-hidden="true">
          <path d="M6 62 32 18l14 24 9-15 35 35H74L56 43 43 62h-9l8-13-10-17-18 30H6Z" fill="currentColor" />
          <path d="M21 62 43 28l7 12-14 22H21Z" fill="#F5D08A" opacity=".95" />
          <path d="m52 62 12-18 18 18H52Z" fill="#C9933A" opacity=".9" />
        </svg>
      </div>
      {!compact && (
        <div className="leading-none">
          <p className="font-display text-3xl font-bold text-white">AndesNova</p>
          <p className="mt-1 text-[0.72rem] font-bold uppercase tracking-[0.18em] text-white/80">Consultores S.A.C.</p>
        </div>
      )}
    </div>
  );
}
