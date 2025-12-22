import { useNearWallet } from "@/providers/near-provider";
import { Button } from "../ui/button";

export default function NearConnectWallet() {
    const { accountId, connectWallet, disconnectWallet, isConnected } = useNearWallet();

    if (!isConnected) {
        return (
            <Button data-testid="connect-wallet-button" className="uppercase" onClick={connectWallet}>
                Connect wallet
            </Button>
        );
    }

    return (
        <Button data-testid="wallet-connected-button" onClick={disconnectWallet}>
            {accountId}
        </Button>
    );
}
