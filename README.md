# NFT Minting DApp

A modern Next.js application for minting NFTs on the Ethereum blockchain. This project demonstrates how to integrate a blockchain wallet (MetaMask) with a React frontend to interact with a smart contract.

![NFT Minting DApp](https://github.com/your-username/nft-minting-dapp/raw/main/screenshot.png)

## 🚀 Features

- Connect to MetaMask wallet
- Mint NFTs directly from the UI
- Error handling and gas estimation
- Responsive design with Tailwind CSS
- Modern UI with gradient effects and animations

## 📋 Prerequisites

- Node.js 16+
- MetaMask extension installed in your browser
- Some ETH in your wallet for gas fees

## 🔧 Installation

1. Clone this repository:

```bash
git clone https://github.com/your-username/nft-minting-dapp.git
cd nft-minting-dapp
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 💻 Smart Contract Integration

This DApp integrates with an Ethereum smart contract at address `0x40ae3553a2dbbe463f84da97bda5607cfd03b40d`. The contract includes a `mintReserve` function that allows users to mint NFTs.

The contract ABI used in this application:

```json
["function mintReserve(address creatorContractAddress, uint256 instanceId, uint32 mintCount) external"]
```

## 🔍 Code Structure

- `components/MintNFT.js` - The main NFT minting component that handles wallet connection and minting
- `app/page.js` - The main page that renders the MintNFT component
- The dApp uses ethers.js for Ethereum interaction and Tailwind CSS for styling

## 🧠 How It Works

1. **Wallet Connection**:

   - The app checks if MetaMask is installed
   - On button click, it requests connection to the user's wallet
   - Once connected, it displays the wallet address

2. **NFT Minting**:

   - The mint button is enabled after wallet connection
   - Clicking mint initiates a transaction to the smart contract
   - Gas estimation is performed first to validate the transaction
   - Upon success, a confirmation message is displayed

3. **Error Handling**:
   - The app handles various errors including:
     - MetaMask not installed
     - Connection failures
     - Gas estimation failures
     - Transaction failures

## 🎨 UI Features

- Gradient backgrounds and buttons
- Loading animations
- Status indicators
- Responsive design for mobile and desktop
- Clear error and success messages

## 🛠️ Customization

To customize this dApp for your own contract:

1. Update the `contractAddress` variable in `MintNFT.js`
2. Modify the ABI according to your contract
3. Update the parameters in the `mintReserve` function call

## 📱 Mobile Responsiveness

The UI is designed to work well on various screen sizes including mobile devices.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- [Next.js](https://nextjs.org/)
- [ethers.js](https://docs.ethers.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [MetaMask](https://metamask.io/)
