import { UseWalletClientReturnType, useAccount, useConnectorClient, useWalletClient } from "wagmi";
import { useEthersSigner } from "./useEthersSigner";
import { useEffect } from "react";

export type WalletClient = UseWalletClientReturnType["data"];

export default function useWallet() {
  const { address, isConnected, connector, chainId } = useAccount();
  const { data: connectorClient } = useConnectorClient();
  const { data: walletClient } = useWalletClient();

  const signer = useEthersSigner();

  useEffect(() => {
    if (window && window["MetaCRMTracking"]?.manualConnectWallet) {
      window["MetaCRMTracking"].manualConnectWallet(address);
    }
    if (window && window["MetaCRMWidget"]?.manualConnectWallet) {
      window["MetaCRMWidget"].manualConnectWallet(address);
    }
    const handleConnectWidget = () => {
      window["MetaCRMWidget"].manualConnectWallet(address);
    };
    document.addEventListener("MetaCRMLoaded", handleConnectWidget);
    return () => {
      document.removeEventListener("MetaCRMLoaded", handleConnectWidget);
    };
  }, [address]);

  return {
    account: address,
    active: isConnected,
    connector: connector!,
    chainId: chainId,
    signer: signer,
    connectorClient,
    walletClient,
  };
}
