const Web3 = require("web3");
/* create a transaction with Ganache*/

//本地ganache测试网
const web3 = new Web3("HTTP://127.0.0.1:7545");

const account1 = "0x4e42D8A8fe8eA9f1EBdAB94a30f69281500d0fae";
const account2 = "0x995b76a43510c3592Fd2d7A23A6cF697B548BCA4";

// web3.eth.getBalance(account1, (err, res) => {
//   console.log(res);
// });

web3.eth.sendTransaction({
  from: account1,
  to: account2,
  value: web3.utils.toWei("1", "ether"),
});

// web3.eth.getBalance(account1, (err, res) => {
//   console.log(res);
// });
