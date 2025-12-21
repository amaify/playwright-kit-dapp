import { createFileRoute, Outlet } from "@tanstack/react-router";
import NearConnectWallet from "@/components/connect-wallet/connect-wallet-button.near";
import Header from "@/components/header/header";
import NearProvider from "@/providers/near-provider";
import "@near-wallet-selector/modal-ui/styles.css";

export const Route = createFileRoute("/_near")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <NearProvider>
            <Header connectWalletButton={<NearConnectWallet />} />
            <Outlet />
        </NearProvider>
    );
}
