import { Button } from "@/components/ui/button";
import { RocketIcon, ShieldCheck } from "lucide-react";

export const OnboardingStart = ({
  onNext,
  onImport,
}: {
  onNext: () => void;
  onImport: () => void;
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-4 space-y-8 h-full">
      <div className="flex flex-col items-center space-y-2 text-center">
        <div className="p-3 rounded-2xl bg-primary/10 mb-2">
          <RocketIcon className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight">Backpack Clone</h1>
        <p className="text-muted-foreground text-sm px-4">
          The non-custodial wallet for the next generation of web3.
        </p>
      </div>

      <div className="w-full space-y-4">
        <Button className="w-full h-12 text-md font-semibold" onClick={onNext}>
          Create a new wallet
        </Button>
        <Button
          variant="outline"
          className="w-full h-12 text-md"
          onClick={onImport}
        >
          Import existing wallet
        </Button>
      </div>

      <div className="flex items-center gap-2 text-xs text-muted-foreground pt-4">
        <ShieldCheck className="w-4 h-4" />
        Built with bank-grade security
      </div>
    </div>
  );
};
