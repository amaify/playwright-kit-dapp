import { type ChangeEvent, type FormEvent, useState } from "react";
import { toast } from "sonner";
import { type Address, parseEther } from "viem";
import { useConfig, useConnection, useSendCalls } from "wagmi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { bookstoreAbi } from "@/lib/bookstore-abi";
import { maticAbi } from "@/lib/matic-abi";
import { maticToPolAbi } from "@/lib/matic-to-pol-abi";

export function TransferFormEVM() {
    const [formFields, setFormFields] = useState<Record<string, string>>({});
    const config = useConfig();
    const sendCalls = useSendCalls({ config: config });
    const { address: userAddress, connector } = useConnection();

    const MATIC_TO_POL = "0x3a3b750e7d4d389bc1d0be20e5d09530f82b9911";
    const MATIC_CA = "0x3fd0A53F4Bf853985a95F4Eb3F9C9FDE1F8e2b53";
    const BOOKSTORE_CA = "0x60Af03e8858bed2AbB8d6e5defa7b71A9e6f16f8";

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const value = parseEther(formFields.thirdAmount);

        sendCalls.mutate(
            {
                calls: [
                    {
                        to: formFields.firstAddress as Address,
                        value: parseEther(formFields.firstAmount),
                    },
                    {
                        to: formFields.secondAddress as Address,
                        value: parseEther(formFields.secondAmount),
                    },
                    {
                        to: MATIC_CA as Address,
                        abi: maticAbi,
                        functionName: "approve",
                        args: [MATIC_TO_POL, parseEther(formFields.thirdAmount)],
                    },
                    {
                        to: MATIC_TO_POL as Address,
                        abi: maticToPolAbi,
                        functionName: "migrate",
                        args: [parseEther(formFields.thirdAmount)],
                    },
                    {
                        to: BOOKSTORE_CA as Address,
                        abi: bookstoreAbi,
                        functionName: "deposit",
                        args: [value],
                        value,
                    },
                ],
                account: userAddress as Address,
                connector,
            },
            {
                onSuccess: () => toast.success("Transaction successful"),
                onError: (error) => {
                    console.error({ error });
                    toast.error("Transaction failed");
                },
            },
        );
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const fieldName = e.target.name;
        const fieldValue = e.target.value;

        setFormFields({ ...formFields, [fieldName]: fieldValue });
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
                    name="firstAddress"
                    placeholder="Enter address"
                    value={formFields.firstAddress}
                    required
                    autoComplete="off"
                    onChange={handleChange}
                    className="border-border bg-background"
                />

                <Input
                    id="address-two"
                    type="text"
                    name="secondAddress"
                    placeholder="Enter address two"
                    value={formFields.secondAddress}
                    required
                    autoComplete="off"
                    onChange={handleChange}
                    className="border-border bg-background"
                />
            </div>

            <div className="flex flex-col gap-2">
                <Label htmlFor="amount">Amount</Label>
                <Input
                    id="amount"
                    type="text"
                    name="firstAmount"
                    placeholder="Enter amount"
                    value={formFields.firstAmount}
                    required
                    autoComplete="off"
                    onChange={handleChange}
                    className="border-border bg-background"
                />
                <Input
                    id="amount"
                    type="text"
                    name="secondAmount"
                    placeholder="Enter amount"
                    value={formFields.secondAmount}
                    required
                    autoComplete="off"
                    onChange={handleChange}
                    className="border-border bg-background"
                />
                <Input
                    id="amount"
                    type="text"
                    name="thirdAmount"
                    placeholder="Enter amount to migrate"
                    value={formFields.thirdAmount}
                    required
                    autoComplete="off"
                    onChange={handleChange}
                    className="border-border bg-background"
                />
            </div>

            <Button type="submit" className="mt-2">
                Submit
            </Button>
        </form>
    );
}
