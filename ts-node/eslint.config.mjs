import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig([
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['ts-node/**/*.{ts,tsx,js,mjs,cjs}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: path.join(__dirname, 'ts-node/tsconfig.json'),
        tsconfigRootDir: path.join(__dirname, 'ts-node'),
        sourceType: 'module',
      },
      rules: {
        // TypeScript-specific
        '@typescript-eslint/no-unused-vars': [
          'error',
          { args: 'all', argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
        ],
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/consistent-type-imports': 'error',

        // General best practices
        eqeqeq: ['error', 'always'],
        'no-var': 'error',
        'prefer-const': 'error',
        'no-console': ['warn', { allow: ['warn', 'error'] }],
        curly: ['error', 'all'],
        'no-else-return': 'warn',

        // Style / readability
        'no-multiple-empty-lines': ['error', { max: 1 }],
        'max-lines-per-function': ['warn', { max: 80, skipComments: true }],
        complexity: ['warn', 10],
      },
      globals: {
        ...globals.node,
      },
    },
  },
]);
