const fs = require("fs");
const exec = require("child_process").exec;

let deploymentData = JSON.parse(
  fs.readFileSync("./scripts/data/deploymentData.txt")
);
let addresses = deploymentData.addresses;
Object.keys(deploymentData.addresses).map((addressName) => {
  let execString =
    `npx hardhat verify --network matic ${addresses[addressName]} ` +
    (Object.keys(deploymentData.deploymentVars).includes(addressName) === true
      ? deploymentData.deploymentVars[addressName].join(" ")
      : "");
  console.log(execString);
  exec(execString, function (err, stdout, stderr) {
    if (err) {
      // should have err.code here?
    }
    console.log(stdout);
  });
});
