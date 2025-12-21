import { createFileRoute, Outlet } from "@tanstack/react-router";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { createConfig, http, injected, WagmiProvider } from "wagmi";
import { sepolia } from "wagmi/chains";
import EVMConnectWallet from "@/components/connect-wallet/connect-wallet-button.evm";
import Header from "@/components/header/header";

export const Route = createFileRoute("/_evm")({
    component: RouteComponent,
});

const config = createConfig(
    getDefaultConfig({
        chains: [sepolia],
        connectors: [injected()],
        transports: {
            [sepolia.id]: http(`https://rpc.sepolia.org`),
        },
        walletConnectProjectId: "",
        appName: "Playwright Kit Web3",
        appDescription: "Test DApp",
        appUrl: "", // your app's url
        appIcon: "", // your app's icon, no bigger than 1024x1024px (max. 1MB)
    }),
);

function RouteComponent() {
    return (
        <WagmiProvider config={config}>
            <ConnectKitProvider>
                <Header connectWalletButton={<EVMConnectWallet />} />
                <Outlet />
            </ConnectKitProvider>
        </WagmiProvider>
    );
}
