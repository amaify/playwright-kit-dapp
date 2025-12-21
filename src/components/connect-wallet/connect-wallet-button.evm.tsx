import { ConnectKitButton } from "connectkit";
import { Button } from "../ui/button";

export default function EVMConnectWallet() {
    return (
        <ConnectKitButton.Custom>
            {({ isConnected, show, truncatedAddress }) => {
                return (
                    <Button variant="default" onClick={show} size="default" className="text-lg uppercase">
                        {isConnected ? truncatedAddress : "Connect Wallet"}
                    </Button>
                );
            }}
        </ConnectKitButton.Custom>
    );
}
