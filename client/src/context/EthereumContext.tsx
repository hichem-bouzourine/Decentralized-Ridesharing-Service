import { createContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import { ClientAbi, ClientContractAddress } from "../utils/constants";
import { DriverAbi, DriverContractAddress } from "../utils/constants";
import { RideAbi, RideContractAddress } from "../utils/constants";
import { useNavigate } from "react-router-dom";

interface EthereumContextProps {
  value?: string;
  connectWallet?: () => void;
  checkIfWalletIsConnected?: () => void;
  connectedAccount?: string;
  setConnectedAccount?: any;
  signupUser?: any;
  findUser?: any;
  isRegistered?: any;
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
  const navigate = useNavigate();

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install Metamask");

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      if (accounts.length) {
        setConnectedAccount(accounts[0]);
      }
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

  const signupUser = async (fullname: string, phoneNumber: string) => {
    try {
      if (!ethereum) return alert("PLEASE install metamask");

      const ClientContract = getContract(ClientContractAddress, ClientAbi);
      const signup = await ClientContract?.registerUser(fullname, phoneNumber);
    } catch (error) {
      console.log(error);
    }
  };

  const isRegistered = async (address: string) => {
    try {
      if (!ethereum) return alert("PLEASE install metamask");

      const ClientContract = getContract(ClientContractAddress, ClientAbi);
      const isRegistered = await ClientContract?.isRegistered(address);
      return isRegistered;
    } catch (error) {
      console.log(error);
    }
  };

  const findUser = async (address: string) => {
    try {
      if (!ethereum) return alert("PLEASE install metamask");

      const ClientContract = getContract(ClientContractAddress, ClientAbi);
      const user = await ClientContract?.findUser(address);
      return user;
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
        isRegistered,
      }}
    >
      {children}
    </EthereumContext.Provider>
  );
};
