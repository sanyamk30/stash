import { useState } from "react";
import { ethers } from "ethers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { encryptedVault, walletStorage } from "@/assets/storage";
import { RocketIcon } from "lucide-react";

export function Unlock({ onUnlock }: { onUnlock: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUnlock = async () => {
    setLoading(true);
    setError("");
    try {
      const encryptedJson = await encryptedVault.getValue();
      if (!encryptedJson) throw new Error("No vault found");

      await ethers.Wallet.fromEncryptedJson(encryptedJson, password);

      const currentData = await walletStorage.getValue();
      await walletStorage.setValue({ ...currentData, isLocked: false });
      onUnlock();
    } catch (e) {
      setError("Invalid password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full space-y-6 p-4 text-center">
      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
        <div className="p-3 rounded-2xl bg-primary/10 mb-2">
          <RocketIcon className="w-10 h-10 text-primary" />
        </div>
      </div>
      <h1 className="text-xl font-bold">Welcome back</h1>
      <div className="w-full space-y-2">
        <Input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-xs text-destructive">{error}</p>}
      </div>
      <Button className="w-full" onClick={handleUnlock} disabled={loading}>
        {loading ? "Unlocking..." : "Unlock"}
      </Button>
    </div>
  );
}
