import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChainType, CHAIN_CONFIGS } from "@/assets/chainConfig";

interface AssetsListProps {
  chain: ChainType;
  balance: string;
  symbol: string;
  usdValue: string;
}

export function AssetsList({
  chain,
  balance,
  symbol,
  usdValue,
}: AssetsListProps) {
  const chainConfig = CHAIN_CONFIGS[chain];

  return (
    <Tabs defaultValue="assets" className="w-full pt-4">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="assets">Assets</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
      </TabsList>
      <TabsContent value="assets" className="pt-4">
        <div className="flex justify-between items-center p-3 hover:bg-muted/50 rounded-lg cursor-pointer transition-colors">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                chain === "ethereum"
                  ? "bg-blue-500/20 text-blue-500"
                  : "bg-purple-500/20 text-purple-500"
              }`}
            >
              {chainConfig.icon}
            </div>
            <div>
              <p className="font-medium">{chainConfig.name}</p>
              <p className="text-xs text-muted-foreground">
                {balance} {symbol}
              </p>
            </div>
          </div>
          <p className="font-medium">${usdValue}</p>
        </div>
      </TabsContent>
      <TabsContent
        value="activity"
        className="text-center py-10 text-muted-foreground text-sm"
      >
        No recent activity found.
      </TabsContent>
    </Tabs>
  );
}
