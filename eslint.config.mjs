import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import unusedImports from "eslint-plugin-unused-imports"; // Plugin para detectar imports não utilizados

export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      ecmaVersion: 2021, // Define a versão do ECMAScript
      sourceType: "module", // Define o tipo de módulo ES
      globals: {
        ...globals.browser, // Adiciona as variáveis globais de browser (window, document, etc.)
        ...globals.jest, // Adiciona as variáveis globais do Jest (test, expect, etc.)
      },
    },
    plugins: {
      react: pluginReact, // Integração com React
      "react-hooks": pluginReactHooks, // Integração com React Hooks
      "unused-imports": unusedImports, // Plugin para detectar imports não utilizados
    },
    rules: {
      // Regras de React e React Hooks
      "react/react-in-jsx-scope": "off", // Desliga a necessidade de React no escopo (para React 17+)
      "react/jsx-uses-react": "off", // React 17+ não requer JSX diretamente
      "react-hooks/rules-of-hooks": "error", // Verifica as regras dos hooks do React
      "react-hooks/exhaustive-deps": "warn", // Verifica as dependências dos hooks

      // Regras para identificar e remover imports e variáveis não utilizadas
      "unused-imports/no-unused-imports": "error", // Aponta e remove imports não utilizados
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_", // Ignora variáveis que começam com _
          args: "after-used",
          argsIgnorePattern: "^_", // Ignora argumentos que começam com _
        },
      ],
    },
    settings: {
      react: {
        version: "detect", // Detecta automaticamente a versão do React
      },
    },
  },
  pluginJs.configs.recommended, // Regras recomendadas do JavaScript
  pluginReact.configs.flat.recommended, // Regras recomendadas do React
];
