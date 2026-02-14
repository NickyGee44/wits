const { composePlugins, withNx } = require('@nx/webpack');
const { withReact } = require('@nx/react');
const webpack = require('webpack');
const dotenv = require('dotenv');
const path = require('path');

// Nx plugins for webpack
module.exports = composePlugins(
  withNx(),
  withReact(),
  (config, { options, context }) => {
    // Determine if we're in production mode
    const isProduction = options.optimization;

    let envKeys = {};

    if (isProduction) {
      // In production, use the environment variables set in the environment
      envKeys = Object.keys(process.env).reduce((prev, next) => {
        if (next.startsWith('NEXT_PUBLIC_') || next.startsWith('NX_')) {
          prev[`process.env.${next}`] = JSON.stringify(process.env[next]);
        }
        return prev;
      }, {});
    } else {
      // In development, load from .env.local file
      const env =
        dotenv.config({ path: path.join(__dirname, '.env.local') }).parsed ||
        {};
      envKeys = Object.keys(env).reduce((prev, next) => {
        prev[`process.env.${next}`] = JSON.stringify(env[next]);
        return prev;
      }, {});
    }

    // Add these variables to the webpack build process using DefinePlugin
    config.plugins.push(new webpack.DefinePlugin(envKeys));

    return config;
  }
);
