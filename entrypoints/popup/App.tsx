import { useState } from "react";
import "./App.css";
import { WalletState, walletStorage } from "@/assets/storage";

function App() {
  const [state, setState] = useState<WalletState | null>(null);

  useEffect(() => {
    walletStorage.getValue().then(setState);

    const unwatch = walletStorage.watch(setState);
    return () => unwatch();
  }, []);

  const handleReset = async () => {
    await walletStorage.removeValue();
    // State updates automatically via watch()
  };

  if (!state) return <div>Loading...</div>;

  return (
    <div style={{ width: 300, padding: 16 }}>
      <h2>Backpack Clone . Why can i not see anything</h2>
      {state.address ? (
        <div>
          <p>
            Address: {state.address.slice(0, 6)}...{state.address.slice(-4)}
          </p>
          <button onClick={handleReset}>Logout / Reset</button>
        </div>
      ) : (
        <p>No wallet found. Please create one.</p>
      )}
    </div>
  );
}

export default App;
