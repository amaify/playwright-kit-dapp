import { actionCreators, type FinalExecutionOutcome } from "@near-wallet-selector/core";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { TransferForm } from "@/components/transfer-form/transfer-form";
import { useNearWallet } from "@/providers/near-provider";

export const Route = createFileRoute("/_near/near")({
    component: RouteComponent,
});

function RouteComponent() {
    const [address, setAddress] = useState("");
    const [amount, setAmount] = useState("");
    const { wallet } = useNearWallet();

    const handleSubmit = async () => {
        if (!wallet) return;
        const response = await wallet.signAndSendTransaction({
            receiverId: "guestbook.near-examples.testnet",
            actions: [
                actionCreators.functionCall(
                    "add_message",
                    { text: "Hello World!" },
                    BigInt("30000000000000"),
                    BigInt("10000000000000000000000"),
                ),
            ],
        });

        if ((response as FinalExecutionOutcome).final_execution_status === "EXECUTED_OPTIMISTIC") {
            toast.success("Transaction successful");
        } else {
            toast.error("Transaction failed");
        }
    };

    return (
        <div className="flex flex-col items-center gap-6 p-6">
            <div className="flex flex-col gap-2 text-center">
                <h1 className="text-2xl font-bold">NEAR Transfer</h1>
                <p className="text-foreground-muted text-lg">Send NEAR tokens to any address on the NEAR network.</p>
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
