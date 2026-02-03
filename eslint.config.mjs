import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig([
  // Ignore JS config files
  {
    ignores: ['**/*.js', '**/*.mjs', '**/*.cjs', 'dist/**', 'node_modules/**'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['src/**/*.{ts,tsx}'], // Only TypeScript files
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: path.join(__dirname, 'tsconfig.json'),
        tsconfigRootDir: __dirname,
        sourceType: 'module',
      },
      globals: {
        ...globals.node,
      },
    },
    rules: {
      // TypeScript-specific
      '@typescript-eslint/no-unused-vars': [
        'error',
        { args: 'all', argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/consistent-type-imports': 'off',

      // Type-aware rules
      '@typescript-eslint/no-unsafe-call': 'error',
      '@typescript-eslint/no-unsafe-member-access': 'error',
      '@typescript-eslint/no-unsafe-assignment': 'error',
      '@typescript-eslint/no-unsafe-return': 'error',

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
  },
  {
    files: ['ts-node/**/*.{ts,tsx}'], // Only TypeScript files
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: path.join(__dirname, 'ts-node/tsconfig.json'),
        tsconfigRootDir: path.join(__dirname, 'ts-node'),
        sourceType: 'module',
      },
    },
  },
]);
