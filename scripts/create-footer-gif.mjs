// Optional asset authoring tool. The website serves the checked-in GIF/SVG files.
// Authoring only: npm install --no-save --package-lock=false @resvg/resvg-js gifenc
import { createServer } from "vite";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { writeFile, mkdir, mkdtemp } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { Resvg } from "@resvg/resvg-js";
import gifenc from "gifenc";

const { GIFEncoder, quantize, applyPalette } = gifenc;
const server = await createServer({ server: { middlewareMode: true, hmr: false }, optimizeDeps: { noDiscovery: true, include: [] }, appType: "custom" });
const previewDirectory = await mkdtemp(join(tmpdir(), "taashi-footer-"));
try {
  const { ConstructionSketch } = await server.ssrLoadModule("/src/components/FooterConstruction.tsx");
  const sketch = renderToStaticMarkup(createElement(ConstructionSketch));
  const render = svg => new Resvg(svg, { background: "#0c2434", fitTo: { mode: "width", value: 780 }, font: { loadSystemFonts: false } }).render();
  const gif = GIFEncoder();
  const frames = 60;
  let palette;
  for (let frame = 0; frame < frames; frame++) {
    const phase = frame / frames * Math.PI * 2;
    const x = 16 * Math.sin(phase);
    const y = 10 * (1 - Math.cos(phase));
    const scale = (49 + y) / 49;
    const svg = sketch
      .replace('data-motion="cable"', `transform="translate(${x.toFixed(3)} 38) scale(1 ${scale.toFixed(5)}) translate(0 -38)"`)
      .replace('data-motion="hook"', `transform="translate(${x.toFixed(3)} ${y.toFixed(3)})"`)
      .replaceAll('data-motion="highlight"', `opacity="${(.7 + .3 * Math.cos(phase)).toFixed(3)}"`);
    const image = render(svg);
    if (!palette) palette = quantize(image.pixels, 64);
    const indexed = applyPalette(image.pixels, palette);
    gif.writeFrame(indexed, image.width, image.height, { ...(frame === 0 ? { palette } : {}), delay: 100, repeat: 0, dispose: 1 });
    if (frame === 0 || frame === frames / 4) await writeFile(join(previewDirectory, `frame-${frame}.png`), image.asPng());
  }
  gif.finish();
  await mkdir("public/images", { recursive: true });
  await writeFile("public/images/footer-construction.gif", gif.bytes());
  await writeFile("public/images/footer-construction.svg", sketch);
  console.log(`Created ${frames}-frame, 6-second looping GIF (${Math.round(gif.bytes().length / 1024)} KB) and static SVG.`);
  console.log(`Visual check frames: ${previewDirectory}`);
} finally { await server.close(); }
