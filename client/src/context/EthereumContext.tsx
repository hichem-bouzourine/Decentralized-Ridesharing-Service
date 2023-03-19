import { createContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import { ClientAbi, ClientContractAddress } from "../utils/constants";
import { DriverAbi, DriverContractAddress } from "../utils/constants";
import { RideAbi, RideContractAddress } from "../utils/constants";

interface EthereumContextProps {
  value?: string;
  connectWallet?: () => void;
  checkIfWalletIsConnected?: () => void;
  connectedAccount?: string;
  setConnectedAccount?: any;
  signupUser?: any;
  findUser?: any;
}

export const EthereumContext = createContext<EthereumContextProps>({});

declare global {
  interface Window {
    ethereum?: any;
  }
}

const { ethereum } = window;

const getContract = (
  contractAddress: string,
  contractAbi: any
): ethers.Contract | undefined => {
  if (!ethereum) return;
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();

  const Contract = new ethers.Contract(contractAddress, contractAbi, signer);

  return Contract;
};

export const EthereumProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [connectedAccount, setConnectedAccount] = useState("");

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install Metamask");

      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const account = await signer.getAddress();

      setConnectedAccount(account);
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) return alert("Please install metamask");

      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const account = await signer.getAddress();

      if (account) {
        setConnectedAccount(account);
      } else {
        console.log("No account found");
      }
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object");
    }
  };

  const signupUser = async (fullname: string, phoneNumber: string) => {
    try {
      if (!ethereum) return alert("PLEASE install metamask");

      const ClientContract = getContract(ClientContractAddress, ClientAbi);
      const signup = await ClientContract?.registerUser(fullname, phoneNumber);
    } catch (error) {
      console.log(error);
    }
  };

  const findUser = async (address: string) => {
    try {
      if (!ethereum) return alert("PLEASE install metamask");

      const ClientContract = getContract(ClientContractAddress, ClientAbi);
      const user = await ClientContract?.findUser(address);
      console.log(user);
    } catch (error) {
      console.log(error);
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
        signupUser,
        findUser,
      }}
    >
      {children}
    </EthereumContext.Provider>
  );
};
