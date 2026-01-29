import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Copy, Check, ShieldAlert } from "lucide-react";
import { walletStorage, encryptedVault } from "@/assets/storage";

export function MnemonicReveal({
  password,
  onComplete,
}: {
  password: string;
  onComplete: () => void;
}) {
  const [mnemonic, setMnemonic] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    const phrase = mnemonic.join(" ");
    navigator.clipboard.writeText(phrase);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFinish = async () => {
    const phrase = mnemonic.join(" ");
    const wallet = ethers.Wallet.fromPhrase(phrase);

    const encrypted = await wallet.encrypt(password);

    await encryptedVault.setValue(encrypted);
    await walletStorage.setValue({
      address: wallet.address,
      publicKey: wallet.signingKey.publicKey,
      isLocked: false,
    });

    onComplete();
  };

  useEffect(() => {
    const entropy = ethers.randomBytes(16);
    const phrase = ethers.Mnemonic.fromEntropy(entropy).phrase;
    setMnemonic(phrase.split(" "));
  }, []);

  return (
    <div className="flex flex-col h-full space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-bold">Secret Recovery Phrase</h2>
        <p className="text-sm text-muted-foreground">
          This phrase is the ONLY way to recover your wallet. Write it down.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-2 py-4">
        {mnemonic.map((word, i) => (
          <div
            key={i}
            className="flex gap-2 p-2 bg-muted rounded-md border text-sm"
          >
            <span className="text-muted-foreground">{i + 1}.</span>
            <span className="font-medium">{word}</span>
          </div>
        ))}
      </div>

      <div className="flex justify-center pb-4">
        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-primary"
          onClick={copyToClipboard}
        >
          {copied ? (
            <Check className="h-4 w-4 mr-2 text-green-500" />
          ) : (
            <Copy className="h-4 w-4 mr-2" />
          )}
          {copied ? "Copied" : "Copy to clipboard"}
        </Button>
      </div>

      <Alert
        variant="destructive"
        className="bg-destructive/10 text-destructive border-destructive/20"
      >
        <ShieldAlert className="h-4 w-4" />
        <AlertDescription className="text-xs">
          If you lose this phrase, your funds are gone forever. We cannot
          recover it for you.
        </AlertDescription>
      </Alert>

      <div className="flex-grow" />

      <Button className="w-full h-12" onClick={handleFinish}>
        I've Saved It
      </Button>
    </div>
  );
}
