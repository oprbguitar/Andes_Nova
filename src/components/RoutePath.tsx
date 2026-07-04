export function RoutePath() {
  return (
    <svg className="route-path" viewBox="0 0 1120 360" aria-hidden="true">
      <path
        className="vine-path"
        d="M30 265 C120 195 150 240 214 150 S390 102 480 82 S674 100 755 55 S948 32 1085 72"
      />
      {[
        [122, 200],
        [360, 96],
        [602, 82],
        [904, 42],
        [1004, 58],
      ].map(([x, y]) => (
        <g className="leaf" key={`${x}-${y}`} transform={`translate(${x} ${y})`}>
          <path d="M0 0c25-23 43-25 56-9C33-4 18 8 7 25 4 16 2 8 0 0Z" />
          <path d="M7 25C18 10 32 1 56-9" />
        </g>
      ))}
    </svg>
  );
}
