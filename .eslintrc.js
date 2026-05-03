module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'import', 'react', 'react-hooks'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'prettier'
  ],
  env: {
    browser: true,
    node: true,
    es2021: true
  },
  rules: {
    // Import Sorting & Absolute Paths
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        pathGroups: [
          {
            pattern: '@/**',
            group: 'internal'
          }
        ],
        alphabetize: { order: 'asc', caseInsensitive: true }
      }
    ],
    // Only absolute imports for cross package
    'no-restricted-imports': [
      'error',
      {
        patterns: [{
          group: ['../*'],
          message: 'Usage of relative parent imports is discouraged. Please use absolute paths or package imports (@ously/...).'
        }]
      }
    ],
    // React rules
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
    '@typescript-eslint/no-empty-object-type': 'off'
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  overrides: [
    {
      files: ['apps/**/*.tsx'],
      rules: {
        'react/forbid-elements': [
          'warn',
          {
            forbid: [
              { element: 'div', message: 'Use <Box> or other layout components from @ously/ui instead.' },
              { element: 'span', message: 'Use <Text> from @ously/ui instead.' },
              { element: 'button', message: 'Use <Button> from @ously/ui instead.' },
              { element: 'p', message: 'Use <Text> from @ously/ui instead.' },
              { element: 'h1', message: 'Use <Heading> from @ously/ui instead.' },
              { element: 'h2', message: 'Use <Heading> from @ously/ui instead.' },
              { element: 'h3', message: 'Use <Heading> from @ously/ui instead.' },
              { element: 'h4', message: 'Use <Heading> from @ously/ui instead.' },
              { element: 'h5', message: 'Use <Heading> from @ously/ui instead.' },
              { element: 'h6', message: 'Use <Heading> from @ously/ui instead.' }
            ]
          }
        ]
      }
    },
    {
      files: ['packages/ui/src/**/*.tsx', 'packages/ui/src/**/*.ts'],
      rules: {
        'no-restricted-imports': 'off'
      }
    }
  ]
};
