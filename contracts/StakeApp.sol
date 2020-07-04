// SPDX-License-Identifier: MIT
pragma solidity >= 0.4 .21 < 0.7 .0;

import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/IERC20.sol";

contract StakeApp {
    IERC20 private stakingToken;

    mapping(address => uint)private balances;

    constructor(address tokenAddress)public {
        stakingToken = IERC20(address(tokenAddress));
    }

    function balanceOfOwner()external view returns(uint256) {
        return stakingToken.balanceOf(address(this));
    }

    function balanceOf(address _address)external view returns(uint) {
        return balances[_address];
    }

    event ReceivedTokens(uint256 amount, address fromAccount);

    function sendOceans(uint256 _amount)external payable {
        stakingToken.transferFrom(msg.sender, address(this), _amount);
        balances[msg.sender] += _amount;
        balances[address(this)] += _amount;
        emit ReceivedTokens(_amount, msg.sender);
    }

    function getOceans(uint _amount)external {
        if (_amount > balances[msg.sender]) {
            revert("Insufficient amount.");
        }
        balances[msg.sender] -= _amount;
        balances[address(this)] -= _amount;
        stakingToken.transfer(address(msg.sender), _amount);
    }
}
