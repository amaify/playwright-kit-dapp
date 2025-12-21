import { setupWalletSelector, type Wallet, type WalletSelector } from "@near-wallet-selector/core";
import { setupMeteorWallet } from "@near-wallet-selector/meteor-wallet";
import { createContext, type ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { toast as sonnerToast, toast } from "sonner";
import "@near-wallet-selector/modal-ui/styles.css";

const wallets = [setupMeteorWallet()];

type NearWalletContextType = {
    wallet: Wallet | null;
    accountId: string | undefined;
    isConnected: boolean;
    walletSelector: WalletSelector | null;
    connectWallet: () => void;
    disconnectWallet: () => void;
    isLoading: boolean;
};

const NearWalletContext = createContext<NearWalletContextType>({
    wallet: null,
    accountId: undefined,
    isConnected: false,
    walletSelector: null,
    connectWallet: () => {},
    disconnectWallet: () => {},
    isLoading: false,
});

export default function NearProvider({ children }: { children: ReactNode }) {
    const [selector, setSelector] = useState<WalletSelector | null>(null);
    const [wallet, setWallet] = useState<Wallet | null>(null);
    const [accountId, setAccountId] = useState<string | undefined>();
    const [isLoading, setIsLoading] = useState(false);

    const selectedWalletId = selector?.store.getState().selectedWalletId;

    const initializeWalletSelector = useCallback(async () => {
        const _selector = await setupWalletSelector({
            network: {
                networkId: "testnet",
                nodeUrl: "https://test.rpc.fastnear.com",
                explorerUrl: "https://testnet.nearblocks.io/",
                indexerUrl: "",
                helperUrl: "",
            },

            modules: wallets,
            debug: true,
        });

        setSelector(_selector);
        return _selector;
    }, []);

    // biome-ignore lint/correctness/useExhaustiveDependencies: nothing
    useEffect(() => {
        // biome-ignore lint/suspicious/noExplicitAny: nothing
        let _subscription: any = null;
        initializeWalletSelector()
            .then((selector) => {
                _subscription = selector.store.observable.subscribe(async (state) => {
                    const signedAccount = state.accounts.find((account) => account.active)?.accountId;
                    setAccountId(signedAccount);

                    if (signedAccount) {
                        const walletInstance = await selector.wallet();
                        setWallet(walletInstance);
                    } else {
                        setWallet(null);
                        sonnerToast.dismiss();
                    }
                });
            })
            .catch((err) => {
                console.error(err);
            });

        return () => {
            if (_subscription) {
                _subscription.unsubscribe();
            }
        };
    }, []);

    async function disconnectWallet() {
        try {
            if (selector?.isSignedIn()) {
                const wallet = await selector?.wallet(selectedWalletId ?? "");

                await wallet?.signOut();
            }
        } catch (error) {
            toast.error(`Disconnecting wallet failed: ${(error as Error).message}`);
        }
    }

    async function connectWallet() {
        if (!selector) {
            throw Error("Wallet selector not initialized");
        }
        setIsLoading(true);
        try {
            const { setupModal } = await import("@near-wallet-selector/modal-ui");
            const modalInstance = setupModal(selector, { contractId: "hello.near-examples.testnet", });
            modalInstance.show();
            setIsLoading(false);
        } catch (error) {
            toast.error(`Failed to open wallet selector ${(error as Error).message}`);
            setIsLoading(false);
        }
    }

    const isConnected = selector?.isSignedIn() ?? false;

    const walletSelectorValue = {
        wallet,
        accountId,
        isConnected,
        walletSelector: selector,
        connectWallet,
        disconnectWallet,
        isLoading,
    };
    return <NearWalletContext.Provider value={walletSelectorValue}>{children}</NearWalletContext.Provider>;
}

export function useNearWallet() {
    const nearWalletSelector = useContext(NearWalletContext);

    if (!nearWalletSelector) throw new Error("useNearWallet must be used within an NearWalletProvider");

    return nearWalletSelector;
}
