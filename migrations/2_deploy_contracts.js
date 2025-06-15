const Shop = artifacts.require("Shop");
const TaskRewards = artifacts.require("TaskRewards");

module.exports = function (deployer) {
  // Deploy Shop contract
  deployer.deploy(Shop).then(() => {
    // Deploy TaskRewards contract without any parameters
    return deployer.deploy(TaskRewards);
  });
};
