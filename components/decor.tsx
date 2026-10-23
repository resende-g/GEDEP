// Grafismos do GEDEP desenhados em SVG: estrela vermelha, malha em
// perspectiva, linhas de velocidade, esfera em meio-tom e separadores.
// São puramente decorativos e por isso ficam ocultos de leitores de tela.

const STAR_POINTS =
  "50,2 61.46,34.22 95.65,35.17 68.55,56.03 78.21,88.83 50,69.5 21.79,88.83 31.45,56.03 4.35,35.17 38.54,34.22";

export function Star({ className, tone = "ink" }: { className?: string; tone?: "ink" | "red" }) {
  return (
    <svg className={className} viewBox="0 0 100 100" aria-hidden="true" focusable="false">
      <polygon points={STAR_POINTS} fill={tone === "red" ? "var(--red)" : "var(--ink)"} />
    </svg>
  );
}

export function GlassStar({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="glass-star-body" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ff6b5f" />
          <stop offset="0.55" stopColor="#ff3131" />
          <stop offset="1" stopColor="#b80f17" />
        </linearGradient>
        <linearGradient id="glass-star-shine" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.85" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={STAR_POINTS} fill="url(#glass-star-body)" stroke="#151515" strokeWidth="1.6" strokeLinejoin="round" />
      <polygon points={STAR_POINTS} fill="url(#glass-star-shine)" transform="translate(50 50) scale(0.82) translate(-50 -54)" />
    </svg>
  );
}

function buildWireGrid() {
  const rows = 14;
  const columns = 41;
  const lines: string[] = [];
  const grid: [number, number][][] = [];

  for (let row = 0; row < rows; row += 1) {
    const depth = row / (rows - 1);
    const baseline = 18 + Math.pow(depth, 1.55) * 196;
    const spread = 0.5 + depth * 0.5;
    const points: [number, number][] = [];
    for (let column = 0; column < columns; column += 1) {
      const x = column * 10;
      const peak =
        Math.exp(-(((x - 130) / 62) ** 2)) * 1.1 +
        Math.exp(-(((x - 300) / 48) ** 2)) * 0.75 +
        Math.sin(x / 23 + row * 0.9) * 0.12;
      const height = peak * (16 + depth * 42);
      points.push([200 + (x - 200) * spread, baseline - height]);
    }
    grid.push(points);
    lines.push(points.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" "));
  }

  for (let column = 0; column < columns; column += 2) {
    lines.push(grid.map((points) => `${points[column][0].toFixed(1)},${points[column][1].toFixed(1)}`).join(" "));
  }

  return lines;
}

const WIRE_GRID_LINES = buildWireGrid();

export function WireGrid({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 400 220" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      {WIRE_GRID_LINES.map((points, index) => (
        <polyline key={index} points={points} fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinejoin="round" />
      ))}
    </svg>
  );
}

// [x, y, largura] de cada traço, alinhados à direita como no layout do Canva.
const SPEED_BARS: [number, number, number][] = [
  [112, 0, 30],
  [150, 0, 50],
  [36, 9, 164],
  [84, 18, 76],
  [168, 18, 32],
  [132, 27, 68],
];

export function SpeedLines({ className, flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 32"
      aria-hidden="true"
      focusable="false"
      style={flip ? { transform: "scaleX(-1)" } : undefined}
    >
      {SPEED_BARS.map(([x, y, width], index) => (
        <rect key={index} x={x} y={y} width={width} height="5" rx="2.5" fill="currentColor" />
      ))}
    </svg>
  );
}

function buildHalftone() {
  const dots: { cx: number; cy: number; r: number }[] = [];
  const step = 6.4;
  for (let y = step / 2; y < 100; y += step) {
    for (let x = step / 2; x < 100; x += step) {
      const fromCenter = Math.hypot(x - 50, y - 50);
      if (fromCenter > 47) continue;
      const fromLight = Math.hypot(x - 32, y - 30) / 78;
      const r = Math.min(3.1, Math.max(0.35, fromLight * 3.6));
      dots.push({ cx: Number(x.toFixed(2)), cy: Number(y.toFixed(2)), r: Number(r.toFixed(2)) });
    }
  }
  return dots;
}

const HALFTONE_DOTS = buildHalftone();

export function HalftoneSphere({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" aria-hidden="true" focusable="false">
      {HALFTONE_DOTS.map((dot, index) => (
        <circle key={index} cx={dot.cx} cy={dot.cy} r={dot.r} fill="currentColor" />
      ))}
    </svg>
  );
}

export function InstagramGlyph({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function EyeDiamond({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 40" aria-hidden="true" focusable="false">
      <path d="M32 2 62 20 32 38 2 20Z" fill="currentColor" />
      <path d="M14 20c5-6 11-9 18-9s13 3 18 9c-5 6-11 9-18 9s-13-3-18-9Z" fill="var(--surface)" />
      <circle cx="32" cy="20" r="5.5" fill="currentColor" />
    </svg>
  );
}
