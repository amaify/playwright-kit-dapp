import { BN } from "@coral-xyz/anchor";
import { useWallet } from "@solana/wallet-adapter-react";
import { Connection, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { createFileRoute } from "@tanstack/react-router";
import Big from "big.js";
import { useState } from "react";
import { toast } from "sonner";
import { TransferForm } from "@/components/transfer-form/transfer-form";

export const Route = createFileRoute("/_solana/solana")({
    component: RouteComponent,
});

function RouteComponent() {
    const [address, setAddress] = useState("");
    const [amount, setAmount] = useState("");
    const { publicKey, wallet } = useWallet();

    const handleSubmit = async () => {
        const connection = new Connection("https://api.devnet.solana.com", "confirmed");

        if (!publicKey) {
            toast.error("Please connect your wallet");
            return;
        }

        const parsedValue = Big(amount).mul(Big(LAMPORTS_PER_SOL));
        const amountInLamports = new BN(parsedValue.toFixed(0));

        const transaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: publicKey,
                toPubkey: new PublicKey(address),
                lamports: amountInLamports,
            }),
        );

        try {
            const signature = await wallet?.adapter.sendTransaction(transaction, connection);
            if (signature) {
                toast.success("Transaction successful");
                setAddress("");
                setAmount("");
            }
        } catch (error) {
            toast.error(`Transaction failed: ${error instanceof Error ? error.message : String(error)}`);
        }
    };

    return (
        <div className="flex flex-col items-center gap-6 p-6">
            <div className="flex flex-col gap-2 text-center">
                <h1 className="text-2xl font-bold">Solana Transfer</h1>
                <p className="text-foreground-muted text-lg">Send SOL tokens to any address on the Solana network.</p>
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
