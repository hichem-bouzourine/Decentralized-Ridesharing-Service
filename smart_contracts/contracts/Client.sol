// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Client {
    struct User {
        address sender;
        string fullName;
        string phoneNumber;        
        bool loggedIn;
    }

    User[] public users;

    event UserRegistered(address indexed sender);
    event UserLoggedIn(address indexed sender);
    event UserLoggedOut(address indexed sender);

    function registerUser(string memory _fullName, string memory _phoneNumber) public {
        User memory newUser = User({
            sender: msg.sender,
            fullName: _fullName,
            phoneNumber: _phoneNumber,
            loggedIn: false
        });
        users.push(newUser);
        emit UserRegistered(msg.sender);
    }

    function loginUser() public {
        User storage user = findUser(msg.sender);
        require(user.sender == msg.sender, "User not registered.");
        require(!user.loggedIn, "User already logged in.");
        user.loggedIn = true;
        emit UserLoggedIn(msg.sender);
    }

    function logoutUser() public {
        User storage user = findUser(msg.sender);
        require(user.sender == msg.sender, "User not registered.");
        require(user.loggedIn, "User not logged in.");
        user.loggedIn = false;
        emit UserLoggedOut(msg.sender);
    }

    function isRegistered(address _userAddress) public view returns(bool) {
        for (uint i = 0; i < users.length; i++) {
            if (users[i].sender == _userAddress) {
                return true;
            }
        }
        return false;
    }

    function findUser(address _userAddress) private view returns(User storage) {
        for (uint i = 0; i < users.length; i++) {
            if (users[i].sender == _userAddress) {
                return users[i];
            }
        }
        revert("User not found.");
    }
}
