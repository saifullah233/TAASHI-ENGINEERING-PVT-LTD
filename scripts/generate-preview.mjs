import { createServer } from "vite";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";

// Reuse the actual React components and data; never maintain a second layout.
const server = await createServer({ server: { middlewareMode: true, hmr: false }, optimizeDeps: { noDiscovery: true, include: [] }, appType: "custom" });
const escape = value => value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
const offlinePaths = html => html.replace(/\b(href|src|srcSet|srcset)="\/([^\"]*)"/g, (_, attribute, path) => {
  const target = path === "team" ? "team-preview.html" : path === "" || path.startsWith("#") ? `preview.html${path}` : `public/${path}`;
  return `${attribute}="${target}"`;
});
function head(page) {
  return `<meta charset="UTF-8" /><meta name="viewport" content="width=device-width,initial-scale=1" /><meta name="theme-color" content="#112a3d" /><meta name="description" content="${escape(page.description)}" /><title>${escape(page.title)}</title><link rel="icon" href="${escape(page.favicon)}" />`;
}
try {
  const { renderPage } = await server.ssrLoadModule("/src/offlinePreview.tsx");
  const built = existsSync("dist/index.html") ? await readFile("dist/index.html", "utf8") : null;
  for (const [route, file] of [["home", "preview.html"], ["team", "team-preview.html"]]) {
    const page = renderPage(route);
    const offline = `<!doctype html>\n<html lang="en"><head>${head(page)}<link rel="stylesheet" href="src/styles.css" /></head><body>${page.body}<script src="public/offline-preview.js" defer></script></body></html>\n`;
    await writeFile(file, offlinePaths(offline));
    if (built) {
      let output = built.replace(/<title>[\s\S]*?<\/title>/, `<title>${escape(page.title)}</title>`)
        .replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${escape(page.description)}" />`)
        .replace(/<link rel="icon"[^>]*>/, `<link rel="icon" href="${escape(page.favicon)}" />`)
        .replace(/<div id="root">[\s\S]*?<\/div>\s*<\/body>/, `<div id="root">${page.body}</div>\n  </body>`);
      if (route === "team") await mkdir("dist/team", { recursive: true });
      await writeFile(route === "home" ? "dist/index.html" : "dist/team/index.html", output);
    }
  }
  console.log("Generated preview.html and team-preview.html; pre-rendered production routes when dist/ exists.");
} finally { await server.close(); }
