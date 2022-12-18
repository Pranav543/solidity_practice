const { assert } = require("chai");
const { network, getNamedAccounts, deployments, ethers } = require("hardhat");
const { developmentChains, networkConfig } = require("../../helper-hardhat-config");

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("Raffle Unit Test", async () => {
          let raffle, vrfCoordinatorV2Mock, chainId;
          beforeEach(async () => {
              const { deployer } = await getNamedAccounts();
              chainId = network.config.chainId;
              await deployments.fixture(["all"]);
              raffle = await ethers.getContract("Raffle", deployer);
              vrfCoordinatorV2Mock = await ethers.getContract("VRFCoordinatorV2Mock", deployer);
          });

          describe("constructor", async () => {
              it("initializes the raffle correctly", async () => {
                  // ideally we have only one assert per "it"
                  const interval = await raffle.getInterval();
                  const raffleState = await raffle.getRaffleState();
                  assert.equal(raffleState.toString(), "0");
                  assert.equal(interval.toString(), networkConfig[chainId]["interval"]);
              });
          });
      });
