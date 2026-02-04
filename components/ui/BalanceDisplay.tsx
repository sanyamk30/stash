import { ChainType, CHAIN_CONFIGS } from "@/assets/chainConfig";

interface BalanceDisplayProps {
  balance: string;
  symbol: string;
  usdValue: string;
  loading: boolean;
}

export function BalanceDisplay({
  balance,
  symbol,
  usdValue,
  loading,
}: BalanceDisplayProps) {
  return (
    <div className="flex flex-col items-center py-4 space-y-1">
      <span className="text-4xl font-bold">
        {loading ? "..." : `$${usdValue}`}
      </span>
      <span className="text-muted-foreground text-sm">
        {balance} {symbol}
      </span>
    </div>
  );
}
