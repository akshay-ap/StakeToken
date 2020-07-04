// SPDX-License-Identifier: MIT
pragma solidity >= 0.4 .21 < 0.7 .0;
pragma experimental ABIEncoderV2;

import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/IERC20.sol";

contract StakeApp {
    IERC20 private stakingToken;

    struct AssetStake {
        string assetAddress;
        uint amount;
    }

    struct UserStakes {
        uint count;
        uint amount;
    }


    mapping(address => uint)private balances;
    mapping(address => AssetStake[])myStakesMapping;
    mapping(string => UserStakes)userStakesMapping;


    // Events
    event StakeEvent(address _from, uint _value, string did);
    event UnStakeEvent(address _from, uint _value, string did);

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

    function compareStrings(string memory a, string memory b)pure private returns(bool) {
        return(keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))));
    }


    function getMyStakes()public view returns(AssetStake[] memory) {
        return myStakesMapping[msg.sender];
    }

    function getStakesOf(address _address)public view returns(AssetStake[] memory) {
        return myStakesMapping[_address];
    }

    function getAllStakes(string[] memory dids)public view returns(UserStakes[] memory) {
        UserStakes[] memory result = new UserStakes[](dids.length);

        for (uint i = 0; i < dids.length; i ++) {
            result[i] = userStakesMapping[dids[i]];
        }
        return result;
    }

    function remove(uint index, AssetStake[] storage array)private returns(AssetStake[] storage) {
        if (index >= array.length) 
            return array;
        


        for (uint i = index; i < array.length - 1; i ++) {
            array[i] = array[i + 1];
        }
        delete array[array.length - 1];
        // array.length--;
        return array;
    }


    function addStake(uint _amount, string calldata _did)payable external {

        stakingToken.transferFrom(msg.sender, address(this), _amount);
        // balances[address(this)] += _amount;

        AssetStake[] storage m = myStakesMapping[msg.sender];
        balances[msg.sender] += _amount;

        for (uint i = 0; i < m.length; i ++) {
            if (compareStrings(m[i].assetAddress, _did)) {
                userStakesMapping[_did].amount += _amount;
                m[i].amount = m[i].amount + _amount;
                emit StakeEvent(msg.sender, _amount, _did);
                return;
            }
        }

        m.push(AssetStake(_did, _amount));
        userStakesMapping[_did].amount += _amount;
        userStakesMapping[_did].count += 1;
        emit StakeEvent(msg.sender, _amount, _did);

    }

    function unStake(string calldata _did)external {

        AssetStake[] storage m = myStakesMapping[msg.sender];
        uint i = 0;
        for (i = 0; i < m.length; i ++) {
            if (compareStrings(m[i].assetAddress, _did)) {

                stakingToken.transfer(address(msg.sender), m[i].amount);
                userStakesMapping[_did].count -= 1;
                userStakesMapping[_did].amount -= m[i].amount;
                balances[msg.sender] -= m[i].amount;
                emit UnStakeEvent(msg.sender, m[i].amount, _did);
                remove(i, m);
                return;
            }
        }
        revert("Amount not staked");
    }
}
