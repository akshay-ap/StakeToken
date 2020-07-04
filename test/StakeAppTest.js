const StakeApp = artifacts.require("StakeApp");

contract("StakeApp", accounts => {

    it("Initial contract balance", () => StakeApp.deployed().then(instance => instance.balanceOfOwner.call().then((res) => {
        assert.equal(res.valueOf(), 0)
    })));


    it("Stake did", () => StakeApp.deployed().then(instance => {

        instance => instance.balanceOf.call(accounts[0]).then((res) => {
            assert.equal(res.valueOf(), 0)
        });

        instance.addStake.call('100', 100).then((res) => {
            assert.equal(res.valueOf(), 0)

            instance.getMyStakes.call('100', 100).then((res) => {
                console.log('res', res)
                assert.equal(res.valueOf(), 0)
            })
        })
    }));

    // it("Initial send tokens to contract", () => StakeApp.deployed().then(instance => instance.sendOceans.call(accounts[0], 100).then((res) => {
    //     assert.equal(res.valueOf(), 0)
    //     instance.balanceOfOwner.call().then(val => assert.equal(val.toNumber(), 0));
    // })));


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
