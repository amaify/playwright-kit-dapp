import type { Wallet } from "@injectivelabs/wallet-base";
import type { WalletStrategy } from "@injectivelabs/wallet-strategy";
import { type ReactNode, useEffect, useState } from "react";
import { toast } from "sonner";
import { InjectiveWalletContext, type InjectiveWalletContextValue } from "./use-injective.ts";
import injectiveWalletProfiles from "./wallet-profiles.ts";

export default function InjectiveProvider({ children }: { children: ReactNode }) {
    const [isLoading, setIsLoading] = useState(false);
    const [wallet, setWallet] = useState<Wallet | undefined>(undefined);
    const [address, setAddress] = useState<string | undefined>(undefined);
    const [walletStrategy, setWalletStrategy] = useState<WalletStrategy | undefined>(undefined);

    // Connect on load if wallet in local storage
    // biome-ignore lint/correctness/useExhaustiveDependencies: nothing
    useEffect(() => {
        (async () => {
            const { getWalletFromLocalStorage } = await import("./injective-provider.utils.ts");
            const initialWallet = await getWalletFromLocalStorage();
            if (initialWallet) {
                await connect(initialWallet, true);
            }
        })();
    }, []);

    // Connect wallet
    const connect = async (selectedWallet: Wallet, fromSession: boolean = false) => {
        const { getInjectiveAccountAddress, setWalletToLocalStorage, getWalletStrategy } = await import(
            "./injective-provider.utils.ts"
        );

        // Don't connect if already connected
        if (address) return;
        const walletStrategy = await getWalletStrategy();
        setIsLoading(true);

        try {
            if (!walletStrategy) throw new Error("Wallet strategy not initialized. Please try again.");
            await walletStrategy.disconnect();
            walletStrategy.setWallet(selectedWallet);

            // If we ae loading a connection from local storage
            // It would be better if wallet strategy could exposed a method to check if the wallet is already connected
            // We rely on our local storage to be in sync with the wallet strategy
            const addresses = fromSession
                ? await walletStrategy.getAddresses()
                : await walletStrategy.enableAndGetAddresses();

            if (!addresses?.length) {
                throw new Error("There are no addresses linked to this wallet.");
            }

            // biome-ignore lint/style/noNonNullAssertion: nothing
            const currentAddress = addresses[0]!;
            const currentWallet = walletStrategy.getWallet();

            setWallet(currentWallet);
            setWalletToLocalStorage(currentWallet);
            setAddress(await getInjectiveAccountAddress(currentAddress));
            setWalletStrategy(walletStrategy);
            walletStrategy.onAccountChange(() => connect(currentWallet, fromSession));
        } catch (_error) {
            toast.error("Failed to connect to wallet");
        } finally {
            setIsLoading(false);
        }
    };

    // Disconnect wallet
    const disconnect = async () => {
        const { clearWalletFromLocalStorage } = await import("./injective-provider.utils.ts");
        setIsLoading(true);

        try {
            if (walletStrategy) await walletStrategy.disconnect();
            setWallet(undefined);
            clearWalletFromLocalStorage();
            setAddress(undefined);
            setWalletStrategy(undefined);
        } catch (_error) {
            toast("Failed to disconnect wallet");
        } finally {
            setIsLoading(false);
        }
    };

    const value: InjectiveWalletContextValue = {
        address,
        wallet: wallet ? injectiveWalletProfiles.find((_wallet) => _wallet.id === wallet) : undefined,
        isConnected: Boolean(address),
        walletStrategy,
        connect,
        disconnect,
        isLoading,
    };

    return <InjectiveWalletContext.Provider value={value}>{children}</InjectiveWalletContext.Provider>;
}
