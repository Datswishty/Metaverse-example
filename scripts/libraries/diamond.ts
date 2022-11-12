const FacetCutAction = { Add: 0, Replace: 1, Remove: 2 }

import { ethers } from "hardhat";

let masterObject:any = {}

// get function selectors from ABI
function getSelectors(contract: any) {
  const signatures = Object.keys(contract.interface.functions)
  const selectors = signatures.reduce((acc:any, val) => {
    if (val !== 'init(bytes)') {
      acc.push(contract.interface.getSighash(val))
    }
    return acc
  }, [])
  selectors.contract = contract
  selectors.remove = remove
  selectors.get = get
  return selectors
}

// get function selector from function signature
function getSelector(func:any) {
  const abiInterface = new ethers.utils.Interface([func])
  return abiInterface.getSighash(ethers.utils.Fragment.from(func))
}

// used with getSelectors to remove selectors from an array of selectors
// functionNames argument is an array of function signatures
function remove(functionNames:any) {
  const selectors:any = masterObject.filter((v:any) => {
    for (const functionName of functionNames) {
      if (v === masterObject.contract.interface.getSighash(functionName)) {
        return false
      }
    }
    return true
  })
  selectors.contract = masterObject.contract
  selectors.remove = masterObject.remove
  selectors.get = masterObject.get
  return selectors
}

// used with getSelectors to get selectors from an array of selectors
// functionNames argument is an array of function signatures
function get(functionNames:any) {
  const selectors = masterObject.filter((v:any) => {
    for (const functionName of functionNames) {
      if (v === masterObject.contract.interface.getSighash(functionName)) {
        return true
      }
    }
    return false
  })
  selectors.contract = masterObject.contract
  selectors.remove = masterObject.remove
  selectors.get = masterObject.get
  return selectors
}

// remove selectors using an array of signatures
function removeSelectors(selectors:any, signatures:any) {
  const iface = new ethers.utils.Interface(
    signatures.map((v:any) => 'function ' + v),
  )
  const removeSelectors = signatures.map((v:any) => iface.getSighash(v))
  selectors = selectors.filter((v:any) => !removeSelectors.includes(v))
  return selectors
}

// find a particular address position in the return value of diamondLoupeFacet.facets()
function findAddressPositionInFacets(facetAddress:any, facets:any) {
  for (let i = 0; i < facets.length; i++) {
    if (facets[i].facetAddress === facetAddress) {
      return i
    }
  }
}

exports.getSelectors = getSelectors
exports.getSelector = getSelector
exports.FacetCutAction = FacetCutAction
exports.remove = remove
exports.removeSelectors = removeSelectors
exports.findAddressPositionInFacets = findAddressPositionInFacets