import Web3 from "web3";
import StakeApp from "../../build/contracts/StakeApp.json";
import DemoToken from "../../build/contracts/DemoToken.json";

const App = {
    web3: null,
    account: null,
    meta: null,
    demotoken: null,

    start: async function () {
        const {web3} = this;

        try { // get contract instance
            const networkId = await web3.eth.net.getId();
            const deployedNetwork = StakeApp.networks[networkId];
            console.log('deployment', deployedNetwork)

            this.meta = new web3.eth.Contract(StakeApp.abi, deployedNetwork.address,);
            this.demotoken = new web3.eth.Contract(DemoToken.abi, DemoToken.networks[networkId].address,);
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
        const {balanceOfOwner, balanceOf, getStakesOf} = this.meta.methods;

        const balance = await balanceOfOwner().call();
        const balanceElement = document.getElementsByClassName("contract_balance")[0];
        balanceElement.innerHTML = balance;

        const userBalance = await balanceOf(this.account).call();
        const userbalanceElement = document.getElementsByClassName("user_balance")[0];
        userbalanceElement.innerHTML = userBalance;


        const userStakes = await getStakesOf(this.account).call();
        console.log('account stakes', userStakes)
        const userStakesElement = document.getElementsByClassName("user_stakes")[0];
        userStakesElement.innerHTML = userStakes;
    },

    sendToken: async function () {
        const amount = parseInt(document.getElementById("amount").value);
        const did = parseInt(document.getElementById("stake_did").value).toString();
        this.setStatus("Initiating transaction... (please wait)");

        const {addStake} = this.meta.methods;
        console.log('this.account', this.account)
        console.log('this.meta', this.meta)

        await addStake(amount, did).send({from: this.account});

        this.setStatus("Transaction complete!");
        this.refreshBalance();
    },

    getToken: async function () { // const amount = parseInt(document.getElementById("get_amount").value);
        const did = parseInt(document.getElementById("unstake_did").value).toString();

        this.setStatus("Initiating transaction... (please wait)");

        const {unStake} = this.meta.methods;
        console.log(' this.account', this.account)
        await unStake(did).send({from: this.account});

        this.setStatus("Transaction complete!");
        this.refreshBalance();
    },

    approve: async function () {},

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
