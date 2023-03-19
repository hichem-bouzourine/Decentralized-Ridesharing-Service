// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract AnnounceSharing {
    address public owner;

    struct Order {
        address driver;
        string startLocation;
        string endLocation;
        uint256 price;
        uint256 maxPassengers;
        uint256 numPassengers;
        string[] passengers;
        bool completed;
    }

    Order[] public orders;

    event NewOrder(address indexed driver, uint256 orderId);
    event OrderJoined(address indexed passenger, uint256 orderId);

    constructor() {
        owner = msg.sender;
    }

    function createOrder(string memory _startLocation, string memory _endLocation, uint256 _price, uint256 _maxPassengers) public {
        Order memory newOrder = Order({
            driver: msg.sender,
            startLocation: _startLocation,
            endLocation: _endLocation,
            price: _price,
            maxPassengers: _maxPassengers,
            numPassengers: 0,
            passengers: new string[](_maxPassengers),
            completed: false
        });
        orders.push(newOrder);
        emit NewOrder(msg.sender, orders.length - 1);
    }

    function getOrders() public view returns (Order[] memory) {
        return orders;
    }

    function joinOrder(uint256 _orderId) public {
        Order storage order = orders[_orderId];
        require(order.numPassengers < order.maxPassengers, "Order is full.");
        require(!order.completed, "Order has already been completed.");
        order.passengers[order.numPassengers] = "passenger";
        order.numPassengers += 1;
        emit OrderJoined(msg.sender, _orderId);
    }

    function cancelOrder(uint256 _orderId) public {
        Order storage order = orders[_orderId];
        require(order.driver == msg.sender || owner == msg.sender, "Only the driver or contract owner can cancel an order.");
        order.completed = true;
    }
}
