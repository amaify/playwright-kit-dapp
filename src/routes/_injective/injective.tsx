import { getNetworkEndpoints, Network } from "@injectivelabs/networks";
import { MsgSend } from "@injectivelabs/sdk-ts";
import { BigNumberInBase } from "@injectivelabs/utils";
import { MsgBroadcaster } from "@injectivelabs/wallet-core";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { TransferForm } from "@/components/transfer-form/transfer-form";
import useInjective from "@/providers/use-injective";

export const Route = createFileRoute("/_injective/injective")({
    component: RouteComponent,
});

function RouteComponent() {
    const [address, setAddress] = useState("");
    const [amount, setAmount] = useState("");
    const { walletStrategy, address: injectiveAddress } = useInjective();

    const handleSubmit = async () => {
        if (!walletStrategy || !injectiveAddress) return;

        const msgBroadcastClient = new MsgBroadcaster({
            walletStrategy,
            network: Network.Testnet,
            simulateTx: true,
            endpoints: getNetworkEndpoints(Network.Testnet),
            gasBufferCoefficient: 1.1,
        });

        const msg = MsgSend.fromJSON({
            amount: {
                denom: "inj",
                amount: new BigNumberInBase(Number(amount)).toWei().toFixed(),
            },
            srcInjectiveAddress: injectiveAddress,
            dstInjectiveAddress: address,
        });

        // Prepare + Sign + Broadcast the transaction using the Wallet Strategy
        const response = await msgBroadcastClient.broadcast({
            injectiveAddress: injectiveAddress,
            msgs: msg,
        });

        if (response.code === 0) {
            toast.success("Transaction successful");
            setAddress("");
            setAmount("");
        } else {
            toast.error("Transaction failed");
        }
    };

    return (
        <div className="flex flex-col items-center gap-6 p-6">
            <div className="flex flex-col gap-2 text-center">
                <h1 className="text-2xl font-bold">Injective Transfer</h1>
                <p className="text-foreground-muted text-lg">
                    Send INJ tokens to any address on the Injective network.
                </p>
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
