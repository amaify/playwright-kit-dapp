import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { Button } from "../ui/button";

export default function SolanaConnectWallet() {
    const { setVisible } = useWalletModal();
    const { connected, publicKey, disconnect } = useWallet();

    if (!connected) {
        return <Button onClick={() => setVisible(true)}>Connect Wallet</Button>;
    }

    const truncatedAddress = `${publicKey?.toBase58().slice(0, 6)}...${publicKey?.toBase58().slice(-6)}`;
    return <Button onClick={disconnect}>{truncatedAddress}</Button>;
}
