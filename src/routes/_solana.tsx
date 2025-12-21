import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import SolanaConnectWallet from "@/components/connect-wallet/connect-wallet-button.solana";
import Header from "@/components/header/header";
import "@solana/wallet-adapter-react-ui/styles.css";

export const Route = createFileRoute("/_solana")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <ConnectionProvider endpoint="https://api.devnet.solana.com">
            <WalletProvider wallets={[]} autoConnect>
                <WalletModalProvider>
                    <Header connectWalletButton={<SolanaConnectWallet />} />
                    <Outlet />
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
}
