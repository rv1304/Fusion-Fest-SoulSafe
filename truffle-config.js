/**
 * Use this file to configure your Truffle project.
 * You can modify it to suit your project requirements.
 *
 * For more information about configuration, visit:
 * https://trufflesuite.com/docs/truffle/reference/configuration
 */

module.exports = {
  // Network configuration
  networks: {
    // Local development network (e.g., Ganache)
    development: {
      host: "127.0.0.1",    // Localhost (default)
      port: 7545,           // Port where Ganache is running
      network_id: "*",      // Match any network ID
    },
    // Additional networks can be configured here
  },

  // Mocha configuration for testing
  mocha: {
    // timeout: 100000, // Uncomment to customize the test timeout
  },

  // Solidity compiler configuration
  compilers: {
    solc: {
      version: "0.8.0", // Specify Solidity compiler version
      // Uncomment and modify for advanced compiler options
      // settings: {
      //   optimizer: {
      //     enabled: true,
      //     runs: 200,
      //   },
      //   evmVersion: "byzantium",
      // },
    },
  },

  // Truffle DB configuration (disabled by default)
  db: {
    enabled: false,
  },
};
