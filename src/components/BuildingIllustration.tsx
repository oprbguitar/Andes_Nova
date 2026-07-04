export function BuildingIllustration() {
  return (
    <svg className="building-illustration" viewBox="0 0 760 430" role="img" aria-label="Edificio corporativo AndesNova">
      <defs>
        <linearGradient id="glass" x1="0" x2="1" y1="0" y2="1">
          <stop stopColor="#bfe1ff" />
          <stop offset="0.55" stopColor="#3c83c7" />
          <stop offset="1" stopColor="#0f3769" />
        </linearGradient>
        <linearGradient id="wall" x1="0" x2="1">
          <stop stopColor="#f9fbff" />
          <stop offset="1" stopColor="#dce6f3" />
        </linearGradient>
      </defs>
      <path className="mountain mountain-a" d="M18 318c90-118 142-116 232 0H18Z" />
      <path className="mountain mountain-b" d="M292 320c120-150 213-150 350 0H292Z" />
      <path className="cloud" d="M88 276c34-42 87-50 127-14 42-47 119-47 157 5 50-16 98 6 120 49H54c7-18 18-31 34-40Z" />
      <ellipse className="ground" cx="374" cy="365" rx="275" ry="24" />
      <g className="trees">
        {[
          [104, 312],
          [130, 334],
          [568, 318],
          [604, 336],
          [651, 326],
        ].map(([x, y]) => (
          <g key={`${x}-${y}`} transform={`translate(${x} ${y})`}>
            <rect x="-4" y="22" width="8" height="34" rx="4" fill="#6d865e" />
            <circle cx="0" cy="17" r="17" fill="#5e9b68" />
            <circle cx="-8" cy="29" r="14" fill="#3e7f5d" />
            <circle cx="11" cy="31" r="13" fill="#7bad69" />
          </g>
        ))}
      </g>
      <g className="building">
        <path d="M206 178 396 95l173 88v171H206V178Z" fill="url(#wall)" />
        <path d="M396 95v259h173V183L396 95Z" fill="#edf3fa" />
        <path d="M231 193 381 128v206H231V193Z" fill="#d9e6f5" />
        <path d="M418 133 541 197v137H418V133Z" fill="#f7faff" />
        <g fill="url(#glass)">
          {Array.from({ length: 4 }).map((_, row) =>
            Array.from({ length: 4 }).map((__, col) => (
              <rect key={`l-${row}-${col}`} x={248 + col * 31} y={188 + row * 35} width="23" height="25" rx="2" />
            )),
          )}
          {Array.from({ length: 4 }).map((_, row) =>
            Array.from({ length: 3 }).map((__, col) => (
              <path
                key={`r-${row}-${col}`}
                d={`M${438 + col * 31} ${178 + row * 35}h22l13 7v21h-35V${178 + row * 35}Z`}
              />
            )),
          )}
        </g>
        <path d="M185 342h402v23H185z" fill="#c5d1df" />
        <path d="M339 295h82v70h-82z" fill="#183e6d" />
        <path d="M371 295h18v70h-18z" fill="#9dc8ed" opacity="0.75" />
      </g>
    </svg>
  );
}
