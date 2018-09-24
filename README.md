# iota-offline
A completely offline IOTA transaction bundle signer.

:warning: This toolset requires two devices.
* An offline device for signing transactions.
* An online device for broadcasting.

:warning: Important notice! These tools are intended for and only for experienced IOTA users that understand the technical details and intricacies of the IOTA tangle. The input verification of these tools are limited due to the nature of being an offline toolset. Therefore, use with caution and at your own risk.

## Purpose
I've never been completely comfortable signing IOTA transactions online using the mobile/desktop wallet provided by the IOTA Foundation. Personally I will only use those wallets with throw-away seeds and small IOTA quantities.

Therefore, I want to store my main stash of IOTA on a seed that has never been exposed any networked device.

My own setup is:
1. Use a bootable OS on a pendrive and open the **iota-offline-bundle-signer.html**.
Using the bundle-signer I can produce a valid and signed transaction bundle offline.

2. Later, I open the **iota-online-bundle-broadcaster.html** on another networked device.
Now I can broadcast my signed transaction bundle to the tangle.

By doing it this way, I feel very comfortable signing transactions from my cold wallet to my hot wallet.

## Try it on Github Pages
:warning: Only use the Github Pages version for testing purposes.

[https://ixuz.github.io/iota-offline/](https://ixuz.github.io/iota-offline/)

## Install
There is no installationen needed, it works out of the box.
Download the files and open any of the .html files in your browser.

## Usage

### Demonstrational video

[Video](https://www.youtube.com/watch?v=hKLVcqpdBLc)

### Step 1: iota-offline-bundle-signer.html ###

![bundle-signer.png](https://github.com/ixuz/iota-offline/blob/master/screenshots/bundle-signer.png)

**Seed :**
Enter your 81 tryte seed.

**From address :**
Enter the 90 trytes of your sender address.

**From address index :**
This fields is used to double check that there is no discrepancies from which address the user want to transfer funds.
Enter the key index of the senders address in this field.

**From address balance :**
Enter the full balance available on the sender address. (the amount must be positive integer)

**To address :**
Enter the 90 trytes of the recipent address.

**Transfer amount :**
Enter the amount to transfer to the recipent. (the amount must be positive integer)

**Remainder address :**
Enter the 90 trytes of the remainder address.
*(This field is only neccessary if the "From address balance" and "Transfer amount" fields are different)*

### Step 2: iota-online-bundle-broadcaster.html ###

![bundle-broadcaster.png](https://github.com/ixuz/iota-offline/blob/master/screenshots/bundle-broadcaster.png)

**Node url :**
Enter the node url.

**Node port :**
Enter the node port.

**Signed bundle trytes :**
Enter the signed transaction bundle trytes.
*(See **step 1** for how to generate signed transaction bundle trytes)*

## Donations
[OMTTWFMFKU9UOFIAAXKCOKUVLPYTOYKCQAWFXWQY9MUYOVNFCCITJOUKAOXR9TJ9DECXLGYDOMDLPTYHCOFPHDJXUC](https://thetangle.org/address/OMTTWFMFKU9UOFIAAXKCOKUVLPYTOYKCQAWFXWQY9MUYOVNFCCITJOUKAOXR9TJ9DECXLGYDOMDLPTYHCOFPHDJXUC)
