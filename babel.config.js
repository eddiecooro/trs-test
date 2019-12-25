module.exports = {
  env: {
    production: {
      plugins: ['transform-remove-console'],
    },
  },
  plugins: [
    ['@babel/plugin-proposal-optional-chaining'],
    [
      'module-resolver',
      {
        alias: {
          assets: './src/assets',
          gate: './src/gate',
          helpers: './src/helpers',
          hooks: './src/view/hooks',
          i18n: './src/i18n',
          routes: './src/routes',
          store: './src/store',
          view: './src/view',
        },
        root: ['./src'],
      },
    ],
  ],
  presets: [
    'module:metro-react-native-babel-preset',
    'module:react-native-dotenv',
  ],
};
