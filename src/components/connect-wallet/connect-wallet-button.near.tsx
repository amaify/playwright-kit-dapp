import { useNearWallet } from "@/providers/near-provider";
import { Button } from "../ui/button";

export default function NearConnectWallet() {
    const { accountId, connectWallet, disconnectWallet, isConnected } = useNearWallet();

    if (!isConnected) {
        return (
            <Button className="uppercase" onClick={connectWallet}>
                Connect wallet
            </Button>
        );
    }

    return <Button onClick={disconnectWallet}>{accountId}</Button>;
}
