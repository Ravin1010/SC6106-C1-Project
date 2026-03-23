import hre from "hardhat";

async function main() {

  const PayNow = await hre.ethers.getContractFactory("paynow");

  const paynow = await PayNow.deploy();

  await paynow.waitForDeployment();

  console.log("PayNow deployed to:", await paynow.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});