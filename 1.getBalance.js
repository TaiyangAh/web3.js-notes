const Web3 = require("web3");

//本地ganache测试网
const web3 = new Web3("HTTP://127.0.0.1:7545");

const address = "0x4e42D8A8fe8eA9f1EBdAB94a30f69281500d0fae";

web3.eth.getBalance(address, (err, res) => {
  console.log(web3.utils.fromWei(res,"ether"));
});
