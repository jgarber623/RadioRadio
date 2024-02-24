import config from "@jgarber/eslint-config";

export default [
  { ignores: ["coverage", "dist"] },
  ...config,
];
