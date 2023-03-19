// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "./AnnounceSharing.sol";

contract AnnounceManager {
    address public owner;

    AnnounceSharing[] public announces;

    event NewAnnounce(address indexed owner, address indexed announceAddress);
    event OrderCreated(address indexed driver, uint256 orderId, uint256 announceId);
    event OrderJoined(address indexed passenger, uint256 orderId, uint256 announceId);
    event OrderCanceled(uint256 orderId, uint256 announceId);

    constructor() {
        owner = msg.sender;
    }

    function createAnnounce() public returns (AnnounceSharing) {
        AnnounceSharing newAnnounce = new AnnounceSharing();
        announces.push(newAnnounce);
        emit NewAnnounce(msg.sender, address(newAnnounce));
        return newAnnounce;
    }

    function createOrder(uint256 _announceId, string memory _startLocation, string memory _endLocation, uint256 _price, uint256 _maxPassengers) public {
        AnnounceSharing announce = announces[_announceId];
        announce.createOrder(_startLocation, _endLocation, _price, _maxPassengers);
        uint256 orderId = announce.getOrders().length - 1;
        emit OrderCreated(msg.sender, orderId, _announceId);
    }


    function joinOrder(uint256 _announceId, uint256 _orderId) public {
        AnnounceSharing announce = announces[_announceId];
        announce.joinOrder(_orderId);
        emit OrderJoined(msg.sender, _orderId, _announceId);
    }

    function cancelOrder(uint256 _announceId, uint256 _orderId) public {
        AnnounceSharing announce = announces[_announceId];
        announce.cancelOrder(_orderId);
        emit OrderCanceled(_orderId, _announceId);
    }

    function getAnnounces() public view returns (AnnounceSharing[] memory) {
        return announces;
    }

    function getOrders(uint256 _announceId) public view returns (AnnounceSharing.Order[] memory) {
        AnnounceSharing announce = announces[_announceId];
        return announce.getOrders();
    }
}
