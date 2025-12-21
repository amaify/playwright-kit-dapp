import type { FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TransferFormProps {
    address: string;
    amount: string;
    setAddress: (address: string) => void;
    setAmount: (amount: string) => void;
    onSubmit: () => void;
}

export function TransferForm({ address, amount, setAddress, setAmount, onSubmit }: TransferFormProps) {
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit();
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 w-full max-w-md mx-auto bg-muted/40 p-6 rounded-lg"
        >
            <div className="flex flex-col gap-2">
                <Label htmlFor="address">Address</Label>
                <Input
                    id="address"
                    type="text"
                    placeholder="Enter address"
                    value={address}
                    required
                    autoComplete="off"
                    onChange={(e) => setAddress(e.target.value)}
                    className="border-border bg-background"
                />
            </div>

            <div className="flex flex-col gap-2">
                <Label htmlFor="amount">Amount</Label>
                <Input
                    id="amount"
                    type="text"
                    placeholder="Enter amount"
                    value={amount}
                    required
                    autoComplete="off"
                    onChange={(e) => setAmount(e.target.value)}
                    className="border-border bg-background"
                />
            </div>

            <Button type="submit" className="mt-2">
                Submit
            </Button>
        </form>
    );
}
