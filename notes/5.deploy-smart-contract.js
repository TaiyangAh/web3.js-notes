const EthereumTx = require("ethereumjs-tx").Transaction;
const Web3 = require("web3");
/* deploy a smart contract */

//使用infura提供的远程ropsten测试网节点
const web3 = new Web3(
  "https://ropsten.infura.io/v3/eb8ed0c993e5475f8c1b228bfb224e47"
);

const account1 = "0x853bFDF175EEdcA95a013e4A6091c9b7b68f055E";

// console.log(process.env.PRIVATE_KEY_1);
const privateKey1 = Buffer.from(process.env.PRIVATE_KEY_1, "hex");

web3.eth.getTransactionCount(account1, (err, txCount) => {
  //smart contract data,编译后的十六进制合约代码对象,注意必须额外加上前缀0x
  const data =
    "0x608060405234801561001057600080fd5b50610150806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c80632e64cec11461003b5780636057361d14610059575b600080fd5b610043610075565b60405161005091906100d9565b60405180910390f35b610073600480360381019061006e919061009d565b61007e565b005b60008054905090565b8060008190555050565b60008135905061009781610103565b92915050565b6000602082840312156100b3576100b26100fe565b5b60006100c184828501610088565b91505092915050565b6100d3816100f4565b82525050565b60006020820190506100ee60008301846100ca565b92915050565b6000819050919050565b600080fd5b61010c816100f4565b811461011757600080fd5b5056fea2646970667358221220404e37f487a89a932dca5e77faaf6ca2de3b991f93d230604b1b8daaef64766264736f6c63430008070033";
  //1.create the transaction
  const txObject = {
    nonce: web3.utils.toHex(txCount),
    gasLimit: web3.utils.toHex(100000),
    gasPrice: web3.utils.toHex(web3.utils.toWei("10", "gwei")),
    data: data,
  };

  //2.sign the transaction
  const tx = new EthereumTx(txObject, { chain: "ropsten" });
  tx.sign(privateKey1);

  const serializedTransaction = tx.serialize();
  const raw = "0x" + serializedTransaction.toString("hex");

  //3.broadcast the transaction
  web3.eth.sendSignedTransaction(raw, (err, txHash) => {
    console.log("txHash: ", txHash);
  });
});
