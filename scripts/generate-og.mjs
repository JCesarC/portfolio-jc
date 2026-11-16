// Generates public/og.png (1200x630) for social previews. Run: node scripts/generate-og.mjs
import sharp from 'sharp';

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect width="1200" height="630" fill="#0b1120"/>
  <rect x="80" y="80" width="64" height="4" fill="#d9b46a"/>
  <text x="80" y="150" font-family="DejaVu Sans Mono, monospace" font-size="24" letter-spacing="3" fill="#d9b46a">NODE.JS · TYPESCRIPT · PYTHON · LLMS · AWS</text>
  <text x="80" y="300" font-family="DejaVu Serif, Georgia, serif" font-size="76" font-weight="700" fill="#e7eaf2">Julio César Cantún Páez</text>
  <text x="80" y="380" font-family="DejaVu Sans, sans-serif" font-size="38" fill="#d9b46a">Software Engineer — AI / LLM Applications</text>
  <text x="80" y="540" font-family="DejaVu Sans, sans-serif" font-size="26" fill="#9aa5bd">4+ years in production · mortgage fintech · sole engineer on two platforms</text>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile('public/og.png');
console.log('public/og.png written');
