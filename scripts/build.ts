import { build } from "esbuild";
import { swcPlugin } from "esbuild-plugin-swc";

build({
  bundle: true,
  entryPoints: ["src/index.ts", "src/async.ts", "src/sync.ts"],
  plugins: [swcPlugin()],
  logLevel: "info",
  minify: true,
  platform: "node",
  sourcemap: "linked",
  splitting: true,
  treeShaking: true,
  outdir: "dist",
  format: "esm",
  target: ["esnext", "node18.0.0"],
});
