import { build as viteBuild } from "vite";

async function buildAll() {
  console.log("building frontend for Cloudflare Pages...");
  await viteBuild();
  console.log("✓ Frontend build complete");
}

buildAll().catch((err) => {
  console.error(err);
  process.exit(1);
});
