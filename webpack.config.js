const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function(env, argv) {
    const config = await createExpoWebpackConfigAsync({
        ...env,
        offline: true,
        babel: {
            dangerouslyAddModulePathsToTranspile: ['@ui-kitten/components']
        },
    }, argv)
    config.resolve.alias['react-native-modal'] = 'modal-enhanced-react-native-web'
    return config;
};
