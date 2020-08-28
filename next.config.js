const { withExpo } = require('@expo/next-adapter');
const { withUnimodules } = require('@expo/webpack-config/addons');
const withImages = require('next-images');

const customExpoConfig = {
  ...withExpo(),
  webpack(nextConfig, options) {
    const babel = {
      dangerouslyAddModulePathsToTranspile: [
        '@ui-kitten',
      ],
    };

    const expoConfig = withUnimodules(
      nextConfig,
      { projectRoot: __dirname, babel },
      { supportsFontLoading: false },
    );

    if (expoConfig.output && nextConfig.output) {
      expoConfig.output.publicPath = nextConfig.output.publicPath;
    }

    if (typeof nextConfig.webpack === 'function') {
      return nextConfig.webpack(expoConfig, options);
    }

    expoConfig.resolve.alias['react-native-modal'] = 'modal-enhanced-react-native-web'
    return expoConfig;
  }
};

module.exports = withImages(
  customExpoConfig,
);