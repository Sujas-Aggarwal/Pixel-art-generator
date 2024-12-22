import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'no-unused-vars': ['warn'], // Warn about unused variables
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          vars: 'all', // Check all variables
          args: 'after-used', // Warn for unused function arguments
          ignoreRestSiblings: true, // Ignore rest siblings in destructuring
        },
      ],
      '@typescript-eslint/no-unused-vars-experimental': ['off'], // Disable deprecated rule if included
      'no-unused-functions': ['warn'], // Warn about unused functions (if custom rule exists)
    },
  },
);
