import { composeAPI } from '@iota/core';
import { generateAddress } from '@iota/core'
import { createPrepareTransfers } from '@iota/core'
import { isTrytes } from '@iota/validators'
import { isValidChecksum } from '@iota/checksum'

function signBundle(): void {

  // Read user input fields
  var seed: string = (<HTMLInputElement>document.getElementById('seed')).value;
  var fromAddress: string = (<HTMLInputElement>document.getElementById('fromAddress')).value;
  var fromAddressIndex: number = Number((<HTMLInputElement>document.getElementById('fromAddressIndex')).value);
  var fromAddressBalance: number = Number((<HTMLInputElement>document.getElementById('fromAddressBalance')).value);
  var toAddress: string = (<HTMLInputElement>document.getElementById('toAddress')).value;
  var securityLevel: number = Number((<HTMLInputElement>document.getElementById('securityLevel')).value);
  var transferAmount: number = Number((<HTMLInputElement>document.getElementById('transferAmount')).value);
  var remainderAddress: string = (<HTMLInputElement>document.getElementById('remainderAddress')).value;
  var message: string = (<HTMLInputElement>document.getElementById('message')).value;
  
  // Find references for feedback and output elements
  var feedbackElement: HTMLInputElement = <HTMLInputElement>document.getElementById('signResult');
  var outputElement: HTMLInputElement = <HTMLInputElement>document.getElementById('signedBundle');
  
  // Validate inputs
  if (isTrytes(seed) !== true || seed.length !== 81) {
    feedbackElement.innerHTML = "Input validation error! Input 'seed' must be 81 trytes long.";
    return;
  }

  if ((securityLevel !== 1 && securityLevel !== 2 && securityLevel !== 3)) {
    feedbackElement.innerHTML = "Input validation error! Input 'security' must be either '1', '2' or '3'.";
    return;
  }

  if (fromAddress.length !== 90 || isValidChecksum(fromAddress) !== true) {
    feedbackElement.innerHTML = "Input validation error! Input 'fromAddress' must be 90 trytes long and include the checksum.";
    return;
  }

  if (toAddress.length !== 90 || isValidChecksum(toAddress) !== true) {
    feedbackElement.innerHTML = "Input validation error! Input 'toAddress' must be 90 trytes long and include the checksum.";
    return;
  }

  if (Number.isInteger(fromAddressBalance) !== true || fromAddressBalance < 0) {
    feedbackElement.innerHTML = "Input validation error! Input 'fromAddressBalance' must be a positive integer.";
    return;
  }

  if (Number.isInteger(transferAmount) !== true || transferAmount < 0) {
    feedbackElement.innerHTML = "Input validation error! Input 'transferAmount' must be a positive integer.";
    return;
  }

  if (transferAmount < fromAddressBalance) {
    if (remainderAddress.length === 0 || isTrytes(remainderAddress) !== true || remainderAddress.length !== 90 || isValidChecksum(remainderAddress) !== true) {
      feedbackElement.innerHTML = "Input validation error! Input 'remainderAddress' must be set because the 'transferAmount' is less than the 'fromAddressBalance'.";
      return;
    }
  }

  if (transferAmount > fromAddressBalance && isTrytes(seed)) {
    feedbackElement.innerHTML = "Input validation error! Input 'transferAmount' should not be more than 'fromAddressBalance'.";
    return;
  }

  if (Number.isInteger(fromAddressIndex) !== true || fromAddressIndex < 0) {
    feedbackElement.innerHTML = "Input validation error! Input 'fromAddressIndex' must be a positive integer.";
    return;
  }

  let fromAddressDeterministic = generateAddress(seed, fromAddressIndex, securityLevel, true);
  if (fromAddress !== fromAddressDeterministic) {
    feedbackElement.innerHTML = "Input validation error! Input 'fromAddress' is not matching the 'fromAddressIndex'.";
    return;
  }

  // Construct a transfers object
  var transfers = [{
    'address': toAddress,
    'message': message,
    'value': transferAmount,
    'tag': 'IOTAOFFLINE'
  }];

  // Add a remainder address if specified by the user
  if (remainderAddress) {
    transfers.push({
      'address': remainderAddress, // TODO: Ensure that this is not having a checksum
      'message': message,
      'value': fromAddressBalance - transferAmount,
      'tag': 'IOTAOFFLINE'
    });
  }

  // Construct an options object that includes the input
  var options = {
    'inputs': [{
      'keyIndex': fromAddressIndex,
      'address': fromAddress,
      'security': securityLevel,
      'balance': fromAddressBalance
    }]
  };

  // Sign the bundle
  createPrepareTransfers()(seed, transfers, options)
    .then((trytes: any) => {
      outputElement.value = JSON.stringify(trytes);
      feedbackElement.innerHTML = "Success! Transaction bundle signed!";
    })
    .catch((err: any) => {
      feedbackElement.innerHTML = "An error occurred upon signing the bundle! Read the console for additional details.";
      console.log(`Error: ${err}`)
    });
}

// Expose the function to the browser
(<any>window).signBundle = signBundle;
