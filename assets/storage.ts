import { storage } from "@wxt-dev/storage";
import { ChainType } from "./chainConfig";

export interface WalletAccount {
  address: string;
  publicKey: string;
  derivationPath: string;
}

export interface ChainAccounts {
  accounts: Record<string, WalletAccount>;
  activeAccount: string;
}

export interface WalletState {
  chains: Record<string, ChainAccounts>;
  selectedChain: ChainType;
  isLocked: boolean;
}

const defaultWalletState: WalletState = {
  chains: {},
  selectedChain: "ethereum",
  isLocked: true,
};

export const walletStorage = storage.defineItem<WalletState>(
  "local:wallet_state",
  {
    fallback: defaultWalletState,
  },
);

export const encryptedVault = storage.defineItem<string | null>(
  "local:encrypted_vault",
  { fallback: null },
);
