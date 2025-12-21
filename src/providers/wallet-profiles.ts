import { Wallet } from "@injectivelabs/wallet-base";

type WalletBase = {
    id: Wallet;
    name: "Keplr" | "Leap Wallet" | "WalletConnect" | "MetaMask" | "Ledger";
    icon: string;
};

type ExtensionWallet = {
    isExtension: true;
    downloadUrl: string;
    checkIsInstalledFunction: () => boolean;
} & WalletBase;

type CustodyWallet = {
    isExtension: false;
} & WalletBase;

export type InjectiveWalletProfile = ExtensionWallet | CustodyWallet;

// Check if the window has a property
// Used to check if a wallet is installed
export function hasWindowProperty(path?: string): boolean {
    if (typeof window === "undefined" || !path) return false;

    return (
        path.split(".").reduce<unknown>((obj, key) => {
            if (typeof obj === "object" && obj !== null && key in obj) {
                return (obj as Record<string, unknown>)[key];
            }
            return undefined;
        }, window) !== undefined
    );
}

const injectiveWalletProfiles: InjectiveWalletProfile[] = [
    {
        id: Wallet.Keplr,
        name: "Keplr",
        icon: "/images/wallets/keplr.svg",
        downloadUrl: "https://www.keplr.app/get",
        isExtension: true,
        checkIsInstalledFunction: () => hasWindowProperty(Wallet.Keplr),
    },
    {
        id: Wallet.Leap,
        name: "Leap Wallet",
        icon: "/images/wallets/leap.svg",
        downloadUrl: "https://www.leapwallet.io/download",
        checkIsInstalledFunction: () => hasWindowProperty(Wallet.Leap),
        isExtension: true,
    },
    {
        id: Wallet.WalletConnect,
        name: "WalletConnect",
        icon: "/images/wallets/walletconnect.svg",
        isExtension: false,
    },
    {
        id: Wallet.Metamask,
        name: "MetaMask",
        icon: "/images/wallets/metamask.svg",
        downloadUrl: "https://metamask.io/download",
        checkIsInstalledFunction: () => hasWindowProperty("ethereum.isMetaMask"),
        isExtension: true,
    },
    {
        id: Wallet.Ledger,
        name: "Ledger",
        icon: "/images/wallets/ledger.svg",
        isExtension: false,
    },
];

export default injectiveWalletProfiles;
