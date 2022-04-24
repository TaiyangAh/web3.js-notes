const EthereumTx = require("ethereumjs-tx").Transaction;
const Web3 = require("web3");
/* create a raw transaction */

//使用infura提供的远程ropsten测试网节点
const web3 = new Web3(
  "https://ropsten.infura.io/v3/eb8ed0c993e5475f8c1b228bfb224e47"
);

const account1 = "0x853bFDF175EEdcA95a013e4A6091c9b7b68f055E";
const account2 = "0x223bE8b015891885C6f88446D23ea92Ba56CDd99";

const privateKey1 = Buffer.from(process.env.PRIVATE_KEY_1, "hex");

// console.log(process.env.PRIVATE_KEY_1);

web3.eth.getTransactionCount(account1, (err, txCount) => {
  //1.build the transaction
  const txObject = {
    nonce: web3.utils.toHex(txCount),
    to: account2,
    value: web3.utils.toHex(web3.utils.toWei("1", "ether")),
    gasLimit: web3.utils.toHex(21000),
    gasPrice: web3.utils.toHex(web3.utils.toWei("10", "gwei")),
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

/* 检查余额变化 */
web3.eth.getBalance(account1, (err, bal) => {
  console.log("accout1: ", web3.utils.fromWei(bal, "ether"));
});

web3.eth.getBalance(account2, (err, bal) => {
  console.log("accout2: ", web3.utils.fromWei(bal, "ether"));
});
