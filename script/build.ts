import { build as viteBuild } from "vite";
import { build as esbuild } from "esbuild";
import { readFile } from "fs/promises";

async function buildAll() {
  console.log("building frontend...");
  await viteBuild();
  console.log("✓ Frontend build complete");
}

buildAll().catch((err) => {
  console.error(err);
  process.exit(1);
});
