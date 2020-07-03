// SPDX-License-Identifier: MIT
pragma solidity >= 0.4 .21 < 0.7 .0;

import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";

contract DemoToken is ERC20 {
    uint256 public constant INITIAL_SUPPLY = 1000000000000000000000;

    constructor()public ERC20("Demo Coin", "DCT") {
        _mint(msg.sender, INITIAL_SUPPLY);
    }
}
