// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "./Client.sol";
import "./Driver.sol";

contract Ride {
    struct Order {
        address driver;
        string startLocation;
        string endLocation;
        uint256 price; // TODO: Static !!
        address passengerAddress;
        bool completed;
    }
    address owner;
    
    constructor (address _owner) {
        owner = _owner;
    }

    Order[] public orders;
    
    function createOrder(address _driver, string memory _startLocation, string memory _endLocation, uint256 _price) public returns (uint256) {
        uint256 orderId = orders.length;
        orders.push(Order(_driver, _startLocation, _endLocation, _price, msg.sender, false));
        return orderId;
    }
    
    function getOrder(uint256 _orderId) public view returns (Order memory) {
        return orders[_orderId];
    }
    
    function completeOrder(uint256 _orderId) public {
        Order storage order = orders[_orderId];
        require(msg.sender == order.passengerAddress || msg.sender == order.driver, "Only the passenger or driver can complete the order.");
        order.completed = true;
    }

    /**
    * TRANSFERING MONEY SECTION 
    */ 
    
    event Transfer(address from, address to, uint256 amount );

    struct TransfertStruct {
        address sender;
        address to;
        uint amount;
    }
    // use event to share this contract.
    TransfertStruct[] transactions;

    // payable address refers to a Ethereum address that can receive ethers transfers
    function transfer(address payable to, uint amount) payable public{   
        uint fee = amount/10;
        
        uint remainingAmount = amount - fee;

        (bool sent, ) = to.call{value: remainingAmount}("");
        require(sent, "Failed to send Ether");

        (bool sentFee, ) = owner.call{value: fee}("");
        require(sentFee, "Failed to send Ether");
        
        // the object msg we immediatly get when we call a specific function in the blockchain
        transactions.push(TransfertStruct(msg.sender, to, remainingAmount));
        transactions.push(TransfertStruct(msg.sender, owner, fee));

        // to actually make the transfert, we have to emit the Transfert event 
        emit Transfer((msg.sender), to, remainingAmount);
        emit Transfer((msg.sender), owner, fee);
    }

    function getAllTransactions() public view returns (TransfertStruct[] memory){
        return transactions;
    }

}
