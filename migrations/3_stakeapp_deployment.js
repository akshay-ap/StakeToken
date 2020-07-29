const stakeApp = artifacts.require("StakeApp");
const demoToken = artifacts.require("DemoToken");

module.exports = function (deployer) {
  deployer.deploy(stakeApp, demoToken.address);
};
