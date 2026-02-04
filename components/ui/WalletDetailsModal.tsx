import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Copy, Check, Eye, EyeOff, ShieldAlert } from "lucide-react";
import { ChainType, CHAIN_CONFIGS } from "@/assets/chainConfig";
import { WalletAccount } from "@/assets/storage";

interface WalletDetailsModalProps {
  chain: ChainType;
  wallet: WalletAccount;
  privateKey?: string;
  onClose: () => void;
}

export function WalletDetailsModal({
  chain,
  wallet,
  privateKey,
  onClose,
}: WalletDetailsModalProps) {
  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const chainConfig = CHAIN_CONFIGS[chain];

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-background border border-border rounded-lg p-6 max-w-md w-full max-h-[80vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold">
            {chainConfig.icon}
          </div>
          <div>
            <h2 className="font-bold">{chainConfig.name} Wallet</h2>
            <p className="text-xs text-muted-foreground">Account 0</p>
          </div>
        </div>

        {/* Derivation Path */}
        <div className="space-y-2 mb-6">
          <p className="text-xs font-medium text-muted-foreground">
            Derivation Path
          </p>
          <code className="block text-xs bg-muted p-3 rounded-md break-all">
            {wallet.derivationPath}
          </code>
        </div>

        {/* Address */}
        <div className="space-y-2 mb-6">
          <p className="text-xs font-medium text-muted-foreground">Address</p>
          <div className="flex items-center gap-2">
            <code className="flex-grow text-xs bg-muted p-3 rounded-md break-all">
              {wallet.address}
            </code>
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 flex-shrink-0"
              onClick={() => copyToClipboard(wallet.address, "address")}
            >
              {copiedField === "address" ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Public Key */}
        <div className="space-y-2 mb-6">
          <p className="text-xs font-medium text-muted-foreground">
            Public Key
          </p>
          <div className="flex items-center gap-2">
            <code className="flex-grow text-xs bg-muted p-3 rounded-md break-all">
              {wallet.publicKey}
            </code>
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 flex-shrink-0"
              onClick={() => copyToClipboard(wallet.publicKey, "publicKey")}
            >
              {copiedField === "publicKey" ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Private Key (if available) */}
        {privateKey && (
          <div className="space-y-2 mb-6">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-muted-foreground">
                Private Key
              </p>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 gap-1"
                onClick={() => setShowPrivateKey(!showPrivateKey)}
              >
                {showPrivateKey ? (
                  <>
                    <EyeOff className="h-3 w-3" /> Hide
                  </>
                ) : (
                  <>
                    <Eye className="h-3 w-3" /> Reveal
                  </>
                )}
              </Button>
            </div>

            {showPrivateKey ? (
              <div className="flex items-center gap-2">
                <code className="flex-grow text-xs bg-muted p-3 rounded-md break-all font-mono">
                  {privateKey}
                </code>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 flex-shrink-0"
                  onClick={() => copyToClipboard(privateKey, "privateKey")}
                >
                  {copiedField === "privateKey" ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            ) : (
              <div className="text-xs bg-muted p-3 rounded-md text-center text-muted-foreground">
                ••••••••••••••••••••••••••••••••••••••••••
              </div>
            )}

            <Alert className="bg-destructive/10 border-destructive/20 text-destructive">
              <ShieldAlert className="h-4 w-4" />
              <AlertDescription className="text-xs">
                Never share your private key with anyone.
              </AlertDescription>
            </Alert>
          </div>
        )}

        {/* Close Button */}
        <Button className="w-full" onClick={onClose}>
          Close
        </Button>
      </div>
    </div>
  );
}
