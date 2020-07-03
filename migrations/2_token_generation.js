const demoToken = artifacts.require("DemoToken");

module.exports = function (deployer) {
    deployer.deploy(demoToken)
}
