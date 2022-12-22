import { build } from "esbuild";
import { swcPlugin } from "esbuild-plugin-swc";

build({
  entryPoints: [
		"src/async.ts",
		"src/sync.ts"
	],
	plugins: [
    swcPlugin()
  ],
	bundle: true,
	format: "esm",
	minify: true,
	platform: "node",
	sourcemap: "linked",
	splitting: true,
	treeShaking: true,
	outdir: "dist"
});
