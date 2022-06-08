/* eslint-disable prettier/prettier */
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['module:react-native-dotenv'],
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: ['.ts', '.tsx', '.jsx', '.js'],
        alias: {
          assets: './src/assets',
          components: './src/components',
          navigation: './src/navigation',
          screens: './src/screens',
          store: './src/store',
          types: './src/types',
          utils: './src/utils',
          config: './src/config',
        },
      },
    ],
  ],
};
