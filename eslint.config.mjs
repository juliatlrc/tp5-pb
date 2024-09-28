import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";

export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      globals: globals.browser, // Definindo o ambiente como 'browser'
    },
  },
  pluginJs.configs.recommended, // Configuração recomendada do ESLint para JavaScript
  pluginReact.configs.flat.recommended, // Configuração recomendada do ESLint para React
];
