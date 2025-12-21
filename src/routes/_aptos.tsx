import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import AptosConnectWallet from "@/components/connect-wallet/connect-wallet-button.aptos";
import Header from "@/components/header/header";

export const Route = createFileRoute("/_aptos")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <AptosWalletAdapterProvider autoConnect={true} optInWallets={["Petra"]}>
            <Header connectWalletButton={<AptosConnectWallet />} />
            <Outlet />
        </AptosWalletAdapterProvider>
    );
}
