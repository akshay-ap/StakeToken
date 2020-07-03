import Web3 from "web3";
import StakeApp from "../../build/contracts/StakeApp.json";
// import IERC20 from "../../build/contracts/IERC20.json";

const App = {
    web3: null,
    account: null,
    meta: null,

    start: async function () {
        const {web3} = this;

        try { // get contract instance
            const networkId = await web3.eth.net.getId();
            const deployedNetwork = StakeApp.networks[networkId];
            console.log('deployment', deployedNetwork)

            this.meta = new web3.eth.Contract(StakeApp.abi, deployedNetwork.address,);
            // get accounts
            const accounts = await web3.eth.getAccounts();
            console.log('accounts', accounts);
            this.account = accounts[0];

            this.refreshBalance();
        } catch (error) {
            console.error("Could not connect to contract or chain.", error);
        }
    },

    refreshBalance: async function () {
        const {balanceOfOwner} = this.meta.methods;
        const balance = await balanceOfOwner().call();

        const balanceElement = document.getElementsByClassName("balance")[0];
        balanceElement.innerHTML = balance;
    },

    sendCoin: async function () {
        const amount = parseInt(document.getElementById("amount").value);

        this.setStatus("Initiating transaction... (please wait)");

        const {sendOceans} = this.meta.methods;
        console.log(' this.account', this.account)
        await sendOceans(amount).send({from: this.account});

        this.setStatus("Transaction complete!");
        this.refreshBalance();
    },

    setStatus: function (message) {
        const status = document.getElementById("status");
        status.innerHTML = message;
    }
};

window.App = App;

window.addEventListener("load", function () {
    if (window.ethereum) { // use MetaMask's provider
        App.web3 = new Web3(window.ethereum);
        window.ethereum.enable(); // get permission to access accounts
    } else {
        console.warn("No web3 detected. Falling back to http://127.0.0.1:8545. You should remove this fallback when you deploy live",);
        // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
        App.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"),);
    } App.start();
});
