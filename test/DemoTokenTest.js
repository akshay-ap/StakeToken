const DemoToken = artifacts.require("DemoToken");

contract("DemoToken", accounts => {
    it("should put have DemoTokens name as TCI Coin", () => DemoToken.deployed().then(instance => instance.name.call()).then(name => {
        assert.equal(name, "TCI Coin", "Incorrect token name");
    }));

    // it("test supply", () => DemoToken.deployed().then(instance => instance.totalSupply.call()).then(supply => {
    //     console.log(supply.valueOf())
    //     assert.equal(supply.valueOf(), 10000, "10000 wasn't in the first account");
    // }));

    // it("should call a function that depends on a linked library", () => {
    //     let meta;
    //     let metaCoinBalance;
    //     let metaCoinEthBalance;

    //     return MetaCoin.deployed().then(instance => {
    //         meta = instance;
    //         return meta.getBalance.call(accounts[0]);
    //     }).then(outCoinBalance => {
    //         metaCoinBalance = outCoinBalance.toNumber();
    //         return meta.getBalanceInEth.call(accounts[0]);
    //     }).then(outCoinBalanceEth => {
    //         metaCoinEthBalance = outCoinBalanceEth.toNumber();
    //     }).then(() => {
    //         assert.equal(metaCoinEthBalance, 2 * metaCoinBalance, "Library function returned unexpected function, linkage may be broken");
    //     });
    // });

    // it("should send coin correctly", () => {
    //     let meta;

    //     // Get initial balances of first and second account.
    //     const account_one = accounts[0];
    //     const account_two = accounts[1];

    //     let account_one_starting_balance;
    //     let account_two_starting_balance;
    //     let account_one_ending_balance;
    //     let account_two_ending_balance;

    //     const amount = 10;

    //     return MetaCoin.deployed().then(instance => {
    //         meta = instance;
    //         return meta.getBalance.call(account_one);
    //     }).then(balance => {
    //         account_one_starting_balance = balance.toNumber();
    //         return meta.getBalance.call(account_two);
    //     }).then(balance => {
    //         account_two_starting_balance = balance.toNumber();
    //         return meta.sendCoin(account_two, amount, {from: account_one});
    //     }).then(() => meta.getBalance.call(account_one)).then(balance => {
    //         account_one_ending_balance = balance.toNumber();
    //         return meta.getBalance.call(account_two);
    //     }).then(balance => {
    //         account_two_ending_balance = balance.toNumber();

    //         assert.equal(account_one_ending_balance, account_one_starting_balance - amount, "Amount wasn't correctly taken from the sender");
    //         assert.equal(account_two_ending_balance, account_two_starting_balance + amount, "Amount wasn't correctly sent to the receiver");
    //     });
    // });
});
