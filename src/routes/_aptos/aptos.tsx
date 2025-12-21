import { APTOS_COIN, Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { createFileRoute } from "@tanstack/react-router";
import Big from "big.js";
import { useState } from "react";
import { toast } from "sonner";
import { TransferForm } from "@/components/transfer-form/transfer-form";

export const Route = createFileRoute("/_aptos/aptos")({
    component: RouteComponent,
});

function smallToLarge(amount: number | string) {
    return new Big(amount)
        .times(10 ** 8)
        .round(0, Big.roundDown)
        .toString();
}

function RouteComponent() {
    const [address, setAddress] = useState("");
    const [amount, setAmount] = useState("");
    const { signAndSubmitTransaction, account } = useWallet();

    const handleSubmit = async () => {
        const aptos = new Aptos(new AptosConfig({ network: Network.TESTNET }));
        const response = await signAndSubmitTransaction({
            sender: account?.address,
            data: {
                function: "0x1::coin::transfer",
                typeArguments: [APTOS_COIN],
                functionArguments: [address, smallToLarge(amount)], // 1 is in Octas
            },
        });

        const status = await aptos.waitForTransaction({ transactionHash: response.hash });

        if (status.success) {
            setAddress("");
            setAmount("");
            toast.success("Transaction successful");
        } else {
            toast.error("Transaction failed");
        }
    };

    return (
        <div className="flex flex-col items-center gap-6 p-6">
            <div className="flex flex-col gap-2 text-center">
                <h1 className="text-2xl font-bold">Aptos Transfer</h1>
                <p className="text-foreground-muted text-lg">Send APT tokens to any address on the Aptos network.</p>
            </div>
            <TransferForm
                address={address}
                amount={amount}
                setAddress={setAddress}
                setAmount={setAmount}
                onSubmit={handleSubmit}
            />
        </div>
    );
}
