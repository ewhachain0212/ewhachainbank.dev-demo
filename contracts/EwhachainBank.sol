//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EwhachainBank {
    mapping(address => uint) public balances;

    receive() external payable {}

    event depositEvent(uint _amount, address _depositor);
    event withdrawEvent(uint _amount, address _depositor, address _beneficiary);


    function deposit() public payable {
        require(msg.value != 0, "EwhachainBank : Deposit amount cannot be Zero");
        balances[msg.sender] += msg.value;

        emit depositEvent(msg.value, msg.sender);
    }

    function withdraw(address _recipient, uint _amount) public {
        require(_recipient != address(0), "EwhachainBank : Cannot send to Address Zero");
        require(_amount <= balances[msg.sender], "EwhachainBank : Insufficient Balance");

        balances[msg.sender] -= _amount;
        _safeTransferETH(_recipient, _amount); // 돈 인출

        emit withdrawEvent(_amount, msg.sender, _recipient);
    }

    function getBalance(address _addr) public view returns(uint){
        return balances[_addr];
    }

    /* ========= Private Functions ========= */
    //native token => 컨트랙트 전달 할 때, low level call을 사용
    function _safeTransferETH(address _to, uint256 _value) internal {
        (bool success, ) = _to.call{value: _value}(new bytes(0));
        require(success, "ETH_TRANSFER_FALIED");
    }
}
