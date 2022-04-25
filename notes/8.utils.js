const Web3 = require("web3");

//从infura获取的远程节点
const web3 = new Web3(
  "https://mainnet.infura.io/v3/eb8ed0c993e5475f8c1b228bfb224e47"
);

// web3.eth.getGasPrice().then((res) => {
//   console.log(web3.utils.fromWei(res, "ether"));
// });

console.log(web3.utils.sha3("123"));
