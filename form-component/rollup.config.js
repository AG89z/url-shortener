import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import { terser } from "rollup-plugin-terser";
import { string } from "rollup-plugin-string";

const dist = "dist";
const bundleName = "bundle";

const production = !process.env.ROLLUP_WATCH;

export default [
  {
    input: "src/main.js",
    output: [
      { file: `${dist}/${bundleName}.cjs.js`, format: "cjs" },
      { file: `${dist}/${bundleName}.esm.js`, format: "esm" },
      {
        file: `${dist}/${bundleName}.umd.js`,
        format: "umd",
        name: "UrlShortenerForm",
        globals: {
          react: "React",
        },
      },
    ],
    plugins: [
      babel({
        exclude: ["node_modules/**"],
        babelHelpers: "bundled", //TODO change to runtime
      }),
      resolve(),
      commonjs(),
      string({ include: "**/*.css" }),
      production && terser(),
    ],
    external: ["react"],
  },
];
