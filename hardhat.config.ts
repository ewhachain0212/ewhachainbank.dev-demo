import * as dotenv from "dotenv";

import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-ethers"
import "@typechain/hardhat";

dotenv.config();

// 더 자세한 설정법은 https://hardhat.org/config/ 에서 확인해주세요.
const config: HardhatUserConfig = {
  solidity: "0.8.9",
  networks: {
    PolygonMumbai: {
      url: "https://polygon-mumbai.infura.io/v3/4458cf4d1689497b9a38b1d6bbf05e78",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
  }
};

export default config;