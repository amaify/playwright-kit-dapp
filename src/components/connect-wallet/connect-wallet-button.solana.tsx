import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { Button } from "../ui/button";

export default function SolanaConnectWallet() {
    const { setVisible } = useWalletModal();
    const { connected, publicKey, disconnect } = useWallet();

    if (!connected) {
        return (
            <Button data-testid="connect-wallet-button" onClick={() => setVisible(true)}>
                Connect Wallet
            </Button>
        );
    }

    const truncatedAddress = `${publicKey?.toBase58().slice(0, 6)}...${publicKey?.toBase58().slice(-6)}`;
    return (
        <Button data-testid="wallet-connected-button" onClick={disconnect}>
            {truncatedAddress}
        </Button>
    );
}
