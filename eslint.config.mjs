import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import prettier from 'eslint-config-prettier';

export default tseslint.config(
  {
    ignores: ['node_modules/**', '.output/**', '.wxt/**', 'dist/**', 'coverage/**'],
  },

  js.configs.recommended,

  ...tseslint.configs.recommended,

  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      'no-undef': 'off',
    },
  },

  {
    files: ['**/*.tsx'],
    plugins: {
      'react-hooks': reactHooks,
    },
    rules: reactHooks.configs.flat.recommended.rules,
  },

  prettier,
);
