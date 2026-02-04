export type ChainType = "ethereum" | "solana";

export interface ChainConfig {
  id: ChainType;
  name: string;
  icon: string;
  symbol: string;
  decimals: number;
  derivationPath: (accountIndex: number) => string;
}

export const CHAIN_CONFIGS: Record<ChainType, ChainConfig> = {
  ethereum: {
    id: "ethereum",
    name: "Ethereum",
    icon: "E",
    symbol: "ETH",
    decimals: 18,
    derivationPath: (accountIndex: number) => `m/44'/60'/${accountIndex}'/0/0`,
  },
  solana: {
    id: "solana",
    name: "Solana",
    icon: "S",
    symbol: "SOL",
    decimals: 9,
    derivationPath: (accountIndex: number) => `m/44'/501'/${accountIndex}'/0'`,
  },
};

export const SUPPORTED_CHAINS: ChainType[] = ["ethereum", "solana"];
