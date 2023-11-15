import '@nomicfoundation/hardhat-toolbox';
import { HardhatUserConfig } from 'hardhat/config';
import globalConfig from '../hardhat.config';

const config: HardhatUserConfig = {
  ...globalConfig,
  paths: {
    root: './src',
  },
};

export default config;
