# Stash

A sleek, self-custodial Ethereum wallet extension built for speed and security.

## 🚀 Core Functionality

- **Wallet Onboarding**: Generate a new 12-word **BIP-39** mnemonic or import an existing one via a professional 12-input grid.
- **Secure Vault**: AES encryption for mnemonics using a user-defined password. Keys are stored locally and never leave the browser.
- **Session Management**: Manual **Lock/Unlock** flow to clear sensitive data from memory and secure the UI.
- **Live Dashboard**:
  - Real-time **ETH balance** fetching via Alchemy RPC.
  - Automatic **USD valuation** using live price feeds from CoinGecko.
  - One-click address copying with visual checkmark confirmation.
- **Standards**: Uses **BIP-44** derivation paths for full compatibility with MetaMask and Backpack.

## 🛠 Tech Stack

- **Framework**: [WXT](https://wxt.dev) (Vite-based extension engine)
- **Blockchain**: [Ethers.js v6](https://docs.ethers.org)
- **Runtime**: [Bun](https://bun.sh)
- **UI**: [Shadcn UI](https://ui.shadcn.com), [Tailwind CSS](https://tailwindcss.com), & [Lucide Icons](https://lucide.dev)

## 🔒 Security

- **No Backend**: 100% client-side logic. Zero data collection.
- **Encryption**: High-standard `scrypt` key derivation to protect the encrypted JSON vault.
- **Privacy**: Your password is the only key to your funds; even with local file access, the vault remains unreadable.

---

**Status**: MVP (Onboarding + Balance + Security)
