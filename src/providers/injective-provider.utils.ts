import { ChainId, EvmChainId } from "@injectivelabs/ts-types";
import type { Wallet } from "@injectivelabs/wallet-base";
import injectiveWalletProfiles, { type InjectiveWalletProfile } from "./wallet-profiles";

export const getWalletStrategy = async () => {
    const { WalletStrategy } = await import("@injectivelabs/wallet-strategy");

    return new WalletStrategy({
        chainId: ChainId.Testnet,
        evmOptions: {
            evmChainId: EvmChainId.Sepolia,
            rpcUrl: "https://rpc.sepolia.org",
        },
        strategies: {},
    });
};

// Get wallet details from ID
export function getWalletDetails(walletId: Wallet): InjectiveWalletProfile | undefined {
    const wallet = injectiveWalletProfiles.find((wallet) => wallet.id === walletId);
    return wallet;
}

const CONNECTION_LOCAL_STORAGE_KEY = "injectiveWalletConnection";

export async function getWalletFromLocalStorage(): Promise<InjectiveWalletProfile["id"] | undefined> {
    const wallet = localStorage.getItem(CONNECTION_LOCAL_STORAGE_KEY);

    if (!wallet) return undefined;

    const parsedWallet = JSON.parse(wallet);

    return parsedWallet;
}

export function setWalletToLocalStorage(input: Wallet) {
    localStorage.setItem(CONNECTION_LOCAL_STORAGE_KEY, JSON.stringify(input));
}

export function clearWalletFromLocalStorage() {
    localStorage.removeItem(CONNECTION_LOCAL_STORAGE_KEY);
}

export async function getInjectiveAccountAddress(account: string) {
    if (account.startsWith("inj")) return account;
    const { getInjectiveAddress } = await import("@injectivelabs/sdk-ts");
    return getInjectiveAddress(account);
}
