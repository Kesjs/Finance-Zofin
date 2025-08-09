module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: [
            'last 2 Chrome versions',
            'last 2 Firefox versions',
            'last 2 Safari versions',
            'last 2 Edge versions',
            'not dead'
          ]
        },
        useBuiltIns: 'usage',
        corejs: 3,
        modules: false,
        loose: true,
        debug: false
      }
    ],
    '@babel/preset-react',
    '@babel/preset-typescript'
  ],
  plugins: [
    // Optimisations pour React
    '@babel/plugin-transform-react-jsx',
    '@babel/plugin-transform-runtime',
    // Optimisations de performance
    '@babel/plugin-transform-arrow-functions',
    '@babel/plugin-transform-block-scoping',
    '@babel/plugin-transform-classes',
    '@babel/plugin-transform-computed-properties',
    '@babel/plugin-transform-destructuring',
    '@babel/plugin-transform-parameters',
    '@babel/plugin-transform-shorthand-properties',
    '@babel/plugin-transform-spread',
    '@babel/plugin-transform-template-literals',
    // Optimisations de taille
    'babel-plugin-transform-remove-undefined',
    'babel-plugin-transform-remove-console',
    'babel-plugin-transform-remove-debugger'
  ],
  env: {
    production: {
      plugins: [
        'transform-react-remove-prop-types',
        'transform-react-constant-elements',
        'transform-react-inline-elements'
      ]
    }
  }
}; 