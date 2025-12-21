import { Link, useLocation } from "@tanstack/react-router";
import { CheckIcon, ChevronDown } from "lucide-react";
import { useState } from "react";
import { navigation } from "@/lib/constants";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";

export default function Navigation() {
    const { pathname } = useLocation();
    const [title, setTitle] = useState(pathname === "/" ? "Select chain" : pathname.split("/")[1]);
    const [open, setOpen] = useState(false);

    return (
        <DropdownMenu onOpenChange={setOpen} open={open}>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="text-lg capitalize min-w-32">
                    <span className="mr-auto">{title}</span>
                    <ChevronDown />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-60">
                {navigation.map((item) => (
                    <DropdownMenuItem
                        onClick={() => {
                            setTitle(item.name);
                            setOpen(false);
                        }}
                        key={item.name}
                        className="text-base hover:bg-white/35 transition-colors duration-300 not-last:border-white/20 not-last:border-b not-last:rounded-none"
                    >
                        <Link to={item.href} className="py-2 size-full flex items-center justify-between">
                            {item.name}
                            {item.href === pathname ? <CheckIcon className="text-green-500" /> : null}
                        </Link>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
