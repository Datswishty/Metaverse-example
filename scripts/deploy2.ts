// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers, upgrades } from "hardhat";
import { writeFileSync, appendFileSync } from "fs";
import { Contract, ContractFactory } from "ethers";

async function main(): Promise<void> {
  let exportObject: any = {
    addresses: {},
    deploymentVars: {
      diamond: [], // this need
      Token: [], // this need treasury address
    },
  };
  const accounts = await ethers.getSigners();
  const contractOwner = accounts[0];

  const FacetCutAction = { Add: 0, Replace: 1, Remove: 2 };

  interface LooseObject {
    [key: string]: any;
  }

  function getSelectors(contract: Contract) {
    const signatures = Object.keys(contract.interface.functions);
    const selectors: LooseObject = signatures.reduce(
      (acc: String[], val: string) => {
        if (val !== "init(bytes)") {
          acc.push(contract.interface.getSighash(val));
        }
        return acc;
      },
      []
    );

    selectors.contract = contract;
    selectors.remove = remove;
    selectors.get = get;
    return selectors;
  }

  // used with getSelectors to remove selectors from an array of selectors
  // functionNames argument is an array of function signatures

  function remove(this: any, functionNames: string[]) {
    const selectors = this.filter((v: string) => {
      for (const functionName of functionNames) {
        if (v === this.contract.interface.getSighash(functionName)) {
          return false;
        }
      }
      return true;
    });
    selectors.contract = this.contract;
    selectors.remove = this.remove;
    selectors.get = this.get;
    return selectors;
  }

  // used with getSelectors to get selectors from an array of selectors
  // functionNames argument is an array of function signatures
  function get(this: any, functionNames: string[]) {
    const selectors = this.filter((v: string) => {
      for (const functionName of functionNames) {
        if (v === this.contract.interface.getSighash(functionName)) {
          return true;
        }
      }
      return false;
    });
    selectors.contract = this.contract;
    selectors.remove = this.remove;
    selectors.get = this.get;
    return selectors;
  }

  // deploy DiamondCutFacet
  const DiamondCutFacet: ContractFactory = await ethers.getContractFactory(
    "DiamondCutFacet"
  );
  const diamondCutFacet: Contract = await DiamondCutFacet.deploy();
  await diamondCutFacet.deployed();
  console.log("DiamondCutFacet deployed:", diamondCutFacet.address);
  exportObject.addresses.diamondcutFacet = diamondCutFacet.address;

  // deploy Diamond
  const Diamond: ContractFactory = await ethers.getContractFactory("Diamond");
  const diamond: Contract = await Diamond.deploy(
    contractOwner.address,
    diamondCutFacet.address
  );
  await diamond.deployed();
  console.log("Diamond deployed:", diamond.address);
  exportObject.addresses.diamond = diamond.address;
  exportObject.deploymentVars.diamond.push(contractOwner.address);
  exportObject.deploymentVars.diamond.push(diamondCutFacet.address);

  // deploy DiamondInit
  // DiamondInit provides a function that is called when the diamond is upgraded to initialize state variables
  // Read about how the diamondCut function works here: https://eips.ethereum.org/EIPS/eip-2535#addingreplacingremoving-functions
  const DiamondInit: ContractFactory = await ethers.getContractFactory(
    "DiamondInit"
  );
  const diamondInit: Contract = await DiamondInit.deploy();
  await diamondInit.deployed();
  console.log("DiamondInit deployed:", diamondInit.address);

  //deploy Storage
  const Storage: ContractFactory = await ethers.getContractFactory("Storage");
  const storage: Contract = await Storage.deploy();
  await storage.deployed();
  console.log("storageAddress: ", storage.address);
  exportObject.addresses.storage = storage.address;

  // deploy facets
  console.log("");
  console.log("Deploying facets");
  const FacetNames = [
    "DiamondLoupeFacet",
    "OwnershipFacet",
    "InteractionFacet",
    "StakingFacet",
    "StateManagerFacet",
    "MarketplaceFacet",
    "AuctionFacet",
  ];
  const cut: any[] = [];
  for (const FacetName of FacetNames) {
    const Facet: ContractFactory = await ethers.getContractFactory(FacetName);
    const facet: Contract = await Facet.deploy();
    await facet.deployed();
    console.log(`${FacetName} deployed: ${facet.address}`);
    exportObject.addresses[FacetName] = facet.address;
    cut.push({
      facetAddress: facet.address,
      action: FacetCutAction.Add,
      functionSelectors: getSelectors(facet),
    });
  }
  // upgrade diamond with facets
  console.log("");
  console.log("Diamond Cut:", cut);
  const diamondCut: Contract = await ethers.getContractAt(
    "IDiamondCut",
    diamond.address
  );
  const diamondAddress = diamond.address;
  let tx: LooseObject;
  let receipt: LooseObject;
  // call to init function
  let functionCall = diamondInit.interface.encodeFunctionData("init");
  tx = await diamondCut.diamondCut(cut, diamondInit.address, functionCall);
  console.log("Diamond cut tx: ", tx.hash);
  receipt = await tx.wait();
  if (!receipt.status) {
    throw Error(`Diamond upgrade failed: ${tx.hash}`);
  }
  console.log("Completed diamond cut");

  const landNft: ContractFactory = await ethers.getContractFactory("Land");
  const LandNft: Contract = await upgrades.deployProxy(landNft, {
    kind: "uups",
  });
  await LandNft.setApprovalForAll(diamondAddress, true);
  console.log("LandNft: ", LandNft.address);
  const currentImplLandAddress = await upgrades.erc1967.getImplementationAddress(
    LandNft.address
  );
  exportObject.addresses.LandNft = LandNft.address;
  exportObject.addresses.LandImplementation = currentImplLandAddress;

  const scaleNft: ContractFactory = await ethers.getContractFactory("Scale");
  const ScaleNft: Contract = await upgrades.deployProxy(scaleNft, {
    kind: "uups",
  });
  await ScaleNft.setApprovalForAll(diamondAddress, true);
  console.log("ScaleNft: ", ScaleNft.address);
  const currentImplScaleAddress = await upgrades.erc1967.getImplementationAddress(
    ScaleNft.address
  );
  exportObject.addresses.ScaleNft = ScaleNft.address;
  exportObject.addresses.ScaleImplementation = currentImplScaleAddress;

  const ScaleComposable: ContractFactory = await ethers.getContractFactory(
    "ScaleComposable"
  );
  const scaleComposable: Contract = await ScaleComposable.deploy();
  await scaleComposable.deployed();
  await scaleComposable.setApprovalForAll(diamondAddress, true);
  console.log("scaleComposable: ", scaleComposable.address);
  exportObject.addresses.scaleComposable = scaleComposable.address;

  const planetNft: ContractFactory = await ethers.getContractFactory("Planet");
  const PlanetNft: Contract = await upgrades.deployProxy(planetNft, {
    kind: "uups",
  });
  await PlanetNft.setApprovalForAll(diamondAddress, true);
  console.log("PlanetNft: ", PlanetNft.address);
  exportObject.addresses.PlanetNft = PlanetNft.address;

  await storage.addApprove(LandNft.address, diamondAddress, true, {
    gasLimit: 10000000,
  });
  await storage.addApprove(PlanetNft.address, diamondAddress, true, {
    gasLimit: 10000000,
  });
  await storage.addApprove(ScaleNft.address, diamondAddress, true, {
    gasLimit: 10000000,
  });
  await storage.addApprove(scaleComposable.address, diamondAddress, true, {
    gasLimit: 10000000,
  });
  await storage.addApprove(LandNft.address, scaleComposable.address, true, {
    gasLimit: 10000000,
  });
  console.log("addApprove");

  const stateManagerFacet = await ethers.getContractAt(
    "StateManagerFacet",
    diamondAddress
  );
  await stateManagerFacet.setNftAddresses(
    LandNft.address,
    ScaleNft.address,
    PlanetNft.address
  );
  await stateManagerFacet.setScaleComposableAddress(scaleComposable.address);
  await stateManagerFacet.setNftStorage(storage.address);

  const treasury: ContractFactory = await ethers.getContractFactory("Treasury");
  const Treasury: Contract = await treasury.deploy();
  await Treasury.deployed();
  console.log("Treasury address", Treasury.address);
  exportObject.addresses.Treasury = Treasury.address;

  await stateManagerFacet.setTreasuryAddress(Treasury.address);
  //await stateManagerFacet.setPlanetComposableAddress(PlanetComposable);
  await stateManagerFacet.setMarketplaceFee(5);

  const token: ContractFactory = await ethers.getContractFactory(
    "MetareaToken"
  );
  let meraComission = 5;
  const Token: Contract = await token.deploy(Treasury.address, meraComission);
  await Token.deployed();
  console.log("Token address: ", Token.address);
  exportObject.addresses.Token = Token.address;
  exportObject.deploymentVars.Token.push(Treasury.address, meraComission);

  await stateManagerFacet.changeTokenStatusOnMarketplace(Token.address, true);
  await stateManagerFacet.changeTokenStatusOnMarketplace(Token.address, true);

  await Token.changeAddressStatus(diamondAddress, true);
  console.log("all done");
  writeFileSync(
    "./scripts/data/deploymentData.txt",
    JSON.stringify(exportObject)
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error: Error) => {
    console.error(error);
    process.exit(1);
  });
