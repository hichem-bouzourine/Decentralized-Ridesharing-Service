import { createContext, useEffect, useState } from "react";

interface EthereumContextProps {
  value?: string;
  connectWallet?: () => void;
  checkIfWalletIsConnected?: () => void;
  connectedAccount?: string;
  setConnectedAccount?: any;
}

export const EthereumContext = createContext<EthereumContextProps>({});

declare global {
  interface Window {
    ethereum?: any;
  }
}

const { ethereum } = window;

export const EthereumProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [connectedAccount, setConnectedAccount] = useState("");

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install Metamask");

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      setConnectedAccount(accounts[0]);
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) return alert("Please install metamask");

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length) {
        setConnectedAccount(accounts[0]);
      } else {
        console.log("No account found");
      }
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object");
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <EthereumContext.Provider
      value={{
        value: "MagnaChain",
        connectWallet,
        checkIfWalletIsConnected,
        connectedAccount,
        setConnectedAccount,
      }}
    >
      {children}
    </EthereumContext.Provider>
  );
};
