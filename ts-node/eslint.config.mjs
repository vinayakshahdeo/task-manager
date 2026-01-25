import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  // Base JS rules
  js.configs.recommended,

  // TypeScript recommended rules
  ...tseslint.configs.recommended,

  // Your project-specific options
  {
    files: ['**/*.{ts,tsx,js,mjs,cjs}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        sourceType: 'module', // keep if you use import/export
      },
      globals: {
        ...globals.node, // Node.js environment instead of browser
      },
    },
    rules: {
      // Add custom rules here, e.g.:
      // 'no-console': 'warn',
    },
  },
]);
