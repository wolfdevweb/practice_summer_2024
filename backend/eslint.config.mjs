import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "script", // CommonJS modules
      globals: {
        ...globals.node, // Node.js globals
      },
    },
  },
  pluginJs.configs.recommended, // ESLint recommended rules
];
