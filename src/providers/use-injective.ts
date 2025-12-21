import type { Wallet } from "@injectivelabs/wallet-base";
import type { WalletStrategy } from "@injectivelabs/wallet-strategy";
import { createContext, useContext } from "react";
import type { InjectiveWalletProfile } from "./wallet-profiles";

export type InjectiveWalletContextValue = {
    address?: string;
    wallet?: InjectiveWalletProfile;
    isConnected: boolean;
    walletStrategy?: WalletStrategy;
    connect: (selectedWallet: Wallet) => Promise<void>;
    disconnect: () => Promise<void>;
    isLoading: boolean;
};

export const InjectiveWalletContext = createContext<InjectiveWalletContextValue | null>({
    isConnected: false,
    connect: async () => {},
    disconnect: async () => {},
    isLoading: false,
});

export default function useInjective() {
    const context = useContext(InjectiveWalletContext);
    if (!context) {
        throw new Error("useInjective must be used within an InjectiveProvider");
    }
    return context;
}
