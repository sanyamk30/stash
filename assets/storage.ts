import { storage } from "@wxt-dev/storage";

export interface WalletState {
  address: string | null;
  publicKey: string | null;
  isLocked: boolean;
}

export const walletStorage = storage.defineItem<WalletState>(
  "local:wallet_state",
  {
    fallback: {
      address: null,
      publicKey: null,
      isLocked: true,
    },
  },
);

export const encryptedVault = storage.defineItem<string | null>(
  "local:encrypted_vault",
  { fallback: null },
);
