import { type ChangeEvent, type FormEvent, useState } from "react";
import { toast } from "sonner";
import { type Address, parseEther } from "viem";
import { useSendCalls } from "wagmi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function TransferFormEVM() {
    const [formFields, setFormFields] = useState<Record<string, string>>({});
    const sendCalls = useSendCalls();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

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
                        data: "0xdeadbeef",
                        to: "0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC",
                    },
                ],
            },
            {
                onSuccess: () => toast.success("Transaction successful"),
                onError: () => toast.error("Transaction failed"),
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
            </div>

            <Button type="submit" className="mt-2">
                Submit
            </Button>
        </form>
    );
}
