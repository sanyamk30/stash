import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { walletStorage } from "@/assets/storage";
import { Copy, Send, ArrowDownLeft, Lock, Check } from "lucide-react";
import { useEthBalance } from "@/hooks/useEthBalance";

export function Dashboard() {
  const [copied, setCopied] = useState(false);
  const { address, ethBalance, usdValue, loading } = useEthBalance();

  const handleLock = async () => {
    const current = await walletStorage.getValue();
    await walletStorage.setValue({ ...current, isLocked: true });
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full space-y-6">
      {/* Header: Address & Lock */}
      <div className="flex justify-between items-center px-1">
        <Button
          variant="ghost"
          size="sm"
          className="font-mono text-xs"
          onClick={copyAddress}
        >
          {address.slice(0, 6)}...{address.slice(-4)}
          {copied ? (
            <Check className="ml-2 h-3 w-3 text-green-500 animate-in zoom-in" />
          ) : (
            <Copy className="ml-2 h-3 w-3" />
          )}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 hover:text-destructive transition-colors"
          onClick={handleLock}
        >
          <Lock className="h-4 w-4" />
        </Button>
      </div>

      {/* Balance Display */}
      <div className="flex flex-col items-center py-4 space-y-1">
        <span className="text-4xl font-bold">
          {loading ? "..." : `$${usdValue}`}
        </span>
        <span className="text-muted-foreground text-sm">{ethBalance} ETH</span>
      </div>

      {/* TODO : Primary Actions */}
      <div className="grid grid-cols-2 gap-4 px-2">
        <Button className="w-full bg-primary text-primary-foreground h-12">
          <Send className="mr-2 h-4 w-4" /> Send
        </Button>
        <Button variant="secondary" className="w-full h-12">
          <ArrowDownLeft className="mr-2 h-4 w-4" /> Receive
        </Button>
      </div>

      {/* Tabs for Assets/Activity */}
      <Tabs defaultValue="assets" className="w-full pt-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="assets">Assets</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>
        <TabsContent value="assets" className="pt-4">
          <div className="flex justify-between items-center p-3 hover:bg-muted/50 rounded-lg cursor-pointer transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center font-bold text-blue-500">
                E
              </div>
              <div>
                <p className="font-medium">Ethereum</p>
                <p className="text-xs text-muted-foreground">
                  {ethBalance} ETH
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
    </div>
  );
}
