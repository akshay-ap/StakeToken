// SPDX-License-Identifier: MIT
pragma solidity >= 0.4 .21 < 0.7 .0;

import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/IERC20.sol";

contract StakeApp {
    IERC20 private stakingToken;

    constructor(address tokenAddress)public {
        stakingToken = IERC20(address(tokenAddress));
    }

    function balanceOfOwner()external view returns(uint256) {
        return stakingToken.balanceOf(address(this));
    }

    event YayIReceivedTokens(uint256 amount, address fromAccount, uint256 totalBalance);

    function sendOceans(uint256 _amount)external payable {
        stakingToken.transferFrom(msg.sender, address(this), _amount);
        emit YayIReceivedTokens(_amount, msg.sender, stakingToken.balanceOf(address(this)));
    }

    function getOceans(uint256 _amount)external payable {
        stakingToken.transfer(address(msg.sender), _amount);
    }
}
