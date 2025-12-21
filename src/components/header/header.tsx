import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import Logo from "./logo";
import Navigation from "./navigation";

type Props = {
    connectWalletButton?: ReactNode;
};

export default function Header({ connectWalletButton }: Props) {
    return (
        <nav
            className={cn(
                "w-11/12 mx-auto px-4 py-4 mt-5 rounded-lg flex items-center justify-between",
                "bg-surface/70 backdrop-blur border border-border/60 text-fg",
            )}
        >
            <Logo />
            <div className="flex items-center gap-4">
                <Navigation />
                {connectWalletButton ? connectWalletButton : null}
            </div>
        </nav>
    );
}
