import { build, emptyDir } from "https://deno.land/x/dnt/mod.ts";
import {
  $env,
  $optional,
  $string,
  loader,
} from "https://raw.githubusercontent.com/ppdx999/deno-env-loader/main/mod.ts";

const [pkg, err] = loader(
  Deno.readTextFileSync("./NPM_PACKAGE").trim(),
  $env({
    version: $string,
    name: $string,
    repository: $optional($string),
  }),
);

if (err) {
  console.error(err);
  Deno.exit(1);
}

const repository = pkg.repository ?? pkg.name;

await emptyDir("./npm");

await build({
  entryPoints: ["./mod.ts"],
  outDir: "./npm",
  shims: {
    // see JS docs for overview and more options
    deno: true,
  },
  package: {
    // package.json properties
    name: pkg.name,
    version: pkg.version,
    description: "Type safe env files loader written in deno",
    license: "MIT",
    repository: {
      type: "git",
      url: `git+https://github.com/ppdx999/${repository}.git`,
    },
    bugs: {
      url: `https://github.com/ppdx999/${repository}/issues`,
    },
  },
  postBuild() {
    // steps to run after building and before running the tests
    Deno.copyFileSync("LICENSE", "npm/LICENSE");
    Deno.copyFileSync("README.md", "npm/README.md");
  },
});
