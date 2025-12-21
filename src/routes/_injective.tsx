import { createFileRoute, Outlet } from "@tanstack/react-router";
import InjectiveConnectWallet from "@/components/connect-wallet/connect-wallet-button.injective";
import Header from "@/components/header/header";
import InjectiveProvider from "@/providers/injective-provider";

export const Route = createFileRoute("/_injective")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <InjectiveProvider>
            <Header connectWalletButton={<InjectiveConnectWallet />} />
            <Outlet />
        </InjectiveProvider>
    );
}
