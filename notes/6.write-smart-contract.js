const EthereumTx = require("ethereumjs-tx").Transaction;
const Web3 = require("web3");
const { isContractAddressInBloom } = require("web3-utils");
/* 调用合约函数发送请求 */

//使用infura提供的远程ropsten测试网节点
const web3 = new Web3(
  "https://ropsten.infura.io/v3/eb8ed0c993e5475f8c1b228bfb224e47"
);

const account1 = "0x853bFDF175EEdcA95a013e4A6091c9b7b68f055E";

const privateKey1 = Buffer.from(process.env.PRIVATE_KEY_1, "hex");

//准备合约地址与ABI
const contractAddress = "0xC125cA25b20C9d2eE1Fe3B18746611299F825D21";
const contractABI = [
  {
    inputs: [],
    name: "retrieve",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "num", type: "uint256" }],
    name: "store",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const myDeployedContract = new web3.eth.Contract(contractABI, contractAddress);

const data = myDeployedContract.methods.store(5).encodeABI();

// console.log(data);

web3.eth.getTransactionCount(account1, (err, txCount) => {
  //1.create the transaction
  const txObject = {
    nonce: web3.utils.toHex(txCount),
    gasLimit: web3.utils.toHex(100000),
    gasPrice: web3.utils.toHex(web3.utils.toWei("10", "gwei")),
    to: contractAddress,
    data: data,
  };

  //2.sign the transaction
  const tx = new EthereumTx(txObject, { chain: "ropsten" });
  tx.sign(privateKey1);

  const serializedTransaction = tx.serialize();
  const raw = "0x" + serializedTransaction.toString("hex");

  //3.broadcast the transaction
  web3.eth.sendSignedTransaction(raw, (err, txHash) => {
    console.log("err: ", err, "txHash: ", txHash);
  });
});

// 检查调用store合约store函数写入的结果,用retrieve()取出
myDeployedContract.methods.retrieve().call((err, number) => {
  console.log("err: ", err, "number: ", number);
});
