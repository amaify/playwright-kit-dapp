import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import Logo from "./logo";
import Navigation from "./navigation";

export default function Header() {
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
                <Button variant="default" size="default" className="text-lg uppercase">
                    Connect wallet
                </Button>
            </div>
        </nav>
    );
}
