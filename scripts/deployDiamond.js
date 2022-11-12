/* global ethers hre */

const { ethers } = require('hardhat')
const diamond = require('../js/diamond-util/src/index.js')

async function main(scriptName) {
  console.log('SCRIPT NAME:', scriptName)

  const accounts = await ethers.getSigners()
  const account = await accounts[0].getAddress()
  const secondAccount = await accounts[1].getAddress()
  console.log('Account: ' + account)
  console.log('---')
  let tx
  let totalGasUsed = ethers.BigNumber.from('0')
  let receipt

  async function deployFacets(...facets) {
    const instances = []
    for (let facet of facets) {
      let constructorArgs = []
      if (Array.isArray(facet)) {
        ;[facet, constructorArgs] = facet
      }
      const factory = await ethers.getContractFactory(facet)
      const facetInstance = await factory.deploy(...constructorArgs)
      await facetInstance.deployed()
      const tx = facetInstance.deployTransaction
      const receipt = await tx.wait()
      console.log(`${facet} deploy gas used:` + receipt.gasUsed)
      totalGasUsed = totalGasUsed.add(receipt.gasUsed)
      instances.push(facetInstance)
    }
    return instances
  }
  let [
    auctionFacet,
    interactionFacet,
    marketplaceFacet,
    stakingFacet,
    stateManagerFacet,
    diamondLoupeFacet,
    ownershipFacet,
  ] = await deployFacets(
    'AuctionFacet',
    'InteractionFacet',
    'MarketplaceFacet',
    'StakingFacet',
    'StateManagerFacet',
    'DiamondLoupeFacet',
    'OwnershipFacet',
  )
  // deploy DiamondCutFacet
  const DiamondCutFacet = await ethers.getContractFactory('DiamondCutFacet')
  const diamondCutFacet = await DiamondCutFacet.deploy()
  await diamondCutFacet.deployed()
  let dcf = diamondCutFacet.address
  console.log('DiamondCutFacet deployed:', diamondCutFacet.address)

  // eslint-disable-next-line no-unused-vars
  const metareaDiamond = await diamond.deploy({
    diamondName: 'CoolMetaverseName Diamond',
    initDiamond: 'contracts/upgradeInitializers/DiamondInit.sol:DiamondInit',
    facets: [
      ['AuctionFacet', auctionFacet],
      ['InteractionFacet', interactionFacet],
      ['MarketplaceFacet', marketplaceFacet],
      ['StakingFacet', stakingFacet],
      ['StateManagerFacet', stateManagerFacet],
      ['DiamondLoupeFacet', diamondLoupeFacet],
      ['OwnershipFacet', ownershipFacet],
    ],
    owner: account,
    args: [],
    diamondCutAddress: dcf,
  })
  console.log('CoolMetaverseName diamond address:' + metareaDiamond.address)

  tx = metareaDiamond.deployTransaction
  receipt = await tx.wait()
  console.log('CoolMetaverseName diamond deploy gas used:' + receipt.gasUsed)
  totalGasUsed = totalGasUsed.add(receipt.gasUsed)

  //vrfFacet = await ethers.getContractAt("VrfFacet", aavegotchiDiamond.address);
  //aavegotchiFacet = await ethers.getContractAt(
  //  "contracts/Aavegotchi/facets/AavegotchiFacet.sol:AavegotchiFacet",
  //  aavegotchiDiamond.address
  //);
  auctionFacet = await ethers.getContractAt(
    'AuctionFacet',
    metareaDiamond.address,
  )
  interactionFacet = await ethers.getContractAt(
    'InteractionFacet',
    metareaDiamond.address,
  )
  marketplaceFacet = await ethers.getContractAt(
    'MarketplaceFacet',
    metareaDiamond.address,
  )
  stakingFacet = await ethers.getContractAt(
    'StakingFacet',
    metareaDiamond.address,
  )
  stateManagerFacet = await ethers.getContractAt(
    'StateManagerFacet',
    metareaDiamond.address,
  )

  return {
    account: account,
    metareaDiamond: metareaDiamond,
    auctionFacet: auctionFacet,
    interactionFacet: interactionFacet,
    marketplaceFacet: marketplaceFacet,
    stakingFacet: stakingFacet,
    stateManagerFacet: stateManagerFacet,
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
if (require.main === module) {
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error)
      process.exit(1)
    })
}

exports.deployProject = main
