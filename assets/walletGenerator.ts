import * as bip39 from "bip39";
import { ethers } from "ethers";
import { Keypair } from "@solana/web3.js";
import { ChainType, CHAIN_CONFIGS } from "./chainConfig";
import { WalletAccount } from "./storage";

export interface GeneratedWallets {
  mnemonic: string;
  wallets: Record<ChainType, WalletAccount>;
}

export function deriveEthereumWallet(
  mnemonic: string,
  derivationPath: string,
): WalletAccount {
  try {
    const wallet = ethers.HDNodeWallet.fromPhrase(
      mnemonic,
      undefined,
      derivationPath,
    );
    return {
      address: wallet.address,
      publicKey: wallet.signingKey.publicKey,
      derivationPath,
    };
  } catch (error) {
    throw new Error(`Failed to derive Ethereum wallet: ${error}`);
  }
}

export function deriveSolanaWallet(
  mnemonic: string,
  derivationPath: string,
): WalletAccount {
  try {
    const seed = bip39.mnemonicToSeedSync(mnemonic);
    const seedBuffer = seed.slice(0, 32);
    const keypair = Keypair.fromSeed(seedBuffer);

    return {
      address: keypair.publicKey.toString(),
      publicKey: keypair.publicKey.toString(),
      derivationPath,
    };
  } catch (error) {
    throw new Error(`Failed to derive Solana wallet: ${error}`);
  }
}

/**
 * Generate wallets for specified chains at account 0
 */
export function generateWalletsForChains(
  mnemonic: string,
  chains: ChainType[],
  accountIndex: number = 0,
): Record<ChainType, WalletAccount> {
  const wallets: Partial<Record<ChainType, WalletAccount>> = {};

  for (const chain of chains) {
    const config = CHAIN_CONFIGS[chain];
    const derivationPath = config.derivationPath(accountIndex);

    if (chain === "ethereum") {
      wallets.ethereum = deriveEthereumWallet(mnemonic, derivationPath);
    } else if (chain === "solana") {
      wallets.solana = deriveSolanaWallet(mnemonic, derivationPath);
    }
  }

  return wallets as Record<ChainType, WalletAccount>;
}
