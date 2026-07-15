import { execFileSync } from "node:child_process";

function resolveManagedPreviewUrl() {
  try {
    const output = execFileSync("vibe64-preview", ["status", "--json"], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"]
    });
    const status = JSON.parse(output);
    const endpoint = String(status?.endpoints?.agent?.url || "");

    if (endpoint) {
      return new URL(endpoint).origin;
    }
  } catch {
    // Outside Vibe64, use the ordinary local Playwright default below.
  }

  return "http://127.0.0.1:5173";
}

export const BASE_URL = String(process.env.PLAYWRIGHT_BASE_URL || resolveManagedPreviewUrl()).replace(/\/+$/u, "");
