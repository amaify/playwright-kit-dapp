import useInjective from "@/providers/use-injective";
import { Button } from "../ui/button";

export default function InjectiveConnectWallet() {
    const { connect, disconnect, address, isConnected } = useInjective();

    if (!isConnected) {
        return (
            <Button className="uppercase" data-testid="connect-wallet-button" onClick={() => connect("keplr")}>
                Connect wallet
            </Button>
        );
    }

    const truncatedAddress = `${address?.slice(0, 6)}...${address?.slice(-6)}`;
    return (
        <Button data-testid="wallet-connected-button" onClick={disconnect}>
            {truncatedAddress}
        </Button>
    );
}
