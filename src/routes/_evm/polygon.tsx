import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { parseEther, verifyMessage } from "viem";
import { useConnection, useSendTransaction, useSignMessage } from "wagmi";
import { TransferForm } from "@/components/transfer-form/transfer-form";
import { TransferFormEVM } from "@/components/transfer-form/transfer-form.evm";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_evm/polygon")({
    component: RouteComponent,
});

function RouteComponent() {
    const [address, setAddress] = useState("");
    const [amount, setAmount] = useState("");
    const sendTransaction = useSendTransaction();
    const [signedMessage, setSignedMessage] = useState("");
    const { mutate } = useSignMessage();
    const { address: userAddress } = useConnection();

    const handleSubmit = async () => {
        sendTransaction.mutate(
            {
                to: address as `0x${string}`,
                value: parseEther(amount),
            },
            {
                onSuccess: () => {
                    toast.success("Transaction successful");
                },
                onError: () => {
                    toast.error("Transaction failed");
                },
            },
        );
    };

    return (
        <div className="flex flex-col items-center gap-6 p-6">
            <div className="flex flex-col gap-2 text-center">
                <h1 className="text-2xl font-bold">Polygon Transfer</h1>
                <p className="text-foreground-muted text-lg">Send POL tokens to any address on the Polygon network.</p>
            </div>

            <div className="flex w-full flex-col gap-6">
                <TransferForm
                    address={address}
                    amount={amount}
                    setAddress={setAddress}
                    setAmount={setAmount}
                    onSubmit={handleSubmit}
                />

                <hr />

                <TransferFormEVM />

                <div>
                    <Button
                        onClick={() => {
                            mutate(
                                { message: "Hello world!" },
                                {
                                    onSuccess: (data) => {
                                        toast.success("Message signed successfully");
                                        setSignedMessage(data);
                                    },
                                    onError: () => {
                                        toast.error("Message signing failed");
                                    },
                                },
                            );
                        }}
                    >
                        Sign Message
                    </Button>

                    <Button
                        onClick={async () => {
                            const result = await verifyMessage({
                                address: userAddress as `0x${string}`,
                                message: "Hello world!",
                                signature: signedMessage as `0x${string}`,
                            });

                            console.info("Verified Address: ", result);
                        }}
                    >
                        Verify Signature
                    </Button>
                </div>
            </div>
        </div>
    );
}
