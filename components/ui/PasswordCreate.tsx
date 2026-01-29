import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Lock } from "lucide-react";

interface Props {
  onNext: (password: string) => void;
  onBack: () => void;
}

export function PasswordCreate({ onNext, onBack }: Props) {
  const [pwd, setPwd] = useState("");
  const [confirm, setConfirm] = useState("");

  const isValid = pwd.length >= 8 && pwd === confirm;

  return (
    <div className="flex flex-col h-full space-y-6 animate-in fade-in slide-in-from-right-4">
      <Button
        variant="ghost"
        size="icon"
        onClick={onBack}
        className="-ml-2 w-8 h-8"
      >
        <ArrowLeft className="w-4 h-4" />
      </Button>

      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Create a password</h2>
        <p className="text-sm text-muted-foreground">
          You will use this to unlock your wallet on this device.
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="At least 8 characters"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="confirm">Confirm Password</Label>
          <Input
            id="confirm"
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-grow" />

      <Button
        className="w-full h-12"
        disabled={!isValid}
        onClick={() => onNext(pwd)}
      >
        <Lock className="w-4 h-4 mr-2" />
        Next
      </Button>
    </div>
  );
}
