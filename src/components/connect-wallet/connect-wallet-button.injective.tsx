import useInjective from "@/providers/use-injective";
import { Button } from "../ui/button";

export default function InjectiveConnectWallet() {
    const { connect, disconnect, address, isConnected } = useInjective();

    if (!isConnected) {
        return (
            <Button className="uppercase" onClick={() => connect("keplr")}>
                Connect wallet
            </Button>
        );
    }

    const truncatedAddress = `${address?.slice(0, 6)}...${address?.slice(-6)}`;
    return <Button onClick={disconnect}>{truncatedAddress}</Button>;
}
