const {
  getSelectors,
  FacetCutAction,
  removeSelectors,
  findAddressPositionInFacets,
} = require("../scripts/libraries/diamond.ts");
const { deployProject } = require("../scripts/deployDiamond.js");

const { deployDiamond } = require("../scripts/deploy.ts");
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Contract, ContractReceipt } from "ethers";
import {
  Storage,
  Land,
  Scale,
  Planet,
  ScaleComposable,
  StakingFacet,
  InteractionFacet,
  StateManagerFacet,
  MarketplaceFacet,
  MetareaToken,
  AuctionFacet,
  Treasury,
} from "../typechain";
const { assert, expect } = require("chai");
const { ethers, upgrades, hre } = require("hardhat");

describe("Diamond", async function () {
  let metareaToken: Contract | MetareaToken;
  let diamondAddress: Contract;
  let diamondCutFacet: Contract;
  let diamondLoupeFacet: Contract;
  let LandNft: Contract | Land;
  let ScaleNft: Contract | Scale;
  let PlanetNft: Contract | Planet;
  let scaleComposable: Contract | ScaleComposable;
  let treasury: Contract | Treasury;
  let storage: Contract | Storage;
  let InteractionFacet: Contract | InteractionFacet;
  let StakingFacet: Contract | StakingFacet;
  let StateManagerFacet: Contract | StateManagerFacet;
  let MarketplaceFacet: Contract | MarketplaceFacet;
  let AuctionFacet: Contract | AuctionFacet;
  let ownershipFacet: Contract;
  let tx;
  let receipt;
  let result;
  const addresses: SignerWithAddress[] = [];
  let owner: SignerWithAddress;
  let acc1: SignerWithAddress;
  let acc2: SignerWithAddress;
  let acc3: SignerWithAddress;
  let acc4: SignerWithAddress;

  before(async () => {
    const deployVars = await deployProject("test"); //idk what is "test"
    owner = deployVars.account;
    [owner, acc1, acc2, acc3, acc4] = await ethers.getSigners();
    diamondAddress = deployVars.metareaDiamond.address;
    let myLilDiamond = await ethers.getContractAt(
      "MetareaDiamond",
      diamondAddress
    );

    diamondCutFacet = await ethers.getContractAt(
      "DiamondCutFacet",
      diamondAddress
    );
    diamondLoupeFacet = await ethers.getContractAt(
      "DiamondLoupeFacet",
      diamondAddress
    );
    ownershipFacet = await ethers.getContractAt(
      "OwnershipFacet",
      diamondAddress
    );
    InteractionFacet = await deployVars.interactionFacet;
    MarketplaceFacet = await deployVars.marketplaceFacet;
    StateManagerFacet = await deployVars.stateManagerFacet;
    StakingFacet = await deployVars.stakingFacet;
    AuctionFacet = await deployVars.auctionFacet;
  });

  it("Should deploy Storage", async () => {
    const Storage = await ethers.getContractFactory("Storage");
    storage = await Storage.deploy();
    await storage.deployed();
    console.log("Storage deployed successfully " + storage.address);
  });

  it("Should deploy ERC721 proxy Land", async () => {
    let tmpLandNft = await ethers.getContractFactory("Land");
    LandNft = await upgrades.deployProxy(tmpLandNft, {
      kind: "uups",
    });
    await LandNft.connect(acc1).setApprovalForAll(diamondAddress, true);

    console.log(`Land deployed at ${LandNft.address}`);
  });

  it("Should deploy ERC721 proxy Scale", async () => {
    let tmpScaleNft = await ethers.getContractFactory("Scale");
    ScaleNft = await upgrades.deployProxy(tmpScaleNft, {
      kind: "uups",
    });
    await ScaleNft.connect(acc1).setApprovalForAll(diamondAddress, true);

    console.log(`Scale deployed at ${ScaleNft.address}`);
  });
  it("Should deploy ERC721 proxy Planet", async () => {
    let tmpPlanetNft = await ethers.getContractFactory("Planet");
    PlanetNft = await upgrades.deployProxy(tmpPlanetNft, {
      kind: "uups",
    });
    await PlanetNft.connect(acc1).setApprovalForAll(diamondAddress, true);

    console.log(`Planet deployed at ${PlanetNft.address}`);
  });
  it("Should deploy scaleComposable", async () => {
    const ScaleComposable = await ethers.getContractFactory("ScaleComposable");
    scaleComposable = await ScaleComposable.deploy();
    await scaleComposable.deployed();
    console.log(`ScaleComposable deployed at ${scaleComposable.address}`);
  });

  it("Should deploy Treasury", async () => {
    const Treasury = await ethers.getContractFactory("Treasury");
    treasury = await Treasury.deploy();
    await treasury.deployed();
    console.log(`Treasury deployed at ${treasury.address}`);
  });

  it("Should allow diamond to do anything with storage", async () => {
    await storage.addApprove(LandNft.address, diamondAddress, true);
    await storage.addApprove(ScaleNft.address, diamondAddress, true);
    await storage.addApprove(PlanetNft.address, diamondAddress, true);
    await storage.addApprove(scaleComposable.address, diamondAddress, true);
    await storage.addApprove(LandNft.address, scaleComposable.address, true);
  });

  it("Should update state", async () => {
    const stateManagerFacet = await ethers.getContractAt(
      "StateManagerFacet",
      diamondAddress
    );
    await stateManagerFacet
      .connect(owner)
      .setNftAddresses(
        LandNft.address,
        ScaleNft.address,
        PlanetNft.address,
        acc3.address
      );
    await stateManagerFacet
      .connect(owner)
      .setScaleComposableAddress(scaleComposable.address);
    await stateManagerFacet.connect(owner).setNftStorage(storage.address);

    await stateManagerFacet.connect(owner).setMarketplaceFee(5);
    await stateManagerFacet
      .connect(owner)
      .setAllowedScaleTypes([2, 3, 6, 9, 12]); // 2 and 12(!) is for test purposes only
  });

  it("Should deploy erc20 token and allow diamnd to have feeLessTransfer", async () => {
    const stateManagerFacet = await ethers.getContractAt(
      "StateManagerFacet",
      diamondAddress
    );
    await stateManagerFacet.connect(owner).setTreasuryAddress(treasury.address);
    const Erc20 = await ethers.getContractFactory("MetareaToken", owner);
    metareaToken = await Erc20.deploy(treasury.address, 5);
    await metareaToken.deployed();

    await stateManagerFacet
      .connect(owner)
      .changeTokenStatusOnMarketplace(metareaToken.address, true);

    await stateManagerFacet
      .connect(owner)
      .changeTokenStatusOnMarketplace(metareaToken.address, true);

    await metareaToken.connect(owner).changeAddressStatus(diamondAddress, true);
    await scaleComposable.setStorageAddress(storage.address);
  });

  it("Should approve tokens and mint for acc2,acc3,acc4 ", async () => {
    await metareaToken
      .connect(acc2)
      .approve(MarketplaceFacet.address, ethers.utils.parseEther("20000000"));
    await expect(() =>
      metareaToken
        .connect(owner)
        .mint(acc4.address, ethers.utils.parseEther("2000000"))
    ).to.changeTokenBalance(
      metareaToken,
      acc4,
      ethers.utils.parseEther("2000000")
    );
    await expect(() =>
      metareaToken
        .connect(owner)
        .mint(acc3.address, ethers.utils.parseEther("2000000"))
    ).to.changeTokenBalance(
      metareaToken,
      acc3,
      ethers.utils.parseEther("2000000")
    );

    await expect(() =>
      metareaToken
        .connect(owner)
        .mint(acc2.address, ethers.utils.parseEther("2000000"))
    ).to.changeTokenBalance(
      metareaToken,
      acc2,
      ethers.utils.parseEther("2000000")
    );
    await metareaToken
      .connect(acc1)
      .approve(MarketplaceFacet.address, ethers.utils.parseEther("20000000"));

    await expect(() =>
      metareaToken
        .connect(owner)
        .mint(acc1.address, ethers.utils.parseEther("2000000"))
    ).to.changeTokenBalance(
      metareaToken,
      acc1,
      ethers.utils.parseEther("2000000")
    );
  });

  it("Should add item to the MarketplaceFacet for sale", async () => {
    await LandNft.connect(owner).mintLand(acc1.address, 0, 1, "");
    const tx = await MarketplaceFacet.connect(acc1).listItemOnSale(
      0,
      0,
      metareaToken.address,
      ethers.utils.parseEther("100")
    );

    await expect(tx).to.emit(MarketplaceFacet, "itemListed");

    expect(await LandNft.ownerOf(0)).to.equal(storage.address);
  });

  it("Should buy item in MarketplaceFacet", async () => {
    await expect(() =>
      MarketplaceFacet.connect(acc2).buyItem(0)
    ).to.changeTokenBalances(
      metareaToken,
      [acc2, acc1],
      [ethers.utils.parseEther("-100"), ethers.utils.parseEther("95")]
    );
  });

  it("Should Update price item in MarketplaceFacet", async () => {
    await LandNft.connect(owner).mintLand(acc1.address, 1, 1, "");
    const tx = await MarketplaceFacet.connect(acc1).listItemOnSale(
      0,
      1,
      metareaToken.address,
      ethers.utils.parseEther("150")
    );
    await expect(tx).to.emit(MarketplaceFacet, "itemListed");

    expect(await LandNft.ownerOf(1)).to.equal(storage.address);

    const tx2 = await MarketplaceFacet.connect(acc1).changeItemPrice(
      1,
      ethers.utils.parseEther("75")
    );

    await expect(tx2).to.emit(MarketplaceFacet, "itemPriceUpdated");

    await expect(() =>
      MarketplaceFacet.connect(acc2).buyItem(1)
    ).to.changeTokenBalances(
      metareaToken,
      [acc2, acc1],
      [ethers.utils.parseEther("-75"), ethers.utils.parseEther("71.25")]
    );
  });

  it("Should remove item from the MarketplaceFacet list", async () => {
    await LandNft.connect(owner).mintLand(acc1.address, 2, 1, "");
    const tx = await MarketplaceFacet.connect(acc1).listItemOnSale(
      0,
      2,
      metareaToken.address,
      ethers.utils.parseEther("20")
    );

    expect(await LandNft.ownerOf(2)).to.equal(storage.address);

    const removeTx = await MarketplaceFacet.connect(acc1).delistItem(2);

    await expect(removeTx).to.emit(MarketplaceFacet, "itemDelisted");

    expect(await LandNft.ownerOf(2)).to.equal(acc1.address);
  });

  it("Should buy item two times", async () => {
    await LandNft.connect(acc1).setApprovalForAll(diamondAddress, true);
    await LandNft.connect(acc2).setApprovalForAll(diamondAddress, true);

    await LandNft.connect(acc1).mintLand(acc1.address, 66, 666, "");
    await MarketplaceFacet.connect(acc1).listItemOnSale(
      0,
      66,
      metareaToken.address,
      ethers.utils.parseEther("100")
    );
    await MarketplaceFacet.connect(acc2).buyItem(3);

    await MarketplaceFacet.connect(acc2).listItemOnSale(
      0,
      66,
      metareaToken.address,
      ethers.utils.parseEther("100")
    );
    await MarketplaceFacet.connect(acc2).buyItem(4);
  });

  it("Should putting the nft up for auction in the price format", async () => {
    const seconds = 900;
    const secondForFuture = 890;

    const deadline = (await ethers.provider.getBlock()).timestamp + seconds;

    await LandNft.connect(acc2).mintLand(acc2.address, 6, 66, "");
    expect(await LandNft.ownerOf(6)).to.equal(acc2.address);

    await AuctionFacet.connect(acc2).createPriceBasedAuction(
      0,
      6,
      deadline,
      metareaToken.address,
      ethers.utils.parseEther("100"),
      ethers.utils.parseEther("500")
    );

    expect(await LandNft.ownerOf(6)).to.equal(storage.address);

    await ethers.provider.send("evm_increaseTime", [secondForFuture]);
    await ethers.provider.send("evm_mine");

    await metareaToken
      .connect(acc3)
      .approve(AuctionFacet.address, ethers.utils.parseEther("20000000"));
    await metareaToken
      .connect(acc4)
      .approve(AuctionFacet.address, ethers.utils.parseEther("20000000"));

    await expect(() =>
      AuctionFacet.connect(acc3).makeBid(0, ethers.utils.parseEther("450"))
    ).to.changeTokenBalance(metareaToken, acc2, 0);

    await expect(() =>
      AuctionFacet.connect(acc1).makeBid(0, ethers.utils.parseEther("250"))
    ).to.changeTokenBalance(metareaToken, acc2, 0);

    await expect(() =>
      AuctionFacet.connect(acc4).makeBid(0, ethers.utils.parseEther("500"))
    ).to.changeTokenBalance(metareaToken, acc2, ethers.utils.parseEther("475"));

    expect(await LandNft.ownerOf(6)).to.equal(acc4.address);
  });

  it("Should putting the nft up for auction in the time format", async () => {
    const seconds = 900;

    const deadline = (await ethers.provider.getBlock()).timestamp + seconds;

    await LandNft.connect(acc1).mintLand(acc1.address, 7, 77, "");
    expect(await LandNft.ownerOf(7)).to.equal(acc1.address);

    await AuctionFacet.connect(acc1).createTimeBasedAuction(
      0,
      7,
      deadline,
      metareaToken.address,
      ethers.utils.parseEther("100")
    );

    await expect(() =>
      AuctionFacet.connect(acc3).makeBid(1, ethers.utils.parseEther("700"))
    ).to.changeTokenBalance(metareaToken, acc2, 0);

    await expect(() =>
      AuctionFacet.connect(acc1).makeBid(1, ethers.utils.parseEther("250"))
    ).to.changeTokenBalance(metareaToken, acc2, 0);

    await expect(() =>
      AuctionFacet.connect(acc4).makeBid(1, ethers.utils.parseEther("500"))
    ).to.changeTokenBalance(metareaToken, acc2, 0);

    await expect(() =>
      AuctionFacet.connect(acc1).acceptBid(
        1,
        acc3.address,
        ethers.utils.parseEther("700")
      )
    ).to.changeTokenBalance(metareaToken, acc1, ethers.utils.parseEther("665"));

    expect(await LandNft.ownerOf(7)).to.equal(acc3.address);
  });

  it("Should cancel the Auction at the request of the seller", async () => {
    const seconds = 900;

    const deadline = (await ethers.provider.getBlock()).timestamp + seconds;

    expect(await LandNft.ownerOf(7)).to.equal(acc3.address);

    await LandNft.connect(acc3).approve(AuctionFacet.address, 7);

    await AuctionFacet.connect(acc3).createTimeBasedAuction(
      0,
      7,
      deadline,
      metareaToken.address,
      ethers.utils.parseEther("150")
    );

    expect(await LandNft.ownerOf(7)).to.equal(storage.address);

    await AuctionFacet.connect(acc2).makeBid(2, ethers.utils.parseEther("250"));

    await AuctionFacet.connect(acc4).makeBid(2, ethers.utils.parseEther("700"));

    await AuctionFacet.connect(acc1).makeBid(2, ethers.utils.parseEther("500"));

    await AuctionFacet.connect(acc3).cancelAuction(2);

    expect(await LandNft.ownerOf(7)).to.equal(acc3.address);
  });

  it("Should cancel Bid the Auction at the request of the buyer", async () => {
    const seconds = 900;
    const secondForFuture = 890;

    const deadline = (await ethers.provider.getBlock()).timestamp + seconds;

    expect(await LandNft.ownerOf(7)).to.equal(acc3.address);

    await LandNft.connect(acc3).approve(AuctionFacet.address, 7);

    await AuctionFacet.connect(acc3).createPriceBasedAuction(
      0,
      7,
      deadline,
      metareaToken.address,
      ethers.utils.parseEther("50"),
      ethers.utils.parseEther("500")
    );

    expect(await LandNft.ownerOf(7)).to.equal(storage.address);

    await ethers.provider.send("evm_increaseTime", [secondForFuture]);
    await ethers.provider.send("evm_mine");

    await expect(() =>
      AuctionFacet.connect(acc2).makeBid(3, ethers.utils.parseEther("420"))
    ).to.changeTokenBalance(metareaToken, acc3, 0);

    await expect(() =>
      AuctionFacet.connect(acc1).makeBid(3, ethers.utils.parseEther("250"))
    ).to.changeTokenBalance(metareaToken, acc3, 0);

    await expect(() =>
      AuctionFacet.connect(acc4).makeBid(3, ethers.utils.parseEther("470"))
    ).to.changeTokenBalance(metareaToken, acc3, ethers.utils.parseEther("0"));

    await AuctionFacet.connect(acc4).cancelBid(3);

    await expect(() =>
      AuctionFacet.connect(acc2).makeBid(3, ethers.utils.parseEther("500"))
    ).to.changeTokenBalance(metareaToken, acc3, ethers.utils.parseEther("475"));

    expect(await LandNft.ownerOf(7)).to.equal(acc2.address);
  });
  it("Should test stakingFacet", async () => {
    await LandNft.connect(owner).mintLand(acc1.address, 55, 1, "");
    await LandNft.connect(owner).mintLand(acc1.address, 56, 1, "");

    const currentDate = new Date();
    const newTimestamp = currentDate.getTime() + 31556952 * 2;

    await StakingFacet.connect(acc1).stake(0, 55);
    await StakingFacet.connect(acc1).stake(0, 56);
    expect(await LandNft.ownerOf(55)).to.be.eq(storage.address);

    await ethers.provider.send("evm_mine", [newTimestamp]);

    await StakingFacet.connect(acc1).unstake(0, 55);
    expect(await LandNft.ownerOf(55)).to.be.eq(acc1.address);
  });

  it("Should mint Bunch lands", async () => {
    await InteractionFacet.connect(owner).mintBunchLands(
      acc3.address,
      [10, 11, 12],
      0,
      ""
    );
  });

  it("Shount mint scale and decompose it", async () => {
    function count(startTokenId: number, scaleSize: number) {
      return Array.from({ length: scaleSize }, (_, i) => i + startTokenId);
    }
    await InteractionFacet.connect(acc1).mintScale(2, count(104, 4), 9, "");
    await InteractionFacet.connect(acc1).decomposeScale(1);
  });
  it("Should mint lands for big scale and than mint in successfully", async () => {
    function count(startTokenId: number, scaleSize: number) {
      return Array.from({ length: scaleSize }, (_, i) => i + startTokenId);
    }
    await InteractionFacet.connect(owner).mintBunchLands(
      storage.address,
      count(300, 144),
      0,
      ""
    );
    await InteractionFacet.connect(acc1).mintBigScale(12, count(300, 144));
  });
  it("Should add item for rent and rent it with corrent consumer", async () => {
    await PlanetNft.connect(owner).mintPlanet(acc1.address, 100, "test");
    await InteractionFacet.connect(acc1).depositNftForRent(
      2,
      100,
      metareaToken.address,
      0,
      0
    );

    expect(await PlanetNft.ownerOf(100)).to.be.equal(storage.address);

    await InteractionFacet.connect(acc2).rentNft(2, 100);

    expect(await PlanetNft.consumerOf(100)).to.be.equal(acc2.address);

    await InteractionFacet.connect(acc1).getNftBackFromRent(2, 100);
    expect(await PlanetNft.consumerOf(100)).not.to.be.equal(acc2.address);
  });
  it("Should mint 9x9 scale with big(not really) cutomUri", async () => {
    function count(startTokenId: number, scaleSize: number) {
      return Array.from({ length: scaleSize }, (_, i) => i + startTokenId);
    }

    await InteractionFacet.connect(owner).mintScale(
      9,
      count(6000, 81),
      1,
      "QmUHWKbJPHaofUsLfF5JnUXjz11nTsPbY2iFZNTWqNEmza"
    );
  });
});
