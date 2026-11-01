import { renderToString } from "react-dom/server";
import App from "./App";
import { pageMetadata, type Page } from "./navigation";
import { approvedAssets } from "./data/assets";

export function renderPage(page: Page) {
  return { body: renderToString(<App page={page} />), ...pageMetadata[page], favicon: approvedAssets.favicon ?? approvedAssets.standaloneIcon ?? "/favicon.svg" };
}
