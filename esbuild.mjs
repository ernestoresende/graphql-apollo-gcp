import { buildSync } from "esbuild";
const define = {};

for (const k in process.env) {
  define[`process.env.${k}`] = JSON.stringify(process.env[k]);
}

buildSync({
  entryPoints: ["src/index.ts"],
  outfile: "dist/index.js",
  bundle: true,
  minify: false,
  packages: "external",
  platform: "node",
  target: "node16",
  define,
});
