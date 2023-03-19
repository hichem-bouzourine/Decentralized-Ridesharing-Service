import { ethers } from "hardhat";

const main = async () => {
  const Clients = await ethers.getContractFactory("Client");
  const client = await Clients.deploy();
  await client.deployed();

  const Drivers = await ethers.getContractFactory("Driver");
  const driver = await Drivers.deploy();
  await driver.deployed();

  const Rides = await ethers.getContractFactory("Ride");
  const ride = await Rides.deploy(
    "0xE07c2f3A0aadCc637a9C90C166EB3E2cae37d30e" as any
  );
  await ride.deployed();

  console.log(
    `
    Client Address:${client.address}
    Driver Address:${driver.address}
    Ride Address:${ride.address}
    `
  );
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
