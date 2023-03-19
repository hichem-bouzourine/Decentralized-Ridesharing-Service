import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.18",
  networks: {
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/StGkgKIu3glJOF238mSfTOY-c6B9d09P",
      accounts: [
        "70318cb0384bcb57bf71c3ff54c705861ca76f457819f6d3f078811cfd5f0cb2",
      ],
    },
  },
  etherscan: {
    apiKey: { sepolia: "D6ZPAS49BFYJ349997QESNNH8QY43PSYZQ" },
  },
};

export default config;
