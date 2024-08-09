const { ethers } = require("hardhat");

async function main() {
  const perc20 = await ethers.deployContract("SwissTronikPerc20");
    // Wait for the transaction to be mined
  await perc20.waitForDeployment();

  console.log(`SwissTronikPerc20 was deployed to ${await perc20.getAddress()}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// The deployed() function is no longer available on the contract instance returned by deployContract(). 
// Instead, the contract is considered deployed as soon as deployContract() resolves.
// this modified script solved the error of "TypeError: perc20.deployed is not a function"