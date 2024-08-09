const hre = require("hardhat");
const { encryptDataField, decryptNodeResponse } = require("@swisstronik/utils");
const sendShieldedTransaction = async (signer, destination, data, value) => {
  const rpcLink = hre.network.config.url;
  const [encryptedData] = await encryptDataField(rpcLink, data);
  return await signer.sendTransaction({
    from: signer.address,
    to: destination,
    data: encryptedData,
    value,
  });
};

async function main() {
  const contractAddress = "0xd8D7cFd81489C3aA13264Ac38f48De37d575ad46";
  const [signer] = await hre.ethers.getSigners();

  const contractFactory = await hre.ethers.getContractFactory("SwissTronikPerc20");
  const contract = contractFactory.attach(contractAddress);

  const functionName = "receive";
  const mint100TokensTx = await sendShieldedTransaction(
    signer,
    contractAddress,
    "",
    0
  );

  await mint100TokensTx.wait();

  console.log("Transaction Receipt: ", mint100TokensTx.hash);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});