import { composeAPI } from '@iota/core';
import { generateAddress } from '@iota/core'
import { createPrepareTransfers } from '@iota/core'
import { isTrytes } from '@iota/validators'

function generateAddresses(): void {

  // Read user input fields
  let seed: string = (<HTMLInputElement>document.getElementById('seed')).value;
  let securityLevel: number = Number((<HTMLInputElement>document.getElementById('securityLevel')).value);
  let numberOfAddresses: number = Number((<HTMLInputElement>document.getElementById('numberOfAddresses')).value);

  // Find references for feedback and output elements
  let feedbackElement: HTMLInputElement = <HTMLInputElement>document.getElementById('generatedAddressesResult');
  let outputElement: HTMLInputElement = <HTMLInputElement>document.getElementById('generatedAddressesDiv');
  
  // Clear output fields
  feedbackElement.innerHTML = "";
  outputElement.innerHTML = "";

  // Validate inputs
  if (isTrytes(seed) !== true || seed.length !== 81) {
    feedbackElement.innerHTML = "Input validation error! Input 'seed' must be 81 trytes long.";
    return;
  }

  if (!Number.isInteger(securityLevel) || ((securityLevel !== 1 && securityLevel !== 2 && securityLevel !== 3))) {
    feedbackElement.innerHTML = "Input validation error! Input 'securityLevel' must be an integer of value '1', '2' or '3'.";
    return;
  }

  if (!Number.isInteger(numberOfAddresses) || (numberOfAddresses < 1)) {
    feedbackElement.innerHTML = "Input validation error! Input 'numberOfAddresses' must be an integer of value greater than zero.";
    return;
  }

  // Generate addresses
  let outputArray: any[] = [];
  for (let index=0; index<numberOfAddresses; index++) {
    outputArray.push({
      'index': index,
      'address': generateAddress(seed, index, securityLevel, true)
    });
  }

  // Write to outputs
  feedbackElement.innerHTML = "Success! Generated addresses!";
  for (let out of outputArray) {
    outputElement.innerHTML += "Address index: " + out.index + " = " + out.address + "<br>";
  }
}

// Expose the function to the browser
(<any>window).generateAddresses = generateAddresses;
