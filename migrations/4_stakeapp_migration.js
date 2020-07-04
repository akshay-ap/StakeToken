const demoToken = artifacts.require("DemoToken");
const StakeApp = artifacts.require("StakeApp");

module.exports = function (deployer) {
    deployer.deploy(StakeApp, demoToken.address)
}
