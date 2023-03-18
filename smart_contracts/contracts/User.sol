// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "./Auth.sol";

contract User {
    struct UserProfile {
        string id;
        bytes32 passwordHash;
        bool isActive;
        address accountAddress;
        address blockchainAddress;
    }

    mapping(address => UserProfile) public userProfiles;

    Auth private auth;

    event UserProfileCreated(address indexed accountAddress);
    event UserProfileUpdated(address indexed accountAddress, string id, bytes32 passwordHash);
    event UserBlockchainAddressSet(address indexed accountAddress, address blockchainAddress);

    constructor(address _authContractAddress) {
        auth = Auth(_authContractAddress);
    }

    function createUser(string memory _id, bytes32 _passwordHash) public {
        require(userProfiles[msg.sender].accountAddress == address(0), "User profile already exists.");
        auth.registerUser(_id, "", _passwordHash);
        UserProfile memory newUserProfile = UserProfile({
            id: _id,
            passwordHash: _passwordHash,
            isActive: true,
            accountAddress: msg.sender,
            blockchainAddress: address(0)
        });
        userProfiles[msg.sender] = newUserProfile;
        emit UserProfileCreated(msg.sender);
    }

    function updateUser(string memory _id, bytes32 _passwordHash) public {
        require(userProfiles[msg.sender].accountAddress != address(0), "User profile does not exist.");
        require(auth.isRegistered(msg.sender), "User is not registered.");
        userProfiles[msg.sender].id = _id;
        userProfiles[msg.sender].passwordHash = _passwordHash;
        emit UserProfileUpdated(msg.sender, _id, _passwordHash);
    }

    function setUserBlockchainAddress(address _blockchainAddress) public {
        require(userProfiles[msg.sender].accountAddress != address(0), "User profile does not exist.");
        userProfiles[msg.sender].blockchainAddress = _blockchainAddress;
        emit UserBlockchainAddressSet(msg.sender, _blockchainAddress);
    }

    function getUserProfile(address _userAddress) public view returns (string memory, bool, address, address) {
        return (userProfiles[_userAddress].id, userProfiles[_userAddress].isActive, userProfiles[_userAddress].accountAddress, userProfiles[_userAddress].blockchainAddress);
    }
}
