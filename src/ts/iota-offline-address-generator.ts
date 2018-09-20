import { composeAPI } from '@iota/core';
import { generateAddress } from '@iota/core'
import { createPrepareTransfers } from '@iota/core'

function generateAddresses(): void {

  // Read user input fields
  var seed: string = (<HTMLInputElement>document.getElementById('seed')).value;
  var securityLevel: number = Number((<HTMLInputElement>document.getElementById('securityLevel')).value);
  var numberOfAddresses: number = Number((<HTMLInputElement>document.getElementById('numberOfAddresses')).value);

  // Find references for feedback and output elements
  var feedbackElement: HTMLInputElement = <HTMLInputElement>document.getElementById('generatedAddressesResult');
  var outputElement: HTMLInputElement = <HTMLInputElement>document.getElementById('generatedAddressesDiv');
  
  // Generate addresses
  var outputArray: any[] = [];
  for (var index=0; index<numberOfAddresses; index++) {
    outputArray.push({
      'index': index,
      'address': generateAddress(seed, index, securityLevel, true)
    });
  }

  // Write to outputs
  feedbackElement.innerHTML = "Success! Generated addresses!";
  outputElement.innerHTML = "";
  for (var out of outputArray) {
    outputElement.innerHTML += "Address index: " + out.index + " = " + out.address + "<br>";
  }
}

// Expose the function to the browser
(<any>window).generateAddresses = generateAddresses;
