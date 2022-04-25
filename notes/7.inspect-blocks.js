const Web3 = require("web3");

//从infura获取的远程节点
const web3 = new Web3(
  "https://mainnet.infura.io/v3/eb8ed0c993e5475f8c1b228bfb224e47"
);

//获取最新区块信息
// web3.eth.getBlock("latest").then(console.log);

/* 获取最新区块号 */
// web3.eth.getBlockNumber().then(console.log);

// web3.eth.getBlock("latest").then((block) => {
//   console.log(`
//   "blockHash: ${block.hash},
//   "blockNumber: ${block.number}`);
// });
