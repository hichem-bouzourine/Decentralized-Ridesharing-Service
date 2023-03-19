// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "./Client.sol";

contract Driver is Client {
    struct DriverStruct {
        address driverAddress;
        string fullName;
        string phoneNumber;
        string vehicleType;
        string licenseId;
        uint256 numberOfSeats;
    }

    DriverStruct[] public drivers;

    event DriverRegistered(address indexed driverAddress);
    event DriverLoggedIn(address indexed driverAddress);
    event DriverLoggedOut(address indexed driverAddress);

    function registerDriver(string memory _fullName, string memory _phoneNumber, string memory _vehicleType, string memory _licenseId, uint256 _numberOfSeats) public {
        User memory newUser = User({
            sender: msg.sender,
            fullName: _fullName,
            phoneNumber: _phoneNumber,
            loggedIn: false
        });

        users.push(newUser);

        DriverStruct memory newDriver = DriverStruct({
            driverAddress: msg.sender,
            fullName: _fullName,
            phoneNumber: _phoneNumber,
            vehicleType: _vehicleType,
            licenseId: _licenseId,
            numberOfSeats: _numberOfSeats
        });

        drivers.push(newDriver);

        emit DriverRegistered(msg.sender);
    }

    function loginDriver() public {
        require(isRegistered(msg.sender), "Driver not registered.");

        uint256 driverIndex = getDriverIndex(msg.sender);
        require(driverIndex != drivers.length, "Driver not found.");
        
        require(!users[driverIndex].loggedIn, "Driver already logged in.");

        users[driverIndex].loggedIn = true;

        emit DriverLoggedIn(msg.sender);
    }

    function logoutDriver() public {
        uint256 driverIndex = getDriverIndex(msg.sender);
        require(driverIndex != drivers.length, "Driver not found.");

        require(users[driverIndex].loggedIn, "Driver not logged in.");

        users[driverIndex].loggedIn = false;

        emit DriverLoggedOut(msg.sender);
    }

    function getDriverIndex(address _driverAddress) internal view returns (uint256) {
        for (uint256 i = 0; i < drivers.length; i++) {
            if (drivers[i].driverAddress == _driverAddress) {
                return i;
            }
        }
        revert("Driver not found.");
    }

}
