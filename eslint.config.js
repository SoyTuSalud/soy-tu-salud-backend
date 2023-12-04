import tsEslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import jest from 'eslint-plugin-jest'
import prettier from 'eslint-plugin-prettier'
import globals from 'globals'

export default [
  {
    files: ['src/**/*.{ts}'],
    plugins: {
      '@typescript-eslint': tsEslint,
      prettier,
      jest
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2020,
        ...globals.node
      },
      parser: tsParser,
      parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: __dirname, // './'
        sourceType: 'module'
      }
    },
    rules: {
      ...tsEslint.configs['recommended-type-checked'].rules,
      ...tsEslint.configs['stylistic-type-checked'].rules,
      ...prettier.configs.recommended.rules,
      ...jest.configs.recommended.rules,
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off'
    }
  }
]
